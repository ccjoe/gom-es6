'use strict';
import {UI} from '../../gom/src/gom';
    var Slide = UI.Slide;
     var ctrl = {
        init: function(page){
            page.render();
            console.log(page, '页面能获取到的所有数据在此对象上');
            var hashs = page.hashs, hashlast = hashs[hashs.length-1];
            console.log(hashlast, 'hashlast');
            if(hashlast === 'all'){
                this.textSlide('slide-vertical');
            }

            if(hashlast === 'slide'){
                this.textSlide('slide-horizontal');
            }

            if(hashlast === 'tab'){
                this.textSlide('tab-top');
            }

            if(hashlast === 'ajax'){
                this.textSlide('tab-bottom', 3);
            }
        },
        //done events文档,  events支持值为function直接量, 双向切换
        events: {
            'click .slide-change-vertical': function(e, targe, that){
                ctrl.textSlide('slide-vertical');
            },
            'click .slide-change-horizontal': function(e, targe, that){
                that.textSlide('slide-horizontal');
            },
            'click .slide-change-tabtop': function(e, targe, that){
                that.textSlide('tab-top');
            },
            'click .slide-change-tabbottom': function(e, targe, that){
                that.textSlide('tab-bottom');
            }
        },
        textSlide: function(direction, index){
            direction =  direction || 'slide-horizontal';
            var slide = new Slide({
                wrapper: $('.content').last(),
                data: {
                    type: direction,    //vertical horizontal
                    initIndex: index || 0,
                    list:[{
                        title: '街景',
                        icon: 'icon-home',
                        content: '<img src="./images/demo/slide3.jpeg"><p class="slide-guide">点击切换为"垂直滚动", <button class="btn btn-positive slide-change-vertical">垂直滚动</button></p>'
                    },{ title: '美女',
                        icon: 'icon-person',
                        content: '<img src="./images/demo/slide1.jpeg"><p class="slide-guide">点击切换为"水平滚动", <button class="btn btn-positive slide-change-horizontal">水平滚动</button></p>'
                    },{ title: '巴黎',
                        icon: 'icon-star-filled',
                        content: '<img src="./images/demo/slide2.jpeg"><p class="slide-guide">点击切换为"TabTop滚动", <button class="btn btn-positive slide-change-tabtop">Tab滚动</button></p>、'
                    },{ title: '巴黎',
                        icon: 'icon-gear',
                        src: '/views/viewdoc/switch-item.html'
                    }]
                }
            }).render();
        }
    };

export default ctrl;

