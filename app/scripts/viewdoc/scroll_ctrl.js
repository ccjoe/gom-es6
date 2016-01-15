//import {UI} from '../../gom/src/gom';
'use strict';
var {Modals,List,Scroll,Select} = Gom.UI;

export default {
    init: function(page){
            page.render();
            var hashs = page.hashs;
            if(hashs.length === 2){
                this.showList();
            }else{
                var lastHash = hashs[hashs.length-1];
                if(lastHash === 'x'){
                    this.showScrollX();
                }else if(lastHash === 'y'){
                    this.showScrollY();
                }else if(lastHash === 'bottom'){
                    this.showTimeSelect();
                }
            }
        },
        events:{
            'click .btn-top': function(e, current, that){
                that.scrollY.scrollTo('top');
            },
            'click .btn-bottom': function(e, current, that){
                that.scrollY.scrollTo('bottom');
            },
            'click .btn-num': function(e, current, that){
                that.scrollY.scrollTo(-300);
            },
            'click .btn-elem': function(e, current, that){
                that.scrollY.scrollTo($('.here'));
            },
            'click a[href="?viewdoc/scroll/modal"]': function(e, current, that){
                that.showModalScroll();
            }
        },
        showList: function(){
            var viewList = {
                list: [{
                    title: '水平滚动页面',
                    hash: '?viewdoc/scroll/x'
                },{
                    title: '垂直滚动页面',
                    hash: '?viewdoc/scroll/y'
                },{
                    title: '弹层滚动',
                    content: '弹出的区域滚动',
                    hash: '?viewdoc/scroll/modal'
                },{
                    title: '弹层底部滚动',
                    content: '指定src的slide子项示例, 将通过ajax获取模板',
                    hash: '?viewdoc/scroll/bottom'
                }]
            };

            var ListSet = new List({
                data: viewList,
                wrapper: $('.content').last()
            });
            ListSet.render();
        },
        showScrollY: function(){
            this.scrollY = new Scroll({
                 wrapper    : '.scroll-example2',    //滚动对象所在的容器
                 className  : '.scroll-content',      //滚动对象的className
                 direction  : 'vertical', //'vertical',             //水平与垂直
                 speed: 0.5,
                 step       : 0, // 不设置步长
                 //outer:       允许出界的范围
                 //outerFront : '允许出界位置上面显示的html或文字',
                 //outerEnd   : '允许出界位置下面显示的html或文字',
                 onScroll: function(point){ },    //每次滚动时回调
                 endScroll: function(point){ console.log('单次滚动结束'); }, //   每次滚动停回调
                 onFront: function(){
                     /*ajax  请求结束后，改变hold的状态即可*/
                     var that = this;
                     $.get('/views/viewdoc/scroll-x.html', function(data){
                         that.hideFresh();
                     })
                 },       //滚动到上时
                 onEnd:  function(){
                     /*ajax  请求结束后，改变hold的状态即可*/
                     var that = this;
                     $.get('/views/viewdoc/scroll-y.html', function(data){
                         that.hideFresh('end');
                     })
                 }   // 滚动到下时
            });
        },
        showScrollX: function(){
            var scrollX = new Scroll({
                 wrapper    : '.scroll-example2',    //滚动对象所在的容器
                 className  : '.scroll-content',      //滚动对象的className
                 direction  : 'horizontal', //'vertical', //水平与垂直
                 step       : $('.scroll-example2').width(), // 步长
                 outer      : 0,  //允许出界的范围
                 outerFront : false,  //允许出界位置上面显示的html或文字
                 outerEnd : false,  //允许出界位置上面显示的html或文字
                // outerEnd  允许出界位置下面显示的html或文字
                 onScroll: function(point){ },    //每次滚动时回调
                 endScroll: function(point){ console.log('单次滚动结束'); },          //每次滚动停回调
                 onFront: function(){ console.log('滚动到最上面，滚动停止时触发')},       //滚动到上时
                 onEnd:  function(){ console.log('滚动到最下面，滚动停止时触发')}    //滚动到下时
            });
        },
        showModalScroll: function(){
            Modals.center(
                '<div class="scroll-mdoal-example">\
                    <div class="scroll-mdaol-content">\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？我的内容能滚动吗？\
                        我的内容能滚动吗？我的内容能滚动吗？\
                    </div>\
                </div>');

            new Scroll({
                wrapper    : '.scroll-mdoal-example',    //滚动对象所在的容器
                className  : '.scroll-mdaol-content',      //滚动对象的className
                outer: 0
            });

        },

        /*时间选择器，html5 时间选择器在iphone上原生即为实现后的效果,最好是判断环境决定是否调用*/
        showTimeSelect: function(isModal){
            isModal = isModal || false;
            var num = ['01','02','03','04','05','06','07','08','09'];
            var minites = [];
            for(var i=10; i<=60; i++){
                minites.push(i);
            }
            new Select({data: {
                title: '时间选择器',
                cascade: false,
                //modal:isModal,
                //wrapper: $('.content').last(),
                level: 3,
                list: {'1':['上午','下午'],'2': num.concat(['10','11','12']), '3': num.concat(minites)},
                onYes: function(val){
                    Modals.toast('选择的值为：' + val);
                }
            }}).render();
        }
    };
