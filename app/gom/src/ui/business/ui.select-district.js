import View from '../../core/view';
import * as Modal from '../ui.modal';
import Select from '../ui.select';

let District = function (){
    var provinces = [], citys = [], districts = [];
    $.ajax({url: 'gom/src/data/district.json',
        global:false,
        success:function(data){
        provinces = _.pluck(data, 'name');
        citys = _.pluck(data[0].citys, 'name');
        districts =  _.pluck(data[0].citys[0].districts, 'name');
        new Select({data: {
            title: '请选择区域',
            cascade: false,
            level: 3,
            list: {'1':provinces,'2': citys, '3':districts},
            onSelect: function(index, step, scrolls){
                var that = this;
                if(index === 1){
                    citys = _.pluck(data[step].citys, 'name');
                    districts = _.pluck(data[step].citys[0].districts, 'name');
                    initOn(2, citys);
                    initOn(3, districts);
                }
                if(index === 2){
                    var selectCityStep = $('.modal-layout').find('.ss-cell-1').data('swipe-steps') || 0;
                    districts =  _.pluck(data[selectCityStep].citys[step].districts, 'name');
                    initOn(3, districts);
                }
                function initOn(ind, data){
                    that.update(ind, data);
                    that.initSelect(ind);
                    scrolls[ind].scrollTo(0);
                }
            },
            onYes: function(val){
                Modal.toast('选择的值为：' + val);
            }
        }}).render();
    }});
};

export default District;
