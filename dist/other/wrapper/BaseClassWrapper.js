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
import { BaseEventListenerObject } from "../../baseobject/BaseEventListenerObject";
var BaseClassWrapper = (function (_super) {
    __extends(BaseClassWrapper, _super);
    function BaseClassWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BaseClassWrapper.prototype, "object", {
        get: function () {
            return this._object;
        },
        set: function (value) {
            this._object = value;
            this.commitData();
        },
        enumerable: true,
        configurable: true
    });
    return BaseClassWrapper;
}(BaseEventListenerObject));
export { BaseClassWrapper };
//# sourceMappingURL=BaseClassWrapper.js.map