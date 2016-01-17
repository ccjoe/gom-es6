import $ from '../utils/fx';
import View from '../core/view';

let defaultData = {
    type: 'loading', //alert, confirm, topup, top, bottom,
    btns: {
        yes: '确定',
        no:  '取消'
    },
    title: '',
    content: '',   //content为str或html,如果为function则需要返回str或html
    class: '',
    mask: true
};

const noop = function(){};
/**
 * 弹层底层抽象类，如果需要自定义弹出层才需要用到, 自定义一般于Modal.layout，不满足才需要用到此类
 * 弹层层的家庭比较大，有Loading，confirm， alert, center, popover, tips, popup, top , bottom, toast
 * 所有弹出层不可共存，但modal与toast可一起显示.
 *  @class Gom.UI.Modal
 *  @alias Modal
 *  @extends {Gom.View}
 *  @param {object} opts 传入的opts参数，会覆盖static默认参数
 *  @param {string} [opts.type]  自定义GomUI不存在的弹出层组件时才需要指定
 *  @param {string} [opts.title] 弹层标题
 *  @param {html|string} [opts.content] 弹层的html内部
 *  @param {string} [opts.class] 弹层自定义class
 *  @param {boolean} [opts.mask=false] 弹层是否显示遮罩
 *  @param {boolean} [opts.close] 当且仅当为true时会在右上角显示关闭小图标
 *  @param {object} [opts.btns]  弹出层组件时按钮
 *  @param {string} [opts.btns.yes] 确定按钮名称
 *  @param {string} [opts.btns.no]  取消按钮名称
 *  @example opts对象可传入的有如下对象，如果opts为string时，则表示为opts.content
 *  {  type: '',  //在具体实例中已定义，扩展时可自定义名称
       btns: {
            yes: '确定',
            no:  '取消'
        },
        title: '',
        content: '',   //content为str或html,如果为function则需要返回str或html
        class: '',
        mask: true,
        onYes: function(){},
        onNo: function(){}
        }
 */
