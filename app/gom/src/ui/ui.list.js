import View from '../core/view';
/*var defaultsList = {
    media: '', // 'icon'
    card: false, //false
    list: [{
        img: '',
        title: '',
        content: '',
        badge: ''
    },{
        img: '',
        title: '',
        content: '',
        badge: '',
        isDivider: true,
        collapse: true
    }]
};*/

$.fn.nextAll = function(selector){
    var next = this.next(), $a = next;
    while (next.is(selector)){
        $a = $a.add(next);
        next = next.next();
        if (next.length == 0) break;
    }
    return $a;
};
/**
 * @class Gom.UI.List
 * @alias List
 * @extends {Gom.View}
 * @param {object} opts 参数列表
 * @param {object} [opts.wrapper] 组件根元素
 * @param {object} opts.data  组件数据相关
 * @param {string} [opts.data.media]          - 列表左侧显示类型 icon, img
 * @param {boolean} [opts.data.card=false]    - card为true时显示为创建列表的显示的卡片式
 * @param {Object[]} [opts.data.list]          - list数组数据
 * @param {string} [opts.data.list[].img]     - media为img时，指定图片路径
 * @param {string} [opts.data.list[].icon]   - media为icon时,指定icon的class
 * @param {number} [opts.data.list[].badge]   - 列表数字小图标badge
 * @param {string} [opts.data.list[].title]   - 列表item标题
 * @param {string} [opts.data.list[].content]   - 列表item内容
 * @param {boolean} [opts.data.list[].isDivider]  - 是否为列表分组时的分隔栏
 * @param {boolean} [opts.data.list[].collapse]   - isDivider为true时 点击可收缩列表子item内容
 * @example
var viewList = {
media: 'img', // 'icon'
list: [{
    img: 'http://placehold.it/42x42',
    title: '列表示例',
    content: '列表通过data传入属性实现不同的配置,  通过 data.media可以为img, icon;这个列表data.media为img; data.card为true时显示为创建列表的显示的卡片式',
    badge: '12'
},{
    title: '可点击收缩的标题',
    isDivider: true,
    collapse: true
},{
    img: '',
    title: '可收缩的item',
    content: 'data.list的item单项上通过collapse为true可点击收缩',
    badge: '10',
}],
};
var ListSet = new List({
data: viewList,
wrapper: '#list'
});
ListSet.render();
 */
class List extends View {
    constructor (opts) {
        opts.tmplname = 'ui.list';
        opts.events = {'click .table-view-divider.table-view-collapse': 'collapseListGroup'};
        super(opts);
    }

    collapseListGroup (e, current){
        $(current).nextAll('.table-view-cell').toggle();
    }
}

export default List;
