/**
 * Created by sfliu on 2016/1/7.
 */
/// <reference path="../lib/zepto.ts" />
var Gom;
(function (Gom) {
    var View = (function () {
        function View(opts) {
            this.wrapper = $(opts.wrapper);
        }
        View.prototype.render = function () {
        };
        return View;
    })();
    Gom.View = View;
})(Gom || (Gom = {}));
//# sourceMappingURL=view.js.map