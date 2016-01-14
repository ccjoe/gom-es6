//import {UI} from '../../gom/src/gom';
'use strict';

var UI = Gom.UI;
var page = {};
export default {
    //会被框架自动调用
    init: function(page){
        page.render();
    },
    events: {
        'click .header-create': 'createHeader',
        'click .header-settitle': 'setTitle'
    },

    createHeader:function(){
        var header = new UI.Header({
            data: {
                title: '新头部',
                subtitle: 'from 2015/11/11'
            },
            wrapper: '#header'
        });
        header.render();
        page.header = header;
    },
    setTitle: function(){
        console.log('执行多少次');
        page.header.setTitle('setTitle设置的标题');
    }
};
