import Page from '../core/page';
import * as Modal from  '../ui/ui.modal';
import * as Url from '../utils/url';
import Store from '../utils/store';
    /**
 * App对象
 * @class Gom.App
 * @alias App
 * @param {object} config -App配置选项config,
 * @param {boolean} [config.DEBUG=false] -DEBUG模式(无缓存,可见源码)
 * @param {boolean} [config.GOM_PATH]    -requirejs引入Gom时需要定义， 在html直接引入gom.js文件时不需要配置
 * @param {boolean} [config.API_HOST]    -建议将站点请求服务端的host配置于此
 * @param {boolean} [config.STORE_VIEWS] -是否缓存页面于本地
 * @param {number} [config.EXPIRES]     -缓存页面时长，会过期
 * @param {object} [config.CLASSES]     -页面布局类的className配置,尽量默认不要改变
 * @param {object[]} route              - CRO对象集合, App配置选项router，见route.js,
 * @return {app}
 * @example 传入配置文件与路由文件
 *
config需要定义为全局变量，因为框架也需要用到
var config = {
DEBUG: true,
GOM_PATH: '/gom/build/gom',
API_HOST: 'http://h5.jc.me:3000/api/',    //服务端API HOST
STORE_VIEWS: true,                        //缓存模板
EXPIRES: 24,                              //缓存时间(小时)
CLASSES: {                                //站点ID配置
    VIEWPORT: '#viewport',                //页面Viewport
    HEADER: '#header',                    //Header ID
    FOOTER: '#footer',                    //Footer ID
    CONTENT: '.gom-content'                   //页面交替内容
}
};
new App(config, route).run();

有关Webapp内的跳转说明：
站内链接地址必须是形如：  '?module/sub' 的形式(如果调用此类的方法需要传入hashPath，则要传入的格式是module/sub)
站间链接才需要加上 http://host
 */

class App {
    constructor (config={}, route={}) {
        this.config = config;
        this.route = route;
        this.model = {};
        this.history = [];
    }
    /**
     * 启动GomApp
     * @method Gom.App#run
     * @param {function} [callback] - 在初始Gom.App时的需要完全的工作可以定义在callback
     */
    run (callback){       //Gom.App初始化
        var that = this;
        var isHistoryApi = !!(window.history && history.pushState);
        if(!isHistoryApi){
            return;
        }
        History.Adapter.bind(window, 'statechange', () => {
            var state = History.getState();
            state.data.hash = state.data.hash || Url.getHTML5Hash(state.hash) || '/'; //首次进来默认取state.hash
            that.goto(state.data.hash);
        });
        History.Adapter.trigger(window, 'statechange');
        callback ? callback() : null;
        this._initHref();
    }

    _initHref (){
        //对所有链接进行html5处理
        //? 站内链接跳转
        //# 站内组件或hash跳转
        //http:// 站间跳转
        //''为空时当作非链接处理
        $("body").off().on("click", 'a', function(){
            var $t = $(this),
                href = $t.attr('href');

            if(!href || !!~href.indexOf('#') || !href.indexOf('javascript:')) return; //无链接或不存在hash或存在javascript:跳转不处理
            History.pushState({hash: href, prevHash: location.search}, $t.attr('title'), href);
            return false;
        }).on('click', '.icon-left-nav', function(){
            History.go(-1);
            return false;
        });
    }
    //设置了isbug即不读localStorage,否则读设置的值。
    getViewTmpl (tmplname, callback){
        var  that = this, expires = +that.config.EXPIRES;
        if(expires>0){
            var view = Store.get(tmplname);
            if(!!view){
                callback?callback(view):null;
                return;
            }
        }
        $.ajax({url:'views/'+tmplname+'.html', dataType:'html', success  (tmpl){
            if(expires>0){
                Store.set(tmplname, tmpl, expires);
            }
            callback?callback(tmpl):null;
        }});
    }

