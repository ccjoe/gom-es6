/**
 * Page 对象
 * @extends {Gom.View}
 * @class Gom.Page
 * @alias Page
 * @param {object} opts -{参数列表}
 * @param {string|selector} opts.wrapper 页面根元素选择器
 * @param {string} opts.title 页面标题
 * @param {array} opts.widgets 声明式的组件对象数组, 函数式的在ctrl里可以直接引用,不在其列
 * @param {object} opts.params 页面参数
 * @param {object} opts.seo 页面SEO信息, SPA History的SEO信息配置的作用有待验证
 * @param {boolean|null} opts.isback 判断路由到此页面是前进还是后退还是直进
 * @param {object} opts.config  APP config信息
 * @desc 与Page紧紧相关的就是页面对应的Ctrl
 1. ctrl: 每路由到一个页面，会自动调用ctrl里的init(page)方法, 可以在ctrl里定义init方法（也可以不定义，框架会自动调用render方法初始化页面）如下：
    ```
    init: function(page){
        page.render();
    }
    ```
 2. init方法里有个参数为page对象，包含到这个页面的所有信息，即cro对象，包含的内容很强大很完整有毛有。通过框架提供的方法操作此对象可以很自由地处理各种逻辑，page对象包含如下属性：
    ```
     {
        config: Object      //全局配置config.js export的对象
        data: Object        //页面上数据对象
        tmpl: ""            //页面dom string
        events: Object      //页面对象上绑定的事件， gom在组件与页面上实现的事件绑定方式借用了 backbone events思想来实现的
        hashs: Array        //路由到当前页面的路由数组
        isback: false       //是否为后退
        params: null        //到此页面传递的参数对象
        replace: false      //在page实例里暂时无用， 继承自View对象,详见View对象
        seo: Object         //当前页面的seo配置信息
        title: "Slide示例"   //页面标题
        tmplname: ""        //页面路径
        widgets: Array[1]   //页面上所有经过声明式的组件对象数组， 函数式的在ctrl里可以直接引用
        wrapper: Z[1]       //路由到页面需要将页面插入的地方
    }
    ```
 3. Ctrl相关: ctrl代码结构一般如下：</h4>
    ```
     define([], function() {
        return {
            //init方法会被框架自动调用，没有定义框架也会处理page.render;
            init: function(page){
                page.render();
                this.doSth();
            },
            doSth: function(){},
            events:{}
        }
    });
    ```
 4. 此外Page里还做了如下的一些事情：
 页面转场相关
 解析声明式组件写法
 页面SEO相关的设置
 **/
import * as UI from '../ui/ui';
import View from './view';

class Page extends View{
    constructor (opts) {
        opts.wrapper = opts.wrapper || '#viewport';
        super(opts);
        this.title  = opts.title || '';
        this.widgets = [];
        this.params = opts.params || null;
        this.seo = opts.seo || {
            title: '',
            keywords: '',
            description: ''
        };
        this.isback = opts.isback;
        this.config = opts.config;
    }
    /**
     * 渲染显示页面, 重写了Gom.View#render
     * 可以在ctrl的init方法里手动调用 page.render()，如果ctrl里不定义init方法则框架会处理
     * @method Gom.Page#render
     */
    render () {
        //没有指定this.tmplname先渲染空页面,由ctrl及组件去填充页面
        if(!this.tmplname){
            this.tmpl = '<div class="'+ (this.config.CLASSES.CONTENT.substring(1) || "gom-content") +'"></div>';
            this.show();
            return;
        }
        //指定了this.tmplname时获取页面模板
        this.show();
    }
    /**
     * Gom.Page#render后的回调，显示页面的具体实现.
     * @method Gom.Page#show
     */
    show(){
        var isback = this.isback;
        //var effect = (isback === null) ? null : (!isback ? 'swipe-left':'swipe-right');

        this.push(this.getHTMLFragment('view'), isback);
        //this._parseEvent();
        if (this.title || this.subtitle) {
            this.setHeader();
        }
        this.initWidgetUI();
    }
    /**
     * 页面转场 会保留最近的三个层次页面
     * @method Gom.Page#push
     * @param {element} dom    - 推入的htmlFragment
     * @param {string} goback 前进与后退
     **/
    push(dom, isback){
        var $dc = $(this.wrapper ? this.wrapper : '#viewport');
        var from = !isback ? '0' : '100%',  //新层
            to = !isback ? '-20%' : '0',    //旧层
            lastfrom = !isback ? '100%' : '0',  //新层
            fromcss = 'translateX('+lastfrom+')';

        //不是后退则追加dom
        if(!isback){
            $dc.append(dom);
        }
        //后退时如果没有dom了，往前追加
        if($dc.find('.content').length===1 && isback){
            $dc.prepend(dom);
        }
        var $dcct = $dc.find('.content').addClass('gom-content'), $last =  $dcct.last();
        if($dcct.length > 3){
            $dcct.eq(0).remove();
        }
        if(typeof isback==='boolean'){
            $last.prev()
                .animate({
                translateX: to,
                translate3d: '0,0,0'}, 350, 'ease-out');

            $last.css({'transform': fromcss})
                .animate({
                    translateX: from,
                    translate3d: '0,0,0'}, 350, 'ease-out', function(){
                    isback ? $last.remove() : null;
                });
        }
        return;
    }
    //渲染页面后自动实例化组件，去支持声明式初始UI组件, 组件式的内容作为title, data-opts作为参数对象, 若有重复，以data-opts为主
    //声明式初始UI组件初始隐藏，解析后显示.
    initWidgetUI(){
        var $t, uitype, uiopts, uititle, $items, hasItemsLen, that = this;
        $('body').find('[data-ui-widget]').each(function(i, it){
            $t = $(it);
            uitype = $t.data('ui-widget');
            uiopts = $t.data('opts');
            $items = $t.find('item');
            hasItemsLen = $items.length;
            //判断是否是列表类组件对象，简言之：获取title 或 列表时的title与content
            if(hasItemsLen){
                uititle = [];
                for(var t=0; t<hasItemsLen; t++){
                    uititle[t] = {};
                    uititle[t]['title'] = $items.eq(t).attr('title');
                    uititle[t]['content'] = $items.eq(t).html();
                }
                uititle.list = uititle;
            }else{
                uititle = {};
                uititle.title = $t.text();
            }
            //try{
                that.widgets[i] = new UI[uitype]({
                    wrapper: $t,
                    data: $.extend({},  uititle, uiopts)
                });
            //}catch(e){
            //    console.warn(uitype + '组件定义错误，UI对象上不存在此组件！');
            //}
            that.widgets[i].render();
            $t.data('widget', that.widgets[i]);
            $t.removeAttr('data-ui-widget');
        });
    }
    /**
     * 设置Header,这里仅设置主标题和副标题。 如果需要设置更多，可以获取使用header实例的update方法
     * @method Gom.Page#setHeader
     */
    setHeader () {
        var header = $('#heaer').data('widget') || new UI.Header({});
        header.update({title:this.title, subtitle: this.subtitle});
    }
    /**
     * 设置某页面的SEO信息
     * @method Gom.Page#setSeo
     * @todo 暂时不实现
     */
    setSeo (seoInfo){

    }
}

export default Page;
