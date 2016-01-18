'use strict';
//test
import main from './main/ctrl';
import viewdocList from './viewdoc/list_ctrl';
import viewdocHeader from './viewdoc/header_ctrl';
import viewdocComponentList from './viewdoc/component_list_ctrl';
import viewdocModal from './viewdoc/modal_ctrl';
import viewdocSwitch   from './viewdoc/switch_ctrl';
import viewdocSwitchAll   from './viewdoc/switchall_ctrl';
import viewdocScroll   from './viewdoc/scroll_ctrl';
import viewdocForms   from './viewdoc/forms_ctrl';
import pluginsdocSwipe   from './pluginsdoc/swipe_ctrl';
import modeldocIndex from './modeldoc/index_ctrl';
import pagedocPage from './pagedoc/page_ctrl';

//tmpl html FileName; ctrl js FileName
var router = {
     //'/sample': {
     //    tmpl : 'sample'    //optional(tmpl与ctrl必须指定一个) 页面调用的模块名称 template
     //    ctrl : sample optional 页面对应的ctrl的路径 ctrl
     //    title: 'SAMPLE'    //optional 页面标题
     //    data : {}          //optional 页面需要的数据（一般不会直接写入，由ajax动态写入）
     //    params: {}         //页面间相互传递数据时设置此对象
     //    wrapper: '#sample' //optional 页面需要插入的DOM位置
     //    seo: {
     //         title:        //上面title是显示在页面上的，这个设置是<title>标签里的值
     //         keyword:,
     //         descption:
     //    }
     //},
    '/': {
        tmplname: 'app',
        ctrl: main,
        title: 'GoM App'
    },
    '/viewdoc': {
        '/': {
            tmplname: 'viewdoc/component_list',
            ctrl: viewdocComponentList,
            title: '用户组件'
        },
        '/header': {
            tmplname: 'viewdoc/header',
            ctrl: viewdocHeader,
            title: '头部设置文档'
        },
        '/list': {
            tmplname: 'viewdoc/list',
            ctrl: viewdocList,
            title: '列表文档'
        },
        '/modal': {
            tmplname: 'viewdoc/modal',
            ctrl: viewdocModal,
            title: 'Modal设置文档'
        },
        '/switch':{
            tmplname: 'viewdoc/switch',
            ctrl: viewdocSwitch,
            title: 'Slide',
            '/all':{
                ctrl: viewdocSwitchAll,
                title: 'Slide综合示例'
            },
            '/slide':{
                ctrl: viewdocSwitchAll,
                title: 'Slide示例'
            },
            '/tab':{
                ctrl: viewdocSwitchAll,
                title: 'Tab示例'
            },
            '/ajax':{
                ctrl: viewdocSwitchAll,
                title: 'switch配置示例'
            },
            '/:var': {                          //对于这种情况一般这一级的hash都会被处理为路由参数routeParams,但如果匹配到了（如/all）则走上面流程。
                tmplname: 'viewdoc/switchall',
                ctrl: viewdocSwitchAll,
                title: 'Slide综合示例'
            }
        },
        '/scroll':{
            ctrl: viewdocScroll,
            title: 'Scroll',
            '/x':{
                tmplname: 'viewdoc/scroll-x',
                ctrl: viewdocScroll,
                title: '水平Scroll',
            },
            '/y':{
                tmplname: 'viewdoc/scroll-y',
                ctrl: viewdocScroll,
                title: '垂直Scroll',
            }
        },
        '/forms'  : {
            tmplname: 'viewdoc/forms',
            ctrl: viewdocForms,
            title: 'form表单相关'
        },
        '/button': {
            tmplname: 'viewdoc/button',
            title: '按钮Button文档',
            //ctrl: viewdocButton,    //纯静态页面可以不用ctrl初始化
        },
        '/icon': {
            tmplname: 'viewdoc/icon',
            title: 'icon及相关class'
        },
        '/text': {
            tmplname: 'viewdoc/text',
            title: '文字及排版'
        }
    },
    '/pluginsdoc':{
        '/swipe':{
            tmplname: 'pluginsdoc/swipe',
            ctrl: pluginsdocSwipe,
            title: 'Swipe'
        },
        '/fx':{
            tmplname: 'plugindocs/fx',
            //ctrl: pluginsdocFx,
            title: 'Fx'
        }
    },
    '/pagedoc': {
        '/':{
            tmplname: '/pagedoc/page',
            ctrl: pagedocPage
        },
        '/desc': {
            tmplname: '/pagedoc/desc',
            title: 'Page对象及Ctrl说明',
        }
    },
    '/modeldoc': {
        tmplname: '/modeldoc/index',
        ctrl: modeldocIndex,
        title: 'Model对象'
    },
    //HTTP 状态
    '/404': {
        tmplname: '404',
        data: {
            url: location.href     //引起404的地址，默认为空;
        }
    },
    '/500': {
        tmplname: '500'
    }
};

export default router;
