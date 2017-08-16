import * as EventEmitter from "eventemitter3";
var BaseEventDispatcher = (function () {
    function BaseEventDispatcher() {
        this.eventEmitter = new EventEmitter();
    }
    BaseEventDispatcher.prototype.addEventListener = function (type, listener) {
        this.eventEmitter.addListener(type, listener);
    };
    BaseEventDispatcher.prototype.removeAllEventListeners = function (type) {
        this.eventEmitter.removeAllListeners(type);
    };
    BaseEventDispatcher.prototype.removeEventListener = function (type, listener) {
        this.eventEmitter.removeListener(type, listener);
    };
    BaseEventDispatcher.prototype.dispatchEvent = function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        (_a = this.eventEmitter).emit.apply(_a, [event].concat(args));
        var _a;
    };
    return BaseEventDispatcher;
}());
export { BaseEventDispatcher };
//# sourceMappingURL=BaseEventDispatcher.js.map