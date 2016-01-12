//引入插件时没有参数，因为插件在框架里全局运行， 这就要求框架引入依赖的zepto需在框架之前
import $ from '../utils/fx';
import $$ from '../utils/swipe';

//水平或垂直滚动的面板，just it;
var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
    (/firefox/i).test(navigator.userAgent) ? 'Moz' :
        'opera' in window ? 'O' : '';
var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
/**
 * @class Gom.UI.Scroll
 * @alias Scroll
 * @param {object} opts 参列
 * opts.wrapper     require 滚动对象所在的容器
 * opts.className   require className 滚动对象的className
 * opts.step        options 步长 默认0 不计步长，滚动的结果一定是以此为单位, 滚屏网站时可以一屏一步长,
 *                  非滚动选择组件(time, district..)一般不用此属性,否则滚动以步长计不会具体到点
 * opts.outer       options 允许出界的范围,默认100
 * opts.outerFront       options 自定义front出界显示的html,false时没有，''时有默认，指定时显示指定
 * opts.outerEnd         options 同上
 * opts.frontText  options 允许出界位置上面显示的html或文字
 * opts.endText  options 允许出界位置上面显示的html或文字
 * opts.speed 1     0与1之间  速度控制，默认1，在time选择器时设置小更容易选择，在页面滚动设置为1较好。
 * opts.outerEnd    允许出界位置下面显示的html或文字
 * opts.direction   options vertical/horizontal 默认为垂直 水平与垂直
 * opts.onScroll    options 每次滚动时回调 回调里的this指向本实例
 * opts.endScroll   options 每次滚动停回调 回调里的this指向本实例
 * opts.onFront       options 滚动到上时 回调里的this指向本实例
 * opts.onEnd    options 滚动到下时 回调里的this指向本实例
 //* opts.scrollBar options 是否显示滚动条
 * @example 实例
 * new Scroll({
         wrapper    : '.scroll-example2',    //滚动对象所在的容器
         className  : '.scroll-content',      //滚动对象的className
         direction  : 'vertical', //'vertical',             //水平与垂直
         step       : 0, // 不设置步长
         outer:       允许出界的范围
         frontText : '允许出界位置上面显示的html或文字',
         EndText   : '允许出界位置下面显示的html或文字',
         onScroll: function(point){ },    //每次滚动时回调
         endScroll: function(point){ console.log('单次滚动结束'); }, //   每次滚动停回调
         onFront: function(){ console.log('滚动到最上面，滚动停止时触发')},       //滚动到上时
         onEnd:  function(){ console.log('滚动到最下面，滚动停止时触发')}   // 滚动到下时
    });
 */

var getFreshStr = function(moveStr, freshStr){
    return '<div class="pull-to-refresh-layer">' +
    '<div class="pull-show-item"><span class="preloader-text">'+moveStr+'</span><span class="preloader"></span></div>' +
    '<div class="pull-show-item"><span class="pull-to-refresh-text">'+freshStr+'</span><span class="pull-to-refresh-arrow"></span></div>' +
    '</div>';
};

class Scroll {
    constructor  (opts) {
        opts.direction = opts.direction || 'vertical';

        var frontText = opts.frontText || '上拉刷新', endText = opts.endText || '下拉加载';
        var $el = $(opts.wrapper);
        var defalutsThis = {
            $wrapper : $el,
            $scroll  : $el.find(opts.className),
            step    : opts.step || 0,
            speed   : opts.speed || 1,
            outer   : opts.outer===void 0 ? 100 : opts.outer,
            isX     : opts.direction !== 'vertical',
            onScroll  : opts.onScroll || function(){},
            endScroll : opts.endScroll || function(){},
            onFront : opts.onFront || function(){},
            onEnd : opts.onEnd || function(){}
        };

        if(!defalutsThis.isX && Number(defalutsThis.outer)>0){
            defalutsThis.outerFront = opts.outerFront===false?'':(opts.outerFront?opts.outerFront:getFreshStr('正在为您刷新', frontText));
            defalutsThis.outerEnd =  opts.outerEnd===false?'':(opts.outerEnd?opts.outerEnd:getFreshStr('正在拼命加载中...', endText));
        }
        $.extend(this, defalutsThis);
        this.construct();
    }
    construct (){
        this.$scroll.addClass('gom-scroll');
        this.bindScroll();
    }
    bindScroll (){
        var that = this, $wrapper = this.$wrapper, direct = this.isX?'horizontal':'vertical';
        if(this.outerFront){
            $wrapper.prepend('<div class="ui-scroll-front gom-scroll-out">'+this.outerFront+'</div>');
        }
        if(this.outerEnd){
         $wrapper.prepend('<div class="ui-scroll-end gom-scroll-out pull-up">'+this.outerEnd+'</div>');
        }

        var swipeOpts = {
            //swipeY: 30,
            moveCallback (point){
                that._setScrollTrans(point, true);},
            endCallback (point){
                that._setScrollTrans(point, false);
            }
        };
        this.isX ?
        $wrapper.addClass('ui-scroll ui-scroll-'+direct).swipeLeft(swipeOpts).swipeRight(swipeOpts):
        $wrapper.addClass('ui-scroll ui-scroll-'+direct).swipeTop(swipeOpts).swipeBottom(swipeOpts);
    }
    //滑动区域尺寸，纵向滚动获取总高度，横向滚动获取总宽
    getScrollSize (){
        return !this.isX ? this.$scroll.height() : this.$scroll.width();
    }
    //容器高度
    getWrapperSize () {
        return !this.isX ? this.$wrapper.height() : this.$wrapper.width();
    }
    //滚动到 num, elem, top, bottom
    /**
     * 滚动到...
     * @method Gom.UI.Scroll#scrollTo
     * @param {object} where 可以为具体的数字，元素, top, bottom字符串
     * @param {function} callback 滚动到后回调
     */
    scrollTo (where, callback){
        var toType = typeof  where, val;
        if(where === 'top'){
            val = 0;
        }else if(where === 'bottom'){
            val = -this.getMaxTrans();
        }
        if(toType === 'number'){
            val = where;
        }
        this._scrollFxTo(val, callback);
        console.log(this.getSteps(), '滚动的步长为：');
    }

