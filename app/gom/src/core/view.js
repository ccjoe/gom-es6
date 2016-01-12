import Store from '../utils/store';
import * as UItmpl from '../ui/ui.tmpl';

//根据tmplID获取模板;
var parseTmpl = tmplID => {
    let tmpl;
    if(tmplID){
        tmplID = tmplID.split('.')[1];
        tmpl = UItmpl[tmplID];
    }else{
        tmpl = UItmpl;
    }
    console.log(tmplID, tmpl, '$tmpl');
    return tmpl;
};

/*_.templateSettings = {
    evaluate    : /\{\{(.+?)\}\}/g,
    interpolate : /\{\{=(.+?)\}\}/g,
    escape      : /\{\{\-(.+?)\}\}/g
};*/

var compile = function (tmpl, tmpldata){
    const data = tmpldata;
    return tmpl;
};

//toElem继承elem所有属性但排除组件定义属性, class会叠加，其它会替换，组件定义的相关属性不会继承
var inheritAttrs = function (elem, toElem) {
    var attributes = elem.prop("attributes"),
        $toElem = $(toElem);
    $.each(attributes, function () {
        if (this.name === 'class') {
            $toElem.attr(this.name, this.value + ' ' + $toElem.attr('class'));
        } else if (this.name !== 'data-opts' && this.name !== 'data-ui-widget') {
            $toElem.attr(this.name, this.value);
        }
    });
    return $toElem;
};

