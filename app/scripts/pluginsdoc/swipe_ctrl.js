    'use strict';
    import {Service} from '../../gom/src/gom';
    //Service ajax拦截器操作
    new Service({
        req:function(e, xhr, options){
            //console.log(e, xhr, options, 'def request inject');
            //if(!!~options.url.indexOf('http://www.test.me:3003')) return false;
        },
        res: function(e, xhr, options){
            //console.log(e, xhr, options, 'def response inject');
        }
    });

    var listModel = new Service({
       url: 'http://www.test.me:3003/api/mall/receipts'
    });
    //listModel.fetch({userId:123}).done(function(data){
    //    console.log(data, 'data');
    //});

    export default{
        init: function(page){
            page.render();
            this.swipeDemo();
        },
        swipeDemo: function(){
            var $i = $('.content-swipe-demo');
            console.log($i, '$i');

            $i.swipeTop({
                moveCallback: function (point) {
                    $i.html('<p>方向：top  </p><p>x距离：' + point.swipeX + '</p><p>y距离：' + point.swipeY + '</p><p>角度：' + point.degree + '</p><p>用时：' + point.swipeTime + 'ms</p>');
                }
            });

            $i.swipeBottom({
                moveCallback: function (point) {
                    $i.html('<p>方向：bottom  </p><p>x距离：' + point.swipeX + '</p><p>y距离：' + point.swipeY + '</p><p>角度：' + point.degree + '</p><p>用时：' + point.swipeTime + 'ms</p>');
                }
            });

            $i.swipeLeft({
                moveCallback: function (point) {
                    $i.html('<p>方向：left  </p><p>x距离：' + point.swipeX + '</p><p>y距离：' + point.swipeY + '</p><p>角度：' + point.degree + '</p><p>用时：' + point.swipeTime + 'ms</p>');
                }
            });

            $i.swipeRight({
                moveCallback: function (point) {
                    $i.html('<p>方向：right  </p><p>x距离：' + point.swipeX + '</p><p>y距离：' + point.swipeY + '</p><p>角度：' + point.degree + '</p><p>用时：' + point.swipeTime + 'ms</p>');
                }
            });

        }
    };

