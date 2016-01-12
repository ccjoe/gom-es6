var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by sfliu on 2016/1/7.
 */
var view_1 = require('../core/view');
var Header = (function (_super) {
    __extends(Header, _super);
    function Header(opts) {
        _super.call(this, opts);
    }
    Header.prototype.setTitle = function (text) {
        _super.prototype.update.call(this, { title: text });
    };
    Header.prototype.setSubTitle = function (text) {
        _super.prototype.update.call(this, { subtitle: text });
    };
    Header.prototype.goBack = function () {
        History.go(-1);
    };
    return Header;
})(view_1["default"]);
exports["default"] = Header;
//# sourceMappingURL=ui.header.js.map