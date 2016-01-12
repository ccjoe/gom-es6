import {UI} from '../../gom/src/gom';
    'use strict';

    var List = UI.List;
    export default {
        init: function(page){
            page.render();
            this.createList();
        },
        events: {
          'click .create-list':'createList2'
        },
        createList: function(){
            var viewList = {
                media: 'img', // 'icon'
                list: [{
                    img: 'http://placehold.it/42x42',
                    title: '列表示例',
                    content: '列表通过data传入属性实现不同的配置,  通过 data.media可以为img, icon;这个列表data.media为img; data.card为true时显示为创建列表的显示的卡片式',
                    badge: '12'
                },{
                    title: '可点击收缩的标题',
                    isDivider: true,
                    collapse: true
                },{
                    img: '',
                    title: '可收缩的item',
                    content: 'data.list的item单项上通过collapse为true可点击收缩',
                    badge: '10',
                }],
            };

            var ListSet = new List({
                data: viewList,
                wrapper: '#list'
            });
            ListSet.render();
        },
        createList2: function(){
            var viewList = {
                media: 'icon', // 'icon'
                card: true,
                list: [{
                    icon: 'icon-trash',
                    title: 'icon-trash 单项',
                    content: '此例的icon.media为icon,通过配置icon的className可实现配置，此Item上为 icon-trash',
                    badge: '12'
                },{
                    img: 'icon-gear',
                    title: '不可点击,因为item的数据collapse为false',
                    isDivider: true,
                    collapse: false
                },{
                    icon: 'icon-pages',
                    title: 'badge的说明',
                    content: '右侧的为badge,可配置',
                    badge: '10',
                }],
            };

            var ListSet = new List({
                data: viewList,
                wrapper: '#list2'
            });
            ListSet.render();
        }

    };