class Modal extends View {
    constructor  (opts) {
        var data = opts.data = $.extend({}, defaultData, opts.data);
        opts.tmplname = 'ui.modal';
        super(opts);
        this.onYes = data.onYes || noop;
        this.onNo = data.onNo || noop;
        this.mask = data.mask;
    }
    render (){
        let [wrap, frag] = [$('body'), this.getHTMLFragment()];

        if(this.wrapper.length){
            this.wrapper.html(frag);
            this.show();
            return this;
        }

        let modal = this.getModal();
        if(!modal.length){
            wrap.append(frag);
        }else{
            modal.replaceWith(frag);
        }
        this.show();
        return this;
    }
    /**
     * 显示弹层
     * @method Gom.UI.Modal#show
     */
    show  (){
        this.reloc();
        this.toggleModal();

        if(this.is('toast')){
            this.autoHide(3000);
        }
        this.initEvents();
    }
    initEvents (){
        var that = this, $t;
        $('.modal-layout').off().on('click', '.modal-btn, .icon-close', function(){
            $t = $(this);
            if($t.hasClass('modal-btn-yes')){
                that._onYes();
            }else if($t.hasClass('modal-btn-no') || $t.hasClass('icon-close')){
                that._onNo();
            }
        });
        $('.modal-overlay').off().click(function(){
            that._onYes();
        });
    }
    /**
     * 获取弹出层类型，即data.type
     * @method Gom.UI.Modal#getType
     */
    getType (){
        return this.data.type;
    }
    is (type){
        return this.getType().indexOf(type)!==-1;
    }
    isTopBot (){
        var type =  this.getType();
        var is = (type ==='top' || type==='bottom');
        return is ? type : is;
    }
    /**
     * 获取弹层elements
     * @method Gom.UI.Modal#getModal
     * @returns {*|jQuery|HTMLElement}
     */
    getModal (){
        let $el = this.wrapper.length ? this.wrapper : $('body');
        let ist = this.is('toast'), isl = this.is('loading');
        if(ist) return $el.find('> .modal-toast');
        if(isl) return $el.find('> .modal-loading');
        return $el.find('> .modal-layout');
    }
    /**
     * 获取遮罩层
     * @method Gom.UI.Modal#getMask
     * @returns {*|jQuery|HTMLElement}
     */
    static getMask (){
        return $('.modal-overlay');
    }
    /**
     * 判断显示与隐藏及相应动画
     * @method Gom.UI.Modal#toggleModal
     * @param {string} [inout=In] in|显+out|隐
     * @desc 上下弹出层会采用slide+fade动画，其它采用scale+fade
     */
    toggleModal (inout){
        inout = inout || 'In';
        var pos = this.isTopBot();
        if(pos){
            this['slide'+inout+'Modal'](pos);
        }else{
            this['scale'+inout+'Modal']();
        }

        console.log(Modal.getMask(), this.mask, 'mask');
        if(this.mask){
            Modal.getMask()[inout==='In'?'addClass':'removeClass']('modal-overlay-visible');
        }
    }
    scaleInModal (){
        let size = 1, dsize = this.data.size;
        if(dsize) size = dsize;
        this.getModal().css({opacity: 0.8, transform: 'scale(1.2)'}).fx({opacity: 1, scale: size, perspective:1000}, 500, 'easeOutCirc');
    }
    scaleOutModal (){
        var $gm = this.getModal();
        $gm.fx({opacity: 0, scale: 0.8, perspective:1000}, 300, 'easeOutCirc', function(){
            $gm.remove();
        });
    }
    slideInModal (){
        this.getModal().fx({opacity: 1, translate3d: '0,0,0', perspective:1000}, 500, 'easeOutCirc');
    }
    slideOutModal (){
        var $gm = this.getModal();
        $gm.fx({opacity: 0.5, translate3d: '0,100%,0', perspective:1000}, 500, 'easeOutCirc', function(){
            $gm.remove();
        });
    }
    /**
     * 重置为动画前状态, 会根据modal所处的位置重置modal会置
     * @method Gom.UI.Modal#reloc
     * @private
     */
    reloc (){
        var ml = this.getModal(), isTB = this.isTopBot(),
            h = ml.height(), centerProps={};
        if(!isTB){
            centerProps['margin-top'] = -h/2;
        }
        ml.css(centerProps);
    }
    remove (){
        this.getModal().remove();
    }
    /**
     * 经过times millseconds 自动隐藏弹层
     * @method  Gom.UI.Modal#autoHide
     * @param {number} times 毫秒数
     */
    autoHide (times){
        var that = this;
        var time = setTimeout(function(){
            that.toggleModal('Out');
            clearTimeout(time);}, times);
    }
    _onYes (){
        this.onYes();
        this.toggleModal('Out');
    }
    _onNo (){
        this.onNo();
        this.toggleModal('Out');
    }
}

