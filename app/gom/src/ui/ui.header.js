import View from '../core/view';

var defaults = {
    left:{
        type: 'icon'   //options button,link
    },
    right:{
        type: 'icon',
        icon: 'icon-bars'
    },
    title: '',
    subtitle: ''
};
/**
 * GomApp 头部类 Header
 * @class Gom.UI.Header
 * @alias Header
 * @extends {Gom.View}
 * @param {object} opts 参数列表
 * @param {object} [opts.wrapper] 组件根元素
 * @param {object} opts.data  组件数据相关
 * @param {object} opts.data.left          - Header左侧内容配置
 * @param {string} [opts.data.left.type=icon] -Header左侧内容类型,可选有 icon, button, link
 * @param {string} [opts.data.left.text='']     -Header左侧内容文本，相应的为icon|button|link的文本
 * @param {string} [opts.data.left.icon]     -Header左侧内容图标class,当left.type为icon时才具体此属性
 * @param {object} [opts.data.right]         -Header右侧,其子属性同left
 * @param {string} opts.data.title=''        -主标题
 * @param {string} [opts.data.subtitle='']   -副标题
 * @desc 左侧按钮为icon为icon-left-nav时，已自动绑定后退
 * @example
 * <header id="header" class="bar bar-nav"  data-ui-widget="Header">GoM APP</header>
 * 或
 var header = new UI.Header({
            data: {
                title: '新头部',
                subtitle: 'from 2015/11/11'
            },
            wrapper: '#header'
        });
 header.render();
 header.setTitle('setTitle设置的标题');
 */
class Header extends View {
    constructor (opts){
        opts.data = _.extend({}, defaults, opts.data);
        opts.tmplname = 'ui.header';
        opts.wrapper = opts.wrapper || '#header';
        opts.events = {
            'click .icon-left-nav': 'goBack'
        };
        super(opts);
    }
    /**
     * @method Gom.UI.Header#setTitle
     * @param {string} text 主标题
     */
    setTitle (text){
        this.update({title: text});
    }
    /**
     * @method Gom.UI.Header#setTitle
     * @param {string} text 主标题
     */
    setSubTitle (text){
        this.update({subtitle: text});
    }

    goBack (){
        History.go(-1);
    }
};

export default Header;
