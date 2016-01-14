import View from '../../core/view';
import {Modals} from '../ui.modal';
import Select from '../ui.select';

let District = function (){
    var provinces = [], citys = [], districts = [];
    $.ajax({url: 'gom/src/data/district.json',
        global:false,
        success:function(data){
        provinces = data.map(value => value['name']);
        citys = data[0].citys.map(value => value['name']);
        districts =  data[0].citys[0].districts.map(value => value['name']);
        new Select({data: {
            title: '请选择区域',
            cascade: false,
            level: 3,
            list: {'1':provinces,'2': citys, '3':districts},
            onSelect: function(index, step, scrolls){
                var that = this;
                if(index === 1){
                    citys = data[step].citys.map(value => value['name']);
                    districts = data[step].citys[0].districts.map(value => value['name']);
                    initOn(2, citys);
                    initOn(3, districts);
                }
                if(index === 2){
                    var selectCityStep = $('.modal-layout').find('.ss-cell-1').data('swipe-steps') || 0;
                    districts =  data[selectCityStep].citys[step].districts.map(value => value['name']);
                    initOn(3, districts);
                }
                function initOn(ind, data){
                    that.update(ind, data);
                    that.initSelect(ind);
                    scrolls[ind].scrollTo(0);
                }
            },
            onYes: function(val){
                Modals.toast('选择的值为：' + val);
            }
        }}).render();
    }});
};

export default District;
