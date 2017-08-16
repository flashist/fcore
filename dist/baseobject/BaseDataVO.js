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
import { Logger } from "../logger/Logger";
import { ObjectTools } from "../tools/ObjectTools";
import { BaseObject } from "./BaseObject";
var BaseDataVO = (function (_super) {
    __extends(BaseDataVO, _super);
    function BaseDataVO() {
        var _this = _super.call(this) || this;
        _this.objectType = "";
        _this.objectId = "";
        _this.sourceData = {};
        _this.sourceDataPropNamesMap = {};
        return _this;
    }
    BaseDataVO.prototype.commitSourceData = function () {
        var propName;
        var propValue;
        var sourcePropName;
        for (sourcePropName in this.sourceData) {
            propName = sourcePropName;
            // If there is a special name for the processed property,
            // then use the special name instead of the original name
            if (this.sourceDataPropNamesMap[sourcePropName]) {
                propName = this.sourceDataPropNamesMap[sourcePropName];
            }
            if (propName) {
                propValue = this.sourceData[sourcePropName];
                if (propValue != null) {
                    if (this.hasOwnProperty(propName) ||
                        (this["__proto__"] && this["__proto__"].hasOwnProperty(propName))) {
                        try {
                            this[propName] = propValue;
                        }
                        catch (error) {
                            Logger.error("BaseDataVO | commitSourceData __ ERROR! error: " + error);
                        }
                    }
                }
            }
        }
    };
    BaseDataVO.prototype.changeSourceData = function (changesData) {
        ObjectTools.copyProps(this.sourceData, changesData, true);
        this.commitSourceData();
    };
    return BaseDataVO;
}(BaseObject));
export { BaseDataVO };
//# sourceMappingURL=BaseDataVO.js.map