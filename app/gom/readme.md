# GomUI ES6, Gom is Go Mobile! [ES6 VERSION]

[Gom的实践与实例](https://github.com/ccjoe/gom-es6)
WebAPP ES6 MVC框架,包含丰富灵活配置的UI,  History Html5 SPA路由, Model等的封装
将实现WebApp HybridApp SPA MPA 多种方式的开发模式
  
  
使用ES6版本的库时，兼容ES5与ES6的开发模式。
gulpfile.js打包实现ES6 to ES5;推荐使用ES6但也可以自由选择是否使用ES6

<iframe src="https://ghbtns.com/github-btn.html?user=ccjoe&repo=gom&type=watch&count=true" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
<iframe src="https://ghbtns.com/github-btn.html?user=ccjoe&repo=gom&type=fork&count=true" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>

项目地址： [https://github.com/ccjoe/gom](https://github.com/ccjoe/gom)  
示例地址： [https://github.com/ccjoe/gom-es6](https://github.com/ccjoe/gomapp) [在线预览](http://ccjoe.github.io/gom/app)  
文档地址： [http://ccjoe.github.io/gom/gom/docs](http://ccjoe.github.io/gom/gom/docs) 或 [http://f2ee.com/gom/gom/docs](http://f2ee.com/gom/gom/docs)  


## 运行入口
```javascript
require(['App', 'route'], function(App, route){
    new App(config, route).run();       //config需要先定义，见下面说明
});
```

## APP Route 路由表相关配置(指向相应的视图与控制器)

每当路由到一个地址(即页面)，会有相应的`cro对象`(CurrentRoute Object)，最大化的cro如下：（最小化的仅tmpl与ctrl必须配置一项，根据实际情况）
```
{
    tmplname : 'sample'    //optional(tmpl与ctrl必须指定一个) 页面调用的模块名称 template
    ctrl : 'sample     //optional' 页面对应的ctrl的路径 ctrl
    title: 'SAMPLE'    //optional 页面标题
    data : {}          //optional 页面需要的数据（一般不会直接写入，由ajax动态写入）
    params: {}         //optional 页面间相互传递数据时设置此对象
    wrapper: '#sample' //optional 页面需要插入的DOM位置
    seo: {
        title:  'gom'   //上面title是显示在页面上的，这个设置是<title>标签里的值
        keyword: 'gom, gomUI',
        descption: '一个mobile H5 框架'
    }
}
```
+其中可以不指定`tmplname`与`ctrl`,但必须指定其一。因为显示一个页面可以由tmplname指向的文件或`ctrl指向的ctrl文件(amd引入)`单独或配合在一起去显示一个页面的逻辑。

+对象上有页面调用的视图，ctrl, 标题...,其中比较重要的是数据对象，绑定在`data`上, data可以为静态数据或由model层ajax动态获取由ctrl赋值于此对象上，如果没有data属性只是单纯的渲染不带数据的页面视图
`page.render();`即可实现渲染当前路由对应的页面及数据, 可无。 框架已处理页面的渲染，仅需要配置与匹配data与tmplname指向的模板

+由cro组成的路由表如下：
```javascript
 var router = {
        // '/sample': {
        //     tmpl : 'sample'    //require  页面调用的模块名称 template
        //     ctrl : sample optional 页面对应的ctrl的路径 ctrl
        //     title: 'SAMPLE'    //optional 页面标题
        //     data : {}          //optional 页面需要的数据（一般不会直接写入，由ajax动态写入）
        //     wrapper: '#sample' //optional 页面需要插入的DOM位置
        //     seo: {
        //          title:        //上面title是显示在页面上的，这个设置是<title>标签里的值
        //          keyword:,
        //          descption:
        //     }
        // },
        '/': {
            tmplname: 'app',
            ctrl: main,
            title: 'GoM App'
        },
        '/login': {
            tmplname: 'login',
            ctrl: auth,
            title: '登录'
        },
        '/module': {
           '/': {
               tmplname: 'module/list',
               ctrl: moduleList
           },
           '/:var': {
               tmplname: 'module/view',
               ctrl: moduleView
           },
           '/add': {
               tmplname: 'module/add',
               ctrl: moduleAdd
           },
           '/edit': {
                '/deep': {
                }
           }
      },
}
```

## config的配置
```
var config = {
    DEBUG: true,
    GOM_PATH: '/gom/build/gom',               //gom.js的路径
    API_HOST: 'http://h5.jc.me:3000/api/',    //服务端API HOST
    STORE_VIEWS: true,                        //缓存模板
    EXPIRES: 24,                              //缓存时间(小时)
    CLASSES: {                                //站点ID配置
        VIEWPORT: '#viewport',                //页面Viewport
        HEADER: '#header',                    //Header ID
        FOOTER: '#footer',                    //Footer ID
        CONTENT: '.content'                   //页面交替内容
    }
};
```

## 内置并依赖及自定义的模块有：  
```
"requirejs":"~2.1.15",
"zepto": "~1.1.2",
"history.js": "1.8.0", (将去除)
```
