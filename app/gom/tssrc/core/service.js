/**
 * Created by sfliu on 2016/1/7.
 */
var Gom;
(function (Gom) {
    var Service = (function () {
        function Service(opts) {
        }
        Service.prototype.ajax = function (data, opts) {
        };
        Service.prototype.save = function () {
            return this.ajax();
        };
        Service.prototype.fetch = function () {
        };
        return Service;
    })();
    exports["default"] = Service;
})(Gom || (Gom = {}));
//# sourceMappingURL=service.js.map