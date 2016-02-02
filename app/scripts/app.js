/* jshint devel:true */
/**
 *框架配置和AppDemo配置,
 **/

var isdebug = !!~location.search.indexOf('debug=1');
window.config = {
    fePath: '',
    VERSION: 'release', //发布时的版本号
    DEBUG: isdebug,
    API_HOST: 'http://h5.jc.me:3000/api/',    //服务端API HOST
    STORE_VIEWS: true,                        //缓存模板
    EXPIRES: isdebug ? 0 : 24*3600*1000,      //缓存时间(24小时)
    MAPKEY: '0b895f63ca21c9e82eb158f46fe7f502', //地图相关的key
    CLASSES: {                                //站点ID配置
        //VIEWPORT: '#viewport',                //页面Viewport
        //HEADER: '#header',                    //Header ID
        //FOOTER: '#footer',                    //Footer ID
        CONTENT: '.content'                   //页面交替内容
    }
};

console.log('APP RUN');
import router from './route';
new Gom.App(config, router).run();
