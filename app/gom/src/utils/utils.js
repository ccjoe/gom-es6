/**
 * tools 封装
 * @author Joe Liu
 * @email icareu.joe@gmail.com
 */

/**
 * @method Gom.Utils
 */
var ua = window.navigator.userAgent;
(function(){
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    //var unescapeMap = _.invert(escapeMap);

    // Functions for escaping and unescaping strings to/from HTML interpolation.
    var createEscaper = function(map) {
        var escaper = function(match) {
            return map[match];
        };
        // Regexes for identifying a key that needs to be escaped
        var source = '(?:' + Object.keys(map).join('|') + ')';
        var testRegexp = RegExp(source);
        var replaceRegexp = RegExp(source, 'g');
        return function(string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
        };
    };
    window.escapeHtml = createEscaper(escapeMap);
})();

var templateSettings = {
    //evaluate: /<%([\s\S]+?)%>/g,
    //interpolate: /<%=([\s\S]+?)%>/g,
    //escape: /<%-([\s\S]+?)%>/g
    evaluate: /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape: /\{\{-(.+?)\}\}/g
};

var noMatch = /(.)^/;

var escapes = {
    "'": "'",
    '\\': '\\',
    '\r': 'r',
    '\n': 'n',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
};

var escaper = /\\|'|\r|\n|\u2028|\u2029/g;

var escapeChar = function(match) {
    return '\\' + escapes[match];
};

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
    },
    complier: function(text, settings, oldSettings) {
        if (!settings && oldSettings) settings = oldSettings;
        settings = Object.assign({}, settings, templateSettings);

        var matcher = RegExp([
                (settings.escape || noMatch).source, (settings.interpolate || noMatch).source, (settings.evaluate || noMatch).source
            ].join('|') + '|$', 'g');

        var index = 0;
        var source = "__p+='";
        text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
            source += text.slice(index, offset).replace(escaper, escapeChar);
            index = offset + match.length;

            if (escape) {
                source += "'+\n((__t=(" + escape + "))==null?'':_.escapeHtml(__t))+\n'";
            } else if (interpolate) {
                source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
            } else if (evaluate) {
                source += "';\n" + evaluate + "\n__p+='";
            }
            return match;
        });
        source += "';\n";

        if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

        source = "var __t,__p='',__j=Array.prototype.join," +
            "print=function(){__p+=__j.call(arguments,'');};\n" +
            source + 'return __p;\n';

        try {
            var render = new Function(settings.variable || 'obj', '_', source);
        } catch (e) {
            e.source = source;
            throw e;
        }

        var template = function(data) {
            return render.call(this, data, Utils);
        };

        var argument = settings.variable || 'obj';
        template.source = 'function(' + argument + '){\n' + source + '}';

        return template;
    }
};
export default Utils;
