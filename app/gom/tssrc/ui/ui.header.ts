/**
 * Created by sfliu on 2016/1/7.
 */
import View from '../core/view';

interface hdBtn {
    type: string;
    text: string;
    icon?: string;
}

interface hdData {
    left: hdBtn;
    right: hdBtn;
    title: string;
    subtitle: string;
}

export default class Header extends View {
    public opts: hdData;
    protected events: {     //protected的属性只能在类和派生的类中访问
        'click .icon-left-nav': string//'goBack'
    };
    constructor(opts: hdData){
        super(opts);
    }
    setTitle (text: string){
        super.update({title: text});
    }
    setSubTitle (text: string){
        super.update({subtitle: text});
    }
    goBack () {
        History.go(-1);
    }
}
