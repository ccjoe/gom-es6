'use strict';

import {UI} from '../../gom/src/gom';
let {Forms, District} = UI;
export default {
    init (page){
        page.render();
        this.createToggles();
        this.createInputLocation();
    },
    createToggles (){
        new Forms.Toggle({
            wrapper: '.toggle-wrapper',
            data: {
                name: "xqx",
                content: ['声明式', '函数式']
            }
        }).render();
    },
    createInputLocation (){
        new Forms.InputLocation({
            wrapper: '.input-location',
            data:{
                name:　'position'
            }
        }).render();
    }
}