/**
 * View对象 - 抽象类，供所有UI组件和Page对象继承
 * @class Gom.View
 * @alias View
 * @param {object} opts 参列
 * @param {object} [opts.wrapper]  View类对应的视图根元素，即应放入的位置, 此属性被组件或Page继承后为组件或页面应插入的位置,不指定时返回View的htmlFragment
 * @param {object} [opts.tmplname]   View类对应的模板名称, page的话在route里面配置tmplname，各组件的话在组件内部重写为固定值去对应组件模板, 有tmpl时不需要指定
 * @param {object} [opts.tmpl]     View类对应的htmlFragment代码片断
 * @param {object} [opts.replace]  为true时会替换掉wrapper根元素，但会保留其上除data-ui-widget的其它属性
 * @param {object} opts.data     View类对应的数据, 在组件内实现，通过data的内部定义实现了组件的多态
 * @param {object} [opts.events]   View类对应的事件绑定 在UI组件或页面Ctrl里可以直接定义events对象，为组件或页面里需要的元素注册事件与监听
 * @desc 因为View对象为抽象类，供所有UI组件和Page对象继承，各属性继承后的意义见具体对象
 * events: {
 *   'click,touch selector1,selector2': 'listenerName1',
 *   'touch .selecor': 'listenerName2',
 *   'touch .selecor2' (){}
 * }
 * 监听可以为二种类型，string指向的function或function直接量
 * 监听为string有二个参数 (e, target), e为事件对象， target为触发事件的元素，其中listener内this指向所在的环境即env
 * 监听为function直接量有三个参数 (e, target, that), that指向所在的环境即env对象
 */
 class View {
    constructor({wrapper='', tmplname='', tmpl, data={}, replace=false, events = {}, ctrl}) {
        wrapper = $(wrapper);
        Object.assign(this, {wrapper, tmplname, tmpl, data, replace, events, ctrl});
        this._parseEvent(ctrl || this);
    }

    /**
     * 渲染页面或组件或其它视图,一般组件需要手动调用此方式显示组件
     * @method Gom.View#render
     * @returns {View|string} 传入wrapper时返回View对象,显示组件在wrapper里，不传则返回View的htmlFragment(Html片断)
     */
    render() {
        var wrap = this.wrapper;
        var frag = this.getHTMLFragment(), $frag;
        if (wrap) {
            if (this.replace) {
                $frag = inheritAttrs(wrap, frag);
                wrap.replaceWith($frag);
                this.wrapper = $frag;   //会this.wrapper指向替代后的位置
                console.log(this.wrapper, 'this.wrapper');
            } else if (frag) {
                wrap.html(frag)
            } else {
                //没有tmpl时
            }

        }
        this.show();
        return wrap.length ? this : frag;
    }

    /**
     * View#render后的回调, 一般用于组件实例里供继承View时重写此方法，在render组件后UI业务处理
     * @method Gom.View#show
     */
    show() {
        //this.wrapper.removeClass('hide');
    }

    /**
     * 更新视图
     * @method Gom.View#update
     * @param {object} data  -传入数据对象或数据某一属性，更新相应数据到UI
     */
    update(data) {
        if (data) {
            this.data = $.extend({}, this.data, data);
        }
        this.render();
    }

    /**
     * 销毁视图
     * @method Gom.View#destory
     */
    destory() {
        this.wrapper.empty();
    }

    /**
     * 获取带模板数据的virtual dom
     * @method Gom.View#getHTMLFragment
     * @param {string} [viewOrPartial=partial] -其值为 'partial' or 'view'
     * @return {tmpl}
     */
    getHTMLFragment (viewOrPartial) {
        this.getHTMLTmpl(viewOrPartial);
        if (!this.tmpl) return;
        return this.data ? compile(this.tmpl, this.data): compile(this.tmpl);
    }

    /**
     * 获取 partial模板(组件模板) or view模板(页面模板)
     * @method Gom.View#getHTMLTmpl
     * @param {string} [viewOrPartial=partial] -其值为 'partial' or 'view'
     * @returns {*|string|tmpl}
     */
    getHTMLTmpl (viewOrPartial) {
        if (this.tmpl) {
            return this.tmpl;
        }
        var tmpl = (viewOrPartial === 'view') ? this.tmpl : parseTmpl(this.tmplname);
        this.tmpl = tmpl;
        return tmpl;
    }

    /**
     * @callback eventCallback
     * @param {e} e eventObject
     */

    /**
     * 给组件或页面上selector指向的元素绑定事件代理，事件代理在组件根元素
     * @method Gom.View#onview
     * @param {Event} eventType
     * @param {selector} selector
     * @param {eventCallback} listener - 事件监听回调
     * @returns {View}
     */
    onview (eventType, selector, listener) {
        this.wrapper.on(eventType, selector, listener);
        return this;
    }

    /**
     * 给组件或页面上selector指向的元素取消绑定事件代理
     * @method Gom.View#offview
     * @param {Event} eventType
     * @param {selector} selector
     * @param {eventCallback} listener - 事件监听回调
     * @returns {View}
     */
    offview (eventType, selector, listener) {
        this.wrapper.off(eventType, selector, listener);
        return this;
    }

    /**
     * 刷新events事件对象
     * 解决三种情况：
     * 1.当没有wrapper时，render()返回fragmentHTML,组件上的events对象无法绑定事件，当fragmentHTML插入document后，可以调用此方法重新绑定events对象事件
     * 2.不在view组件的 wrapper里面，但想需要被 view组件的events对象解析绑定事件的html
     * 3.组件实例化后新增或删除事件（还没有通过此方法实现，待考证是否有必要）
     * @method Gom.View#refreshEvent
     * @param {string} frag所在的选择器或元素
     * @param {object} events对象所在的环境，即其父对象
     */
    refreshEvent (frag, env) {
        this._parseEvent(env, frag);
    }

    /**
     * @private
     * @method Gom.View#_parseEvent
     * @param {object} env env为事件绑定时的listener所在的执行环境, 即events对象所在的环境，也即父对象 为ctrl或View, UI-widget
     * @param {element} delegateElement 事件代理所有的元素，默认是不需要这个参数的，其用在refreshEvent时
     * events: {
     *   'click,touch selector1,selector2': 'function',
     *   'touch .selecor': 'function2'
     * }
     * function有二个参数 (e, target),其this指向所在的环境即env
     **/
    _parseEvent (env, delegateElement) {
        var events = this.events;
        if (!events) return;

        var onfn = function () {
        }, $de = $(delegateElement);
        //绑定事件的方法,获取方法名称使用会导致this指向window
        if ($de.length) {
            $de.off();
            onfn = _.bind($de.on, $de);    //修复使this指向zepto on里的this指向的对象
        } else if (this.wrapper.length) {
            onfn = _.bind(this.onview, this); //修复使this指向onview里的this指向的对象
            this.offview();
        }
        //var that = this;
        for (var eve in events) {
            (function (eve) {
                var eventSrc = getEventSrc(eve),
                    eventListener = events[eve];
                //console.log($(delegateElement), that.wrapper,  eventSrc.event, eventSrc.selector, '绑定的事件');
                onfn(eventSrc.event, eventSrc.selector, function (e) {
                    if (typeof eventListener === 'function') {
                        eventListener(e, this, env);   //events对象值为函数直接量时，参列为(e, target, that)第三个参数为所在的执行环境env,即this
                        return false;
                    }
                    env[eventListener](e, this);      //events对象值为字符串时, 参列为(e, target){ //内部this指向执行环境 }
                    return false;
                });
            })(eve);
        }
        //如此的话， events触发的listener的this指向 发生动作的元素， e，对原生event对象， 第二个参数this为发生的对象，
        // eventListener里的this指向that,
        function getEventSrc(eve) {
            var ret = /(\w+)+\s+(.+)/.exec(eve);
            return {
                event: ret[1],  //event type 1
                selector: ret[2]  //event selector all
            };
        }
    }
}
export default View;