    /**
     * 设置了step时获取滚动了多少步长
     * @method Gom.UI.Scroll#getSteps
     * @return  {number} 步长数
     */
    getSteps (){
        return   this.$scroll.data('swipe-steps') || 0;
    }
    _scrollFxTo (val, callback){
        //有步长值的话以步长计
        if(this.step){
            var vals = this._getTransStep(val);
            console.log(vals, '步长信息');
            val = vals.val;
            this.$scroll.data('swipe-steps', vals.stepNum);
        }
        console.log('set data swipe offset');
        this.$scroll.data('swipe-offset', val);
        this.$scroll.fx(this._scrollCount(val), 'normal', 'linear', callback?callback:function(){});  //, 'normal', 'easeOutQuint'
    }
    //滚动时回调（moving为true为事件中回调，false为事件结束时回调）
    _setScrollTrans (point, moving){
        var distance = this.isX ? point.swipeX : point.swipeY;
        var transVal = this._getTransVal(distance, point.swipeTime, moving);
        var transStr = this._scrollCount(transVal);
        if(moving){
            this.$scroll.css(transStr);
            this.onScroll(point);
        }else{
            //hold住时不回弹,用于上拉刷新时等待刷新结果
            if(!this.hold){
                this._scrollFxTo(transVal); //!this.hold ? transVal : $('.pull-to-refresh-layer').height()
            }
            this.endScroll(point);
        }
    }
    /**
     * 滚动到顶请求数据时需要调用，一般用于onFront显示刷新请求数据，成功后调用hideFresh()隐藏刷新
     * @method Gom.UI.Scroll#showFresh
     * @param {string} [pos=front] 显示刷新，头部刷新front,尾部end
     * @return  {number} 步长数
     */
    showFresh (pos){
        pos = pos || 'front';
        $('.ui-scroll-'+pos).addClass('refreshing').removeClass('pull-up');
        this.hold = true;
    }
    /**
     * 滚动到底请求数据时需要调用
     * @method Gom.UI.Scroll#hideFresh
     * @param {string} [pos=front] 隐藏刷新，头部刷新front,尾部end
     * @return  {number} 步长数
     */
    hideFresh (pos){
        pos = pos || 'front';
        var that = this;
        var toPos = pos==='front'?0:-(this.getMaxTrans());
        that.scrollTo(toPos, function(){
            $('.ui-scroll-'+pos).removeClass('refreshing');
            that.hold = false;
        });
    }
    getMaxTrans (){
        return this.getScrollSize() - this.getWrapperSize();
    }
    //hold时与滑动时的边界是带有outer的， 滑动停止时的边界不带有outer值，
    rangeCheck (dis, moving){
        var maxTransDis = this.getMaxTrans(),
            maxOuter    = moving ? this.outer : 0,
            maxRange = maxTransDis + maxOuter;

        if(dis > maxOuter){
            dis = maxOuter;
        }else if(Math.abs(dis) > maxRange){
            dis = -maxRange;
        }
        return dis;
    }
    //计算当前滚动到的并限制边界范围
    _getTransVal (distance, swipeTime, moving){

        //限制区域
        var maxTransDis = this.getMaxTrans(),
            maxOuter    = this.outer,
            maxRange = maxTransDis + maxOuter,
            singleSwipeDis = distance,
            swipeOffset = this.$scroll.data('swipe-offset') || 0;
            distance += swipeOffset;


        if(0>distance && distance>=-maxTransDis){
            distance = moving ? distance : singleSwipeDis*this._getRatio(swipeTime)+swipeOffset;
        }
        var absDis = Math.abs(distance), disBefChk = distance;
            distance = this.rangeCheck(distance, moving);

        console.log(swipeOffset, moving, distance, maxTransDis, maxRange,  this._getRatio(swipeTime), this.getScrollSize(), this.getWrapperSize());

        if(!this.outer){
            return distance;
        }

        var $usf = $('.ui-scroll-front');
        var $use = $('.ui-scroll-end');
        //在顶端越界时(使用的是最后一个absDis,因为distance在rangeCheck后不是拖动后的最后状态)
        if(distance >= 0 && this.outerFront){
            $usf.show();
            //超过outer一半时箭头变化
            if(disBefChk <= maxOuter/2){
                $usf.removeClass('pull-up');
            }else if(disBefChk > maxOuter/2){
                $usf.addClass('pull-up');
                if(!moving  && swipeOffset===0){
                    this.showFresh();
                    this.onFront();
                }
            }
            if(!moving){ //moveEnd时
                $usf.removeClass('pull-up');
                distance = 0;
            }
        }

        if(absDis > maxTransDis && this.outerEnd){
            $use.show();
            var moveOutDis = maxRange-absDis;
            //超过outer一半时箭头变化
            if(moveOutDis <= maxOuter/2){
                $use.removeClass('pull-up');
                if(!moving && swipeOffset===-maxTransDis){
                    this.showFresh('end');
                    this.onEnd();
                }
            }else if(moveOutDis > maxOuter/2){
                $use.addClass('pull-up');
            }
            if(!moving){ //moveEnd时
                $use.addClass('pull-up');
                distance = -maxTransDis;
            }
        }
        return distance;
    }

    //计算当前滚动到的并限制步长结果的值,返回步长数与与滚动步长的值
    _getTransStep (val){
        var step = this.step, stepNum = Math.round(val/step);
        return {
            stepNum: Math.abs(stepNum),
            val: step*stepNum
        };
    }
    //暂停回弹
    _holdScroll (){
        this.hold = true;
    }
    //根据swipe时间计算滚动速度
    _getRatio (swipeTime){
        var ratio, speedval = this.speed*1000;
        if(swipeTime > speedval){
            ratio = 1;
        }else{
            ratio = speedval/swipeTime;
            ratio = ratio > 20 ? 20 : ratio;
        }
        return ratio;
    }

    //根据值计算滚动translate对象
    _scrollCount (val){
        var isX =  this.isX;       //水平垂直
        var x = isX ? (val+'px') : '0',
            y = isX ? '0' : (val+'px');
        var props = {};
        props['-'+ vendor + '-transform'] = has3d ?
        "translate3d("+x+","+y+",0)" :
        "translate("+x+","+y+")";
        return props;
    }

}
export default Scroll;
