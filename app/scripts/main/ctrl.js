//import {UI} from '../../gom/src/gom';
'use strict';
var UI = Gom.UI;
var data = '上面的列表是组件渲染方式，这里的文本数据是页面渲染的部分, GoM分页面渲染和ui组件渲染，其都继承于View对象,都有data属性，通过定义组织data，然后调用render方法可以实现不同的渲染方式<br>' +
    '文档地址： <a href="http://fat128-online.qa.nt.ctripcorp.com:8765/docs/">去文档</a>';

var viewList = {
    media: 'img', // 'icon'
    list: [{
        isDivider: true,
        title: '文档页面',
        collapse: true
    },{
        title: '组件及插件(UI)',
        content: 'UI组件及插件文档【VIEW】',
        hash: '?viewdoc',
        badge: 5,
        img: 'images/v.png'
    },{
        title: '页面Page与Ctrl相关',
        content: '页面文档及相关【VIEW,CTRL】',
        hash: 'http://localhost:9000/?pagedoc&argment=test',
        img: 'images/c.png'
    },{
        title: '模型Model类',
        content: '与服务端交互相关封装【MODEL】',
        hash: '?modeldoc&argment2=test2',
        img: 'images/m.png'
    },{
        isDivider: true,
        title: '公用页面',
        collapse: true
    },{
        title: '404',
        content: '404页面',
        hash: '?404',
        icon: 'gear'
    },{
        title: '500',
        content: '500页面',
        hash: '?500',
        icon: 'gear'
    }]
};
var ListSet = new UI.List({
    data: viewList
    //wrapper: '#indexList'     //有wrapper时直接渲染，否则返回fragmentHTML
}).render();

var main =  {
    init: function(page) {
        page.data = data;  //页面的tmpl与data生成的页面
        page.render();    //this.sides页面渲染后回调生成ui组件组成的页面
        this.initCtrl();
    },

    initCtrl: function(){
        main.mainList();
        var header = $('#header').data('widget'); //声明式初始组件可以采用这种方法获取实例对象
        header.onview('click', '.icon-bars', function(){
            main.showSides('left');
        });
    },

    mainList: function() {
        $('#indexList').html(ListSet);
    },

    setSides: function(pos){
        var sidesDesc = $('#sidesDesc').html(); //页面上的内容只有page.render后才能获取到, 所以在main外是获取不到的

        this.side = new UI.Sides({data:{position: pos}}).render();
        this.side.content = sidesDesc + ListSet;
        this.side.setContent();
        var that = this;
        this.side.wrapper.off('click', 'a').on('click', 'a', function(){
            var $t = $(this);
            if($t.hasClass('close')){
                that.side.hide();
            }

            if($t.hasClass('left')){
                that.setSides('left');
            }

            if($t.hasClass('right')){
                that.setSides('right');
            }
        });
    },
    //左右侧边栏
    showSides: function(){
        var side = $('#sides').find('.sides');
        if(!side.length){
            this.setSides('left');
        }else{
            if(this.side.showed){
                this.side.hide();
            }else{
                this.side.show();
            }
        }
    }
};

export default main;
