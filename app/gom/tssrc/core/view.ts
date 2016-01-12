/**
 * Created by sfliu on 2016/1/7.
 */

/// <reference path="../lib/zepto.ts" />
module Gom {
    interface Options {
        wrapper?: string;   //$(opts.wrapper);
        tmplname?: string;  //opts.tmplname  || '';  //模板名称, view的话在route里面配置，partial的话
        tmpl?: string;      //opts.tmpl || '';             //模板html,有模板名称则从通过名称取到tmpl;
        data?: any;         //opts.data || {};
        replace?: boolean;  //opts.replace || false;    //是否替换原标签
        events?: any;       //opts.events || {};         // 对象上的events对象仅适用于此对象的wrapper元素内的事件绑定
    }

    export abstract class View {
        wrapper: ZeptoCollection;
        constructor(opts: Options){
            this.wrapper = $(opts.wrapper);
        }

        render(){

        }
    }
}
