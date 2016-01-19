import $ from '../utils/fx';
import Store from '../utils/store';
import View from '../core/view';

var defaults = {
    type: 'slide-horizontal',   //slide-vertical/slide-horizontal/tab-top/tab-bottom
    swipeX: 60,
    isloop: true,         //是否从最后一张到第一张
    initIndex: 0,         //初始显示index
    list: [/*{},{
     title: '街景',               //标题，tab时用到
     icon: 'icon-home',           //标题，tab时用到
     content: '',                 //A:内容
     src: 'example.com/test.html',//B:或为url获取模板
     data: {}                     //当有B时，可以有data字段与src合并为数据模板渲染到页面
     }*/]              //列表内容
};

var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
    (/firefox/i).test(navigator.userAgent) ? 'Moz' :
        'opera' in window ? 'O' : '';
var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
/**
 * Slide 滑动相关组件
 * @class Gom.UI.Slide
 * @alias Slide
 * @extends {Gom.View}
 * @param {object} opts - 详见实例 TMD实在懒得写了!!!
 * @example 实例
 * var slide = new Slide({
        wrapper: '.slide-example',
        data: {
            type: direction,      //slide-vertical slide-horizontal tab-top tab-bottom
            isloop: true/false    //是否循环滚动
            initIndex: 0,         //初始显示index
            list:[{
                title: '街景',                //标题，tab时用到
                icon: 'icon-home',           //标题，tab时用到
                //content: '',               //A:滑动面板内容
                src: 'example.com/test.html',//B:滑动面板内容支持远程url获取模板,此时不能与content同时存在。
                data: {}                     //当为B时，可以有data字段与src合并为数据模板渲染到页面，框架已处理，仅需要配置
            },{ title: '美女',
                icon: 'icon-person',
                content: 'content2'          //A:滑动面板内容
            },{ title: '巴黎',
                icon: 'icon-star-filled',
                content: 'content3'
            },{ title: '巴黎',
                icon: 'icon-gear',
                content: 'content4'
            }]
        }
    }).render();
 */
class Slide extends View {
    constructor(opts) {
        opts.data = Object.assign({}, defaults, opts.data);
        opts.tmplname = 'ui.switcher';
        opts.events = {
            'click .switch-pagination-bullet': function (e, target, that) {
                that.rollback($(target).attr('index'));
            }
        };
        super(opts);
    }

    show() {
        this.swipeContainer(this.data.initIndex);
    }

    getRootDom() {
        return this.wrapper.find('> .switch-container');
    }

    getListsDom() {
        return this.getRootDom().find('> .switch-wrapper');
    }

    getListDom() {
        return this.getListsDom().find('> .switch-item:not(.switch-item-copy)');
    }

    getIndexData(index) {
        index = this.checkLoopMove(index);
        return this.data.list[index];
    }

    getIndexDom(index) {
        return this.getListDom().eq(index);
    }

    getPaginationDom() {
        return this.getRootDom().find('> .switch-pagination');
    }

    //滚动到或回滚到index
    rollback(index) {
        var that = this,
            $switchs = this.getListsDom(),
            $index = this.getPaginationDom(),
            isX = /(^\w+)-?(\w+)?/.exec(this.data.type)[2] !== 'vertical',       //水平垂直
            isize = isX ? $switchs.width() : $switchs.height(); //计算尺寸

        var showIndex = function () {
            $switchs.fx(that.swipeCount(isize * -index));
            index = that.checkLoopMove(index);
            $index.find('.switch-pagination-bullet').eq(index).addClass('active').siblings().removeClass('active');
        };

        var indexData = this.getIndexData(index);
        //如果不存在content存在src的话远程获取content
        if (!indexData.content && indexData.src !== void 0) {
            this.getIndexAsync(index, function (content) {
                that.getIndexDom(index).html(content);
                showIndex();
            });
        } else {
            showIndex();
        }
    }

    //index为初始显示
    swipeContainer(index) {
        var that = this,
            $root = this.getRootDom(),
            $switchs = this.getListsDom(),            //滑动容器
            isX = /(^\w+)-?(\w+)?/.exec(this.data.type)[2] !== 'vertical',       //水平垂直
            swipeXY = isX ? 'swipeX' : 'swipeY';

        this.rollback(index);

        $switchs.swipe({
            moveCallback (point){
                var check = Slide.checkDirect(point.direction, isX);
                if (check) {
                    return;
                }
                index = that.checkLoopMove(index);
                var distance = point[swipeXY] + $root.width() * -index;
                $switchs.css(that.swipeCount(distance));
            },
            endCallback (point){
                if (Math.abs(point[swipeXY]) < that.data[swipeXY]) {
                    that.rollback(index);
                    return;
                }
                index = that.checkLoop(index, point);
                if (index === false) {
                    return;
                }

                that.rollback(index);
            }
        });
    }

    /**
     * 检查方向通过返回true
     */
    static checkDirect(direct, isX) {
        return !(isX && (direct === 'left' || direct === 'right')) ||
            (!isX && (direct === 'top' && direct === 'bottom'));
    }
    //检查滚动时处于边界的index时
    checkLoopMove (index){
        if(this.data.isloop && index >= this.getListDom().length){
            index = 0;  //循环滚动时超出则回到第1项
        }
        return index;
    }
    /**
     * 检查是否循环通过返回true
     */
    checkLoop(index, point) {
        let isloop = this.data.isloop,
            pointDirect = point.direction,
            $switch = this.getListDom(),  //滑动子项
            isX = /(^\w+)-?(\w+)?/.exec(this.data.type)[2] !== 'vertical',       //水平垂直
            swipeDR = isX ? ['left', 'right'] : ['top', 'bottom'],
            len = $switch.length;  //元素个数, 元素,  this
        if (pointDirect === swipeDR[0]) {   //go
            console.log(index, len - 1, '>=');
            if (index >= len) {
                if (!isloop) {
                    this.rollback(index);
                    return index;
                }
                index = 0;
            } else {
                index++;
            }
        } else if (pointDirect === swipeDR[1]) {  //back
            if (index <= 0) {
                if (!isloop) {
                    this.rollback(index);
                    return index;
                }
                index = len - 1;
            } else {
                index--;
            }
        }
        return index;
    }

    //如果每个滑动子项是远程数据的话,从ajax(需要同源)获取或从store获取,返回处理后的模板content
    getIndexAsync(index, next) {
        var indexData = this.getIndexData(index),
            indexSrc = indexData ? indexData.src : null,
            indexStore = Store.get(indexSrc);

        var getContent = function (tmpl) {
            return !indexData.data ? tmpl : View.template(tmpl, indexData.data);
        };
        if (indexSrc) {
            if (indexStore) {
                next(getContent(indexStore));
                return;
            }
            $.get(indexSrc, function (tmpl) {
                var tmplStr = getContent(tmpl);
                Store.set(indexSrc, tmpl);  //仅缓存模板，不缓存数据(有时需要实时获取)
                next ? next(tmplStr) : null;
            });
        }
    }

    //get {-webkit-transform: translate3d(x,y,0)}
    swipeCount(distance) {
        var isX = /(^\w+)-?(\w+)?/.exec(this.data.type)[2] !== 'vertical';       //水平垂直
        var x = isX ? (distance + 'px') : '0',
            y = isX ? '0' : (distance + 'px');
        var props = {};
        props['-' + vendor + '-transform'] = has3d ?
        "translate3d(" + x + "," + y + ",0)" :
        "translate(" + x + "," + y + ")";
        return props;
    }
}

export default Slide;
