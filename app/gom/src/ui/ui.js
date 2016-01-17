/**
 * 所有UI组件的集合, 引入组件可以通过注入UI模块,引用某一个组件可以通过UI.ComponentsName 或是 直接引入ComponentName(如Button)
 * @class Gom.UI
 * @alias UI
 * @desc
    ## 组件声明或定义的几种方式:(适用于其它组件,请查看此页源代码,非运行时代码)
    1.声明式定义方式
    其中data-ui-widget对应组件类名
    其中data-opts对应组件参数
    ```
    <div data-ui-widget="Button" data-opts='{"type":"negative", "badge": 10, "icon": "icon-search", "isblock": true}'>Text</div>
    ```
    2.函数式定义组件
    ```
    new Button({data: opts, wrapper: '.class'});
    ```
    3. html直接定义组件，有些组件上面没有方法可以直接采用html声明，不需要操作实例
    ```
    <button class="btn btn-primary">Button</button>
    ```

    ## 详述关于声明式定义组件，补充A.1说明
    数据声明的规则：
    1.组件类型 定义在 data-ui-widget, <br/>
    2.组件的wrapper即容器本身， <br/>
    3.组件数据定义在data-opts上，<br/>

    但下列数据可以例外的定义在如下描述的情景：<br/>
    1. 非数组的title 来源于容器标签间text <br/>
    2. 数组数据的是list数据， list.title来源于  `item元素`上的title属性, list.content来源于 `item元素` 间html <br/>
    示例如下：
    ```
    <div data-ui-widget="Slide" data-opts='{"type": "tab-top"}'>
        <item title="ajax拦截器">
            ajax拦截器 content here
        </item>
        <item title="Service对象">
            Service对象 content here
        </item>
    </div>
    ```
    ## 声明式组件可以通过 $().data('widget')获取到该组件实例
*/
import Header from './ui.header';
import List   from './ui.list';
import {Modals} from './ui.modal';
import Sides  from './ui.sides';
import Scroll from './ui.scroll';
import Slide  from './ui.slide';
import Select from './ui.select';
import * as Forms from './ui.forms';
let {Button, CheckBox, Form, InputLocation, Radio, Toggle} = Forms;
export {Header, List, Modals, Sides, Scroll, Slide, Select, Button, CheckBox, Form, InputLocation, Radio, Toggle};
