//import {UI} from '../../gom/src/gom';
'use strict';

var UI = Gom.UI;
let {Toggle, InputLocation} = UI;
export default {
    init (page){
        page.render();
        this.createToggles();
        this.createInputLocation();
    },
    createToggles (){
        new Toggle({
            wrapper: '.toggle-wrapper',
            data: {
                name: "xqx",
                content: ['声明式', '函数式']
            }
        }).render();
    },
    createInputLocation (){
        new InputLocation({
            wrapper: '.input-location',
            data:{
                name:　'position'
            }
        }).render();
    }
}
