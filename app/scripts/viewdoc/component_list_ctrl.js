import {UI} from '../../gom/src/gom';
'use strict';

var viewList = {
    media: 'icon', // 'icon'
    list:{
        list: {
            title: '列表设置',
            hash: '?viewdoc/list',
            content: '[list, scroll]<br/>各种列表的实现',
            icon: 'icon-pages'
        },
        modal:{
            title: 'modal',
            hash: '?viewdoc/modal',
            content: '[alert, confirm, loading, toast, bottom, top, center, popover]<br/>弹出层相关，包含对话框，确认框， top/bottom弹出， loading, toast',
            icon: 'icon-pages'
        },
        switch:{
            title: 'switch',
            hash: '?viewdoc/switch',
            content: '[slide, swipe, tab]<br/>实现横向纵向滚动切换,图片文本等slide效果,swipe的实现,tab 等',
            icon: 'icon-pages'
        },
        scroll:{
            title: 'scroll',
            hash: '?viewdoc/scroll',
            content: '[scroll, time-select, date-select]<br/>实现横向纵向滚动,图片文本scroll效果等',
            icon: 'icon-pages'
        },
        forms:{
            title: 'form各组件',
            content: '[select]<br/>包含form各组件',
            hash: '?viewdoc/forms',
            icon: 'icon-compose'
        },
        button:{
            title: 'button',
            content: '[button, components]<br/>包含按钮的(或组件类)的三种声明方式',
            hash: '?viewdoc/button',
            icon: 'icon-search'
        },
        icon:{
            title: 'icons',
            content: '[icon] <br/> 在组件中data下有icon属性的，其值仅需要为icon-iconname作为class值',
            hash: '?viewdoc/icon',
            icon: 'icon-right'
        },text:{
            title: 'text及排版',
            content: '[h1-h6] <br/> 文字及排版相关描述',
            hash: '?viewdoc/text',
            icon: 'icon-code'
        },
        swipe:{
            title: 'swipe插件',
            content: '[swipe, swipe-left, swipe-right, swipe-top, swipe-bottom] <br/>  slide的实现原理，实现各种滑动',
            hash: '?pluginsdoc/swipe',
            icon: 'icon icon-star-filled'
        },
        header: {
            title: 'header头部设置',
            hash: '?viewdoc/header',
            icon: 'icon-check'
        },
        footer:{
            title: 'footer设置',
            hash: '?viewdoc/footer',
            icon: 'icon-check'
        }
    }
};
export default {
    init: function(page){
        page.data = viewList;
        page.render();

        new UI.List({
            data: viewList,
            wrapper: '.component-list'
        }).render();
    }
};
