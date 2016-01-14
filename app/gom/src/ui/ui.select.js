import List from '../ui/ui.list';
import {Modals} from '../ui/ui.modal';
import Scroll from '../ui/ui.scroll';
import View from '../core/view';
/**
 * 多级联动或是仅多级选择组件
 * @class Gom.UI.Select
 * @alias Select
 * @extends {Gom.View}
 * @param {object} opts 参列
 * opts.wrapper {selecot} 当非model弹出时需要此属性，组件将插入到此wrapper
 * opts.data包含以下属性：
        title {string}  title
        level {number} 1 级数
        modal {boolean} 底部弹出选择
        cascade {boolean} true/false 是否级联 （级联表示每级之间有显示联系，无级联如时间选择， 有级联如日期选择）
        className 自定义的class
        yardNo {number} 准绳处于第几行,默认第三行(则可见总共五行)
        list = {'1': [], '2': []};
        onSelect(index, step)   //在滑动选择时（滑动的level为index,滑动到的步数step）
        onYes(select val);
        onNo();
 * @example 实例一个时间选择器
 * new Select({
        wrapper:
        title: '时间选择器',
        modal: true,    //显示
        cascade: false,
        level: 3,
        data: {'1':['上午','下午'],'2': _.range(1,13), '3': _.range(1,61)},
        onSelect (index, step){},
        onYes (val){
            console.log('选择的值为：' + val);
        }
    })
 **/
var defaults = {
    title: '请选择',
    yardNo: 3,
    modal: true
};
class Select extends View {
    constructor (opts){
        var data = opts.data = Object.assign({}, defaults, opts.data);
        data.modal = (data.modal === void 0) ? true : data.modal;
        data.className = data.className || '';
        super(opts);
        this.tmpl = this.makeScrollCtn();
    }
    show (){
        let that = this, {data} = this;
        if(data.modal){
            Modals.bottom({
                title: data.title,
                content: this.makeScrollCtn(),
                onYes: function (){
                    var val = that.getSelect();
                    data.onYes ? data.onYes(val) : null;},
                onNo: function (){
                    data.onNo ? data.onNo() : null;
                }});
        }else{
            if(!this.wrapper){
                console.error('当select没有指向为modal显示时，需要指定wrapper属性作为组件根元素');
                return;
            }
            $(this.wrapper).addClass('gom-ui-select').html(this.makeScrollCtn());
        }
        this.setScroll();
        this.initSelect();
    }
    getScrollRoot (){
        var $el = this.wrapper, $classEl = $('.'+this.data.className);
        return $el.length ? $el : ($classEl.length ? $classEl : $('.modal-layout .ui-scroll-select'));
    }
    initSelect (level){
        var $wrapper = this.getScrollRoot();
        if(level){
            $wrapper.find('.ss-cell-'+level).find('li.table-view-cell').eq(0).addClass('active');
            return;
        }
        for(var l=1; l<=this.data.level; l++) {
            $wrapper.find('.ss-cell-'+l).find('li.table-view-cell').eq(0).addClass('active');
        }
    }
    //生成scroll-select所有的 htmlFragment;
    makeScrollCtn (){
        var level = this.data.level, scrollCtn='', levelDom = '';
        var initPadding = (this.data.yardNo-1)*33;
        for(var l=1; l<=level; l++){
            levelDom = this.setListCont(l);
            scrollCtn += '<div class="ui-scroll-select-item ui-scroll-select-' +l+'"><div style="padding: '+ initPadding +'px 0;" class="ss-cell ss-cell-'+ l +'">'+levelDom+'</div></div>';
        }
        var selectYard = '<div class="ss-cell-yard" style="top: '+ initPadding +'px"></div>';
        return selectYard + '<div class="ui-scroll-select ' + this.data.className + '">'+scrollCtn+'</div>';
    }

    //根据level生成列表 htmlFragment, 根据level来查找数据，直接传入数据表示更新
    setListCont (level, data){
            var levelData = data ? data : this.data.list[level];
            var levelDataExt = [];

            for(var i=0; i<levelData.length; i++){
                levelDataExt[i] = {};
                levelDataExt[i].title = levelData[i];
            }
        var selectItem = {
            media: false,
            card: false,
            list: levelDataExt
        };
        var dataObj = {
            data: selectItem
        };
        if(data){
            dataObj.wrapper = '.ss-cell-'+level;
        }
        return new List(dataObj).render(); //无wrapper时返回HTMLfragment,有时直接插入;
    }
    /**
     * 更新 select项数据
     * @method Gom.UI.Select#update
     * @param {number} level 需要更新的level为index
     * @param {Object} data  更新到的数据
     */
    update (level, data){
        this.setListCont(level, data);
    }

    setScroll (){
        var that = this, indexScroll=[];
        for(var l=1; l<=this.data.level; l++){
            (function(index){
                indexScroll[index] = new Scroll({
                    step: 33,
                    speed: 0.5,
                    outer: 66,
                    outerFront: false,
                    outerEnd: false,
                    wrapper    : that.getScrollRoot().find('.ui-scroll-select-'+index),    //滚动对象所在的容器
                    className  : '.ss-cell-'+index,      //滚动对象的className
                    endScroll : function(){
                        var step = this.getSteps();
                        this.$scroll.find('li.table-view-cell').removeClass('active').eq(step).addClass('active');
                        var onSelect = that.data.onSelect;
                        onSelect = onSelect ? that.data.onSelect.bind(that) : function(){};
                        onSelect(index, step, indexScroll);
                    }
                });
            })(l);
        }
    }
    /**
     * 获取选择后的值;
     * @method Gom.UI.Select#getSelect
     * @return {Array} 选择后的值
     */
    getSelect (){
        var $domRoot = this.getScrollRoot(), val, valArr = [];
        for(var l=1; l<=this.data.level; l++) {
            val = $.trim($domRoot.find('.ss-cell-'+l).find('li.table-view-cell.active').text());
            valArr.push(val);
        }
        return valArr;
    }

}

export default Select;
