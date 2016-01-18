/**
 * instead of zepto touch.js
 * @author Joe Liu
 * @email icareu.joe@gmail.com
 */

function swipe($elem, opts) {
    var defaults = {
        'swipeX': 0,     //x horizontal distance
        'swipeY': 0,     //y vertical distance
        'swipeTime': 20, //事件的时间必须大于这个才能触发
        'direction': null
        //'degree': 30          //0为不限制，否则动作必须小于这个角度才能触发相应事件
    };
    opts = $.extend({}, defaults, opts);
    var doPoint = {
        //默认值以及置空
        setNull: {
            startX: null,
            startY: null,
            startTime: null,
            moveX: null,
            moveY: null,
            moveTime: null,
            swipeX: null,
            swipeY: null,
            swipeTime: null,
            direction: null
        },
        //边界检查
        checkRange: function (point) {
            //console.log(Math.abs(point.swipeX), opts.swipeX, Math.abs(point.swipeY), opts.swipeY, (opts.direction ? point.direction === opts.direction : true));
            return Math.abs(point.swipeX) >= opts.swipeX &&
                   Math.abs(point.swipeY) >= opts.swipeY &&
                (opts.direction ? point.direction === opts.direction : true) &&
                point.swipeTime >= opts.swipeTime;
        },
        //方向检测
        getDirection: function (point) {
            if (Math.abs(point.degree) > 45) {    //水平方向
                return point.swipeX < 0 ? 'left' : 'right';
            } else {                              //垂直方向
                return point.swipeY < 0 ? 'top' : 'bottom';
            }
        },
        //计算角度 垂直方向近0,水平方向近90
        getAngle: function (xd, yd) {
            return Math.atan(yd / xd) * 180 / Math.PI;
        }
    };
    //设置或获取point信息
    var vendor = (/webkit/i).test(navigator.appVersion) ? 'webkit' :
        (/firefox/i).test(navigator.userAgent) ? 'Moz' :
            'opera' in window ? 'O' : '';
    var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();

    var point = {
        vendor: vendor,
        has3d: has3d,
        set: function (name, val) {      //设置相应属性
            if (typeof name === 'string') {
                this[name] = val;
            } else {
                $.extend(this, name);
                this.auto();           //move与end更新时更新相应opts信息
                //console.log(this, 'poine');
                return this;
            }
        },
        auto: function () {             //在set point时自动计算opts相应值
            this.swipeX = this.moveX - this.startX;     //滑动距离X
            this.swipeY = this.moveY - this.startY;     //滑动距离Y
            this.swipeTime = this.moveTime - this.startTime;  //滑动时长Yms
            this.degree = doPoint.getAngle(this.swipeY, this.swipeX);  //滑动角度Yms
            this.direction = doPoint.getDirection(this);
        }
    };

    //callbacks
    var cbs = {
        startCallback: function (e) {
            e.preventDefault();
            $.extend(point, doPoint.setNull); //重置初始值
            var cp = e.touches[0],
                startPoint = {
                    startX: cp.pageX,
                    startY: cp.pageY,
                    startTime: +new Date()
                    //identifier: e.identifier
                };
            point.set(startPoint);
            opts.startCallback ? opts.startCallback(point, e) : null;
        },
        moveCallback: function (e) {
            e.preventDefault();
            var cp = e.touches[0],
                movePoint = {
                    moveX: cp.pageX,
                    moveY: cp.pageY,
                    moveTime: +new Date()
                    //identifier: e.identifier
                };
            point.set(movePoint);
            //console.log(doPoint.checkRange(point), 'checkRange');
            if (!doPoint.checkRange(point)) {
                return;
            }
            opts.moveCallback ? opts.moveCallback(point, e) : null;
        },
        endCallback: function (e) {
            e.preventDefault();
            if (!doPoint.checkRange(point)) {
                return;
            }
            opts.endCallback ? opts.endCallback(point, e) : null;
        }
    };

    // Touch事件监听
    $elem.die("touchstart,touchmove,touchend");
    $elem.get(0).addEventListener('touchstart', cbs.startCallback);
    $elem.get(0).addEventListener('touchmove', cbs.moveCallback);
    $elem.get(0).addEventListener('touchend', cbs.endCallback);
}


//触发事件的条件 opts defaults opts
var defaults = {
    'swipeX': 30,     //x horizontal distance
    'swipeY': 30,     //y vertical distance
    'direction': null
    //'degree': 30          //0为不限制，否则动作必须小于这个角度才能触发相应事件
};


/**
 *
 * @example
 * $switchs.swipe({
 *      swipeX: 0,
 *      swipeY: 0,
 *      direction: '',
        startCallback: function(point){

        },
        moveCallback: function(point){

        },
        endCallback: function(point){

        }
    });
 *
 * point对象，在回调中表示滑动时的值，其中swipeX,swipeY, direction作为opt传入表示触发的条件
 * {
 *  startX: null,
    startY: null,
    startTime: null,
    moveX: null,
    moveY: null,
    moveTime: null,
    swipeX: null,
    swipeY: null,
    swipeTime: null,
    direction: null
   }
 */
['swipe', 'swipeLeft', 'swipeRight', 'swipeTop', 'swipeBottom'].forEach(function (item) {
    var direct = /swipe(\w*)/.exec(item)[1].toLowerCase(), baseArgs = {};

    if(direct === 'left' || direct === 'right'){
        baseArgs.swipeX = defaults.swipeX;
    }else if(direct === 'top' || direct === 'bottom'){
        baseArgs.swipeY = defaults.swipeY;
    }

    $.fn[item] = function (opts) {
        this.each(function() {
            var itemArgs = $.extend({}, baseArgs, opts, {direction: direct});
            swipe($(this), itemArgs);
        });
        return this;
    };
});

export default $;