    setPage (opts){
        if(!opts){
            return;
        }
        opts.config = this.config;
        opts.isback = this.isBack();
        return new Page(opts);
    }
    /**
     * 根据完整hash获取页面对象(即具体路由指向的路由表对象)
     * 路由查找规则，根据hash路径数据长度查找CRO对应对象，在每个长度的index找不到则查找'/:var'， 在最后index有‘/’则查找'/';
     * @todo 如果index=0都没有找到，还是到首页吧，因为在其它环境时（如在app里，会默认加上?appinfo导致解析问题）
     * @method Gom.App#getCRO
     * @param {string} hashPath hashPath是形如 module/list  module/123的值
     * @return {object} CRO (Current Router Object)返回具体路由指向的路由表对象
     */
    getCRO  (hashPath){
        var router = this.route;

        if(typeof hashPath !== 'string') return {};
        if(hashPath === '/') return router['/'];

        var hashRoute = hashPath.split('/');
        var CRO = router, hashLen = hashRoute.length, index=0, hashIndex=0;
        for(;index<hashLen; index++){
            hashIndex = hashRoute[index];
            if(!index){
                CRO = CRO['/'+hashIndex];        //hash index=0时必须完全匹配，第二级才会有 '/'与':var'的路由
                if(CRO === void 0) return;
            }else{
                CRO = CRO['/'+hashIndex] || CRO; //如果在当前index没有找到对应对象时，在此index上还保留上一个index的对象
            }

            if(CRO.index === void 0){            //没有index则加上， 有的话说明取的是上一次设置的CRO,即本次index没有取到值
                CRO.index = index;               //没有则打上标签
            }
            if ((index === hashLen-1) && CRO.hasOwnProperty('/')){  //最后一个index时检查 '/'
                CRO = CRO['/'];
                return CRO;
            }
            //如果CRO的index还停留在上一个index，说明在此index上没找到路由对象
            if(CRO.index === index-1 && CRO.hasOwnProperty('/:var')){
                CRO = CRO['/:var'];
                CRO.index = index;
                CRO.routeParams = hashIndex;
                return CRO;
            }
        }
        CRO.hashs = hashRoute;
        return CRO;
    }
    /**
     * 设置cro, 用于页面向某个页面传递数据
     * @method Gom.App#setCRO
     * @param {string} hashPath hashPath是形如 module/list  module/123的值
     */
    setCRO (hashPath){

    }
    /**
     * 根据完整hash路由或CRO对象到页面，封装了_routeByHash 与 _routeByCRO实现
     * @method Gom.App#goto
     * @example module/list  module/123
     * * ? 站内链接跳转
     * # 站内组件或hash跳转(仅页面内)
     * http(s)://或// 站间跳转 判断是否本域,本域的话跳转到search部分
     */
    goto (where){
        var isstr = typeof where === 'string';
        if(isstr){
            var isThisHost = !!~where.indexOf(location.host);
            if(/^((https?):)\/\//.test(where) && !isThisHost){
                location.href = where;
                return;
            }
            where = !!~where.indexOf('?')?Url.getHTML5Hash(where):where; //过滤url仅获取search里的path部分
        }
        console.log(where, 'where parse by goto');
        this[isstr ? '_routeByHash' : '_routeByCRO'](where);
    }

    /**
     * 根据完整hash路由到页面
     * @private
     * @method Gom.App#_routeByHash
     * @example module/list  module/123
     */
    _routeByHash  (hashPath) {
        this._manageHistory(hashPath);
        var CRO = this.getCRO(hashPath);
        this._routeByCRO(CRO);
    }
    /**
     * 根据CRO对象路由到页面
     * @private
     * @method Gom.App#_routeByCRO
     * @param {object} CRO -CRO对象
     */
    _routeByCRO (CRO){
        var that = this;
        if(this.isRouteNotFound(CRO)){
            return;
        }

        var ctrl = CRO.ctrl;
        if(ctrl){
            CRO.events = ctrl.events;   //将ctrl的事件设置到当前路由对象
        }

        var pageInit = function(){
            var page = that.setPage(CRO);   //初始页面并绑定事件
            if(ctrl && ctrl.init){
                page.hashs =  CRO.hashs;    //将hash对象传递到页面
                ctrl.init(page);            //将传递到页面(ctrl)的所有信息;
            }else{
                page.render();
            }
        };

        if(!CRO.tmplname){
            pageInit();
            return;
        }

        this.getViewTmpl(CRO.tmplname, function(tmpl){
            CRO.tmpl = tmpl;
            pageInit();
        });
    }
    _manageHistory (hashPath){
        if(this.getLastHashByLastIndex(1) === hashPath){
            return;
        }

        var history = this.history;
        history.push(hashPath);
        if(history.length > 10){
            history.shift();
        }
        console.log(history, 'THIS HISTORY');
    }
    /**
     * 从后往前依据 倒数index取历史hash
     * @method Gom.App#getLastHashByLastIndex
     * @param {number} index 从0开始取值
     * @returns {string} route的历史记录
     */
    getLastHashByLastIndex (index){
        var history = this.history;
        return history[history.length-index];
    }
    /**
     * 查询到跳转是否为前进或是后退或是首次进入
     * @method App#isBack
     * @return {boolean|null} true:后退, false:前进, null:首次进入;
     */
    isBack (){
        var last = this.getLastHashByLastIndex(1),
            later  = this.getLastHashByLastIndex(2);

        var oldHashArr = Url.getHashPath(later, true),
            newHashArr = Url.getHashPath(last, true),
            isExistOld = oldHashArr.filter(x=>!!x).length;

        return later ? newHashArr.filter(x => !!x).length < isExistOld : null;
    }
    //判断是否存在CRO而404
    isRouteNotFound (CRO){
        if (!CRO) {
            this.route['/404']['data'] = {url: location.href};
            this.goto('404');
            return true;
        }
        return false;
    }
}

export default App;
