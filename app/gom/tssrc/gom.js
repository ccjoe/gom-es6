// “内部模块”称做“命名空间”。 “外部模块”则简称为“模块”
/*
namespace 以-out合并文件
1.引入方式： /// <reference>
2.
module   一个ts文件对应一个模块，无法合并,  模块可以声明它的依赖。模块会把依赖添加到模块加载器上（例如CommonJs / Require.js）
1.引入方式： import
不要对模块进行命名空间的整合*/
/*

import Service = require("./core/service");
import Page = require("./core/page");
import View = require("./core/view");
import App = require("./core/app");
import Service = require("./core/service");
import Utils = require("./utils/utils");


namespace Gom {
    export class Service;
    export class Page;
    export class View;
    export class UI;
    export class Utils;
    export class App;
}
*/
//# sourceMappingURL=gom.js.map