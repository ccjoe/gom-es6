/**
 * tools 封装
 * @author Joe Liu
 * @email icareu.joe@gmail.com
 */

/**
 * @method Gom.Utils
 */
var ua = window.navigator.userAgent;
var Utils = {
    version: '1.0.0',

    isWebApp: /http(s)?:\/\//.test(location.protocol),
    isInWeichat: ua.indexOf('MicroMessenger') > -1 ? true : false,
    /**
     * 判断是否在携程的APP中
     * @prop {Boolean} Gom.Utils.isInCtripApp
     */
    isInCtripApp: !!(navigator.userAgent.match(/ctripwireless/i) && (window.location.protocol != "file:")),

    openApp: function(packageName){
        // 通过iframe的方式试图打开APP，如果能正常打开，会直接切换到APP，并自动阻止a标签的默认行为  否则打开a标签的href链接
        var ifr = document.createElement('iframe');
        ifr.src = packageName; //'com.baidu.tieba://';
        ifr.style.display = 'none';
        document.body.appendChild(ifr);
        window.setTimeout(function(){
            document.body.removeChild(ifr);
        },3000);
    },
    guid: function () {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }
};
export default Utils;