let Modals = {
    /**
     * 此方法一般用于自定义弹出层组件, 抽象类Modal的抽象实例
     * @method Gom.UI.Modal.layout
     * @param {object} statics 默认参数
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts
     *                              传入的opts参数为string时，则表示为opts.content
     * @param {string} type 弹出层对象的名称
     *  opts对象可传入的有如下对象，如果opts为string时，则表示为opts.content
     * @return {Modal} 弹出层实例
     */
    layout (statics, opts, type){
        let optsObj = {};
        if(typeof opts === 'string'){
            optsObj.content = opts;
        }else{
            optsObj = opts;
        }

        return new Modal({data: $.extend({}, statics, optsObj, {type: type})});
    },
    /**
     * 显示警告框
     * @method Gom.UI.Modal.alert
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts
     *                              传入的opts参数为string时，则表示为opts.content
     * @return {Modal} 弹出层实例
     */
    alert (opts){
        const alertStatic = {
            title: opts.title || '警告:',
            btns: {
                yes: 'OK'
            }
        };
        return this.layout(alertStatic, opts, 'alert').render();
    },
    /**
     * 显示对话框
     * @method Gom.UI.Modal.confirm
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts
     *                              传入的opts参数为string时，则表示为opts.content
     * @return {Modal} 弹出层实例
     */
    confirm (opts){
        const confirmStatic = {
            title: opts.title || '请确认:',
            btns: {
                yes: '确定', no: '取消'
            }
        };
        return  this.layout(confirmStatic, opts, 'confirm').render();
    },
    /**
     * 显示loading
     * @method Gom.UI.Modal.loading
     * @param {boolean} mask 是否需要 mask
     * @param {string} [preload=''] loading放入的位置,没有此值则为全局loading
     * @param {number} size loading的大小， 最好是0-1之间的比例;
     */
    loading (mask, preload, size){
        return new Modal({
            wrapper: preload,
            data:{
                type: 'loading',
                btns: false,
                title: false,
                mask: mask,
                size: size
            }
        });
    },
    /**
     * 显示对话框
     * @method Gom.UI.Modal.center
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts
     *                              传入的opts参数为string时，则表示为opts.content
     * @return {Modal} 弹出层实例
     */
    center:function(opts){
        const confirmStatic = {
            title: opts.title || '',
            btns: false
        };
        return  this.layout(confirmStatic, opts, 'center').render();
    },
    /**
     * 显示 top layout
     * @method Gom.UI.Modal.top
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts
     *                              传入的opts参数为string时，则表示为opts.content
     * @return {Modal} 弹出层实例
     */
    top (opts){
        const bottomStatic = {
            title: opts.title || '',
            btns: false,
            mask: false,
            close: true
        };
        return this.layout(bottomStatic, opts, 'top').render();
    },
    /**
     * 显示 bottom layout
     * @method Gom.UI.Modal.bottom
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts
     *                              传入的opts参数为string时，则表示为opts.content
     * @return {Modal} 弹出层实例
     */
    bottom (opts){
        //比如下面的时间选择器， ACTIONSHEET等
        const bottomStatic = {
            title: opts.title || '',
            btns: {
                no: '取消',
                yes: '完成'
            }
        };
        return this.layout(bottomStatic, opts, 'bottom').render();
    },
    /**
     * popup 较类似于bottom,只不过是全屏的 :)
     * @method Gom.UI.Modal.bottom
     */
    popup (opts){
        const popupStatic = {
            title: opts.title || '',
            class: 'modal-popup',
            btns: {
                yes: 'OK',
                no: '取消'
            }
        };
        return this.layout(popupStatic, opts, 'bottom').render();
    },
    /**
     * 显示 popover layout
     * @method Gom.UI.Modal.popover
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts 传入的opts参数为string时，则表示为opts.content
     * @param {object|string} opts.bindElem 弹出层绑定的元素（位置）
     */
    popover (opts){
        const popoverStatic = {
            title: '',
            btns: false
        };
        if(!opts.bindElem){
            console.warn('没有定义popover弹出层绑定的元素');
            return;
        }else{
            var $bindElem = $(opts.bindElem),
                pos = $bindElem.offset();
        }
        var popover = this.layout(popoverStatic, opts, 'popover').render();
        var trisize = 20, tripos = 'tri-bottom',
            $modal = popover.getModal(), mw = $modal.width(), mh = $modal.height(),
            top = pos.top - mh/2 - trisize/2,
            left = pos.left+(pos.width-mw)/2,
            fullWidth = $('body').width(), gap = 10;

        if(pos.top< mh){
            top = pos.top + mh/2 + trisize;
            tripos = 'tri-top';
        }
        if(left < gap){
            left = gap;
            tripos += ' tri-left';
        }else if(left>fullWidth-mw-gap){
            left = fullWidth-mw-gap;
            tripos += ' tri-right';
        }
        $modal.addClass(tripos).css({
            left: left,
            top: top
        });

        return popover;
    },
    /**
     * 显示 tips,实质就是popover，加上tips的样式而已(啊？不好意思暂不能多开，原因，你猜！)
     * @method Gom.UI.Modal.tips
     * @param {object|string} opts 传入的opts参数为object时，会覆盖static默认参数, opts参数:@see Gom.UI.Modal#opts 传入的opts参数为string时，则表示为opts.content
     * @param {object|string} opts.bindElem 弹出层绑定的元素（位置）
     * @return {Modal} 弹出层实例
     */
    tips (opts){
        $.extend(opts, {'class': 'modal-tips', mask: false});
        this.popover(opts);
    },
    /**
     * 显示不同类型的弹出提示
     * @param {string} content 显示的内容;
     * @param {string} toastType 显示类别，有 warn info error, 默认info;
     * @return {Modal} 弹出层实例
     */
    toast (content, toastType){
        console.log(content, '--------' , toastType, 'test');
        toastType = toastType || 'info';
        return new Modal({
            data:{
                type: 'toast-'+toastType,
                content: content,
                btns: false,
                title: false,
                mask: false
            }
        }).render();
    }
};

export {Modal, Modals};
