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
    BaseEventDispatcher.prototype.dispatchEvent = function (event, data) {
        this.eventEmitter.emit(event, data);
    };
    return BaseEventDispatcher;
}());
export { BaseEventDispatcher };
//# sourceMappingURL=BaseEventDispatcher.js.map