var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { EventListenerHelper } from "../event/eventlistenerhelper/EventListenerHelper";
import { BaseObject } from "./BaseObject";
var BaseEventListenerObject = (function (_super) {
    __extends(BaseEventListenerObject, _super);
    function BaseEventListenerObject() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return _super.apply(this, args) || this;
    }
    BaseEventListenerObject.prototype.construction = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.eventListenerHelper = new EventListenerHelper(this);
        _super.prototype.construction.apply(this, args);
    };
    BaseEventListenerObject.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        if (this.eventListenerHelper) {
            this.eventListenerHelper.destruction();
            this.eventListenerHelper = null;
        }
    };
    BaseEventListenerObject.prototype.addListeners = function () {
        _super.prototype.addListeners.call(this);
    };
    BaseEventListenerObject.prototype.removeListeners = function () {
        _super.prototype.removeListeners.call(this);
        if (this.eventListenerHelper) {
            this.eventListenerHelper.removeAllListeners();
        }
    };
    return BaseEventListenerObject;
}(BaseObject));
export { BaseEventListenerObject };
//# sourceMappingURL=BaseEventListenerObject.js.map