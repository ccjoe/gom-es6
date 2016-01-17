/**
 * Gom对象
 * @class Gom
 * @desc
 * A. 引入框架文件如下：（其中data-gom-path用来指定gom文件的路径，值为空时会自动判断,有值时为需要指定绝对完整的绝对路径值）
 * <script src="gom/src/gom.js" data-gom-path></script>
 * B. Gom下有如下模块：App，Service, View, Page, UI, 其中UI模块包含一些UI组件的模块。
 * ```
 * GOM
 *    ---App
 *    ---Service
 *    ---View
 *    ---Page
 *    ---UI
 *          ---Button
 *          ---Header
 *          ---List
 *          ---……等等
 * ```
 * 引入模块的二种方式：
 * 1.通过注入Gom模块,然后通过对象层级引用如Gom.ModuleName 或 Gom.UI.ComponentsName
 * 2.直接引入ComponentName(如Button)
 */
import FastClick from './3rd/fastclick';
FastClick(document.body);
import './3rd/zepto';
import './3rd/zepto.history';

import Service from './core/service';
import Page from './core/page';
import * as UI from './ui/ui';
import View from './core/view';
import App from './core/app';
import Utils from './utils/utils';
export {Service, Page, View, UI, Utils, App};

