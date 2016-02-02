import {Modals} from '../ui/ui.modal';
var loading;
//要达到的设定有：
//支持实际场景不跨域开发跨域时的配置 devCrossDomain: true(CROS)
//支持 jsonp与ajax的一键切换开发模式，当模式变化时，前端可以快速反应
//支持 header, data, cookie相关数据传输
//支持 ajax injector， 在ajax request与response处可以统一处理。

//默认Ajax截击器
var defaultInject = {
    request: function(e, xhr, options){
        //console.log(e, xhr, options, 'default request inject');
    },
    response: function(e, xhr, options){
        //console.log(e, xhr, options, 'default response inject');
    }
};

//从外部自定义Ajax截击器
var modelInject = $.extend({}, defaultInject);
//如果有外部Ajax截击器则均触发，否则仅触发默认;
var inject = function(req, res){
    modelInject.request = function(e, xhr, options){
        defaultInject.request(e, xhr, options);
        var defreq = req(e, xhr, options);
        if(defreq === false) return false;   //自定义的req return false时阻止ajax请求
    };

    modelInject.response = function(e, xhr, options){
        defaultInject.response(e, xhr, options);
        res(e, xhr, options);
    };
};

//全局处理
$.ajaxSettings.timeout = 1000 * 60; //默认超时时间为1分钟
$.ajaxSettings.error = function(xhr, errorType) {
    if (errorType === 'timeout') {
        Modals.toast('信号偏弱，访问超时', 'error');
    } else if (errorType === 'error') {
        var statusCode = xhr.status;
        Modals.toast('请求发生错误,HTTP状态码:' + (statusCode?statusCode:'空'), 'error');
        if (statusCode === 404 || statusCode === 500) {   //处理状态码错误
            //window.location.href = '?' + statusCode;
        }
    }
};

$(document).on('ajaxBeforeSend', function(e, xhr, options){
    loading = Modals.loading(false).render();
    var req = modelInject.request(e, xhr, options);
    if(req === false) return false;  //阻击发出请求
}).on('ajaxComplete', function(e, xhr, options){
    loading.remove();
    modelInject.response(e, xhr, options);
});

/**
 * Model分构造函数与方式调用二种调用，
 * 其用处为构造函数时用于构造Modal的ajax封装，用法为 new Model({url: '//example.com/getList?id=123'});
 * 为方式时作为ajax拦截注入器注入request与response, 用法为 new Model({req:function(){}, res: function(){}});
 * @class Gom.Service
 * @alias Service
 * @param {object} opts A:参列 或 B:opts.req, opts.res
 * @param {string} opts.url A时的属性
 * @param {object} opts.param A时的属性 默认参数
 * @param {object} opts.req B时的属性 对所有请求截击
 * @param {object} opts.res B时的属性 对所有返回截击
 * @examle B: Service ajax注入器操作，对request,response统一处理。
    new Service({
        req:function(e, xhr, options){
            console.log(e, xhr, options, 'def request inject');
            if(!!~options.url.indexOf('http://www.test.me:3003')) return false;   //return false时拦截ajax发出请求发现
        },
        res: function(e, xhr, options){
            console.log(e, xhr, options, 'def response inject');
        }
    });
    //A:Service ajax操作
    var listModel = new Service({
        url: 'http://www.test.me:3003/api/mall/receipts'
    });
    listModel.fetch({userId:123}).done(function(data){
        console.log(data, 'data');
    });
 *
 *
 *
 *
 */
class Service {
    constructor (opts) {
        //如果为注入器，仅执行注入操作，不实例化Service;
        if(opts.req || opts.res){
            inject(opts.req, opts.res);
            return;
        }
        this.url = opts.url;
        this.params = opts.params || {};
        /**
         *@method Gom.Service#get
         * @see  http://zeptojs.com/#$.get
         */
        this.get = $.get;
        /**
         * @method Gom.Service#post
         * @see  http://zeptojs.com/#$.post
         */
        this.post = $.post;
    }
    /**
     * 一般用于post保存数据
     * @method Gom.Service#save
     * @param {object} params 保存的数据
     * @return promise
     */
    save (params){
        return this.ajax($.extend({}, this.params, params), {type: 'POST'});
    }
    /**
     * 一般用于get获取数据
     * @method Gom.Service#fetch
     * @param {object|*} ids id集合或id等
     * @return promise
     */
    fetch (ids){
        return this.ajax($.extend({}, this.params, ids));
    }
    /**
     * 获取jsonp数据
     * @method Gom.Service#jsonp
     * @param {object|*} params集合
     * @return promise
     */
    jsonp (params){
        return this.ajax($.extend({}, this.params, params), {dataType: 'jsonp', type : 'GET'});
    }
    /**
     * 同步获取本地模板
     * @method Gom.Service#tmpl
     */
    tmpl (){
        return this.ajax({dataType:'html', async: false})
    }

    /**
     * @method Gom.Service#ajax
     * @param {object} data
     * @param {object} opts
     * @returns {promise}
     * @see  http://zeptojs.com/#ajax 参见zepto的ajax里的data与opts
     */
    ajax (data, opts){
        var ajaxOpts = {}, opts = opts || {};
        if(opts.withCredentials){
            ajaxOpts.xhrFields = {
                withCredentials: true
            };
        }
        $.extend(ajaxOpts, opts,  {
            url: this.url,
            data: $.extend({}, this.params, data),
            dataType: opts.dataType || 'json', //json, jsonp, script, xml, html, or text.
            //headers: opts.headers || {}, //自定义请求会触发预请求
            //async: opts.async || true,    //默认异步
            //crossDomain: true,
            //timeout: 300,
        });

        return $.ajax(ajaxOpts);
    }
}

export default Service;
