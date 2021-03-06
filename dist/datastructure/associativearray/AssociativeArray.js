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
import { AssociativeArrayEvent } from "./AssociativeArrayEvent";
import { BaseObject } from "../../baseobject/BaseObject";
var AssociativeArray = (function (_super) {
    __extends(AssociativeArray, _super);
    function AssociativeArray() {
        return _super.call(this) || this;
    }
    AssociativeArray.prototype.construction = function () {
        _super.prototype.construction.call(this);
        this.map = {};
        this.list = [];
    };
    AssociativeArray.prototype.destruction = function () {
        _super.prototype.destruction.call(this);
        this.map = null;
        this.list = null;
    };
    AssociativeArray.prototype.dispatchChangeEvent = function () {
        this.dispatchEvent(AssociativeArrayEvent.CHANGE);
    };
    AssociativeArray.prototype.reset = function () {
        while (this.list.length > 0) {
            this.removeByIndex(0);
        }
    };
    AssociativeArray.prototype.push = function (item, key, checkUniqueKey) {
        if (checkUniqueKey === void 0) { checkUniqueKey = true; }
        this.addToIndex(item, key, this.list.length, checkUniqueKey);
    };
    AssociativeArray.prototype.addToIndex = function (item, key, index, checkUniqueKey) {
        if (checkUniqueKey === void 0) { checkUniqueKey = true; }
        var isNeedAdd = true;
        if (checkUniqueKey) {
            if (this.containsKey(key)) {
                isNeedAdd = false;
            }
        }
        if (isNeedAdd) {
            this.list.splice(index, 0, item);
            this.map[key] = item;
        }
        //
        this.dispatchChangeEvent();
    };
    AssociativeArray.prototype.remove = function (item) {
        if (!this.contains(item)) {
            return;
        }
        var tempIndex = this.indexOf(item);
        this.removeByIndex(tempIndex);
    };
    AssociativeArray.prototype.removeByKey = function (key) {
        var item = this.getItem(key);
        this.remove(item);
    };
    AssociativeArray.prototype.removeByIndex = function (index) {
        var removedList = this.list.splice(index, 1);
        var removedItem = removedList[index];
        var key = this.getItemKey(removedItem);
        this.map[key] = null;
        //
        this.dispatchChangeEvent();
    };
    AssociativeArray.prototype.contains = function (item) {
        var result = false;
        if (this.indexOf(item) != -1) {
            result = true;
        }
        return result;
    };
    AssociativeArray.prototype.containsKey = function (key) {
        var result = false;
        if (this.map[key]) {
            result = true;
        }
        return result;
    };
    AssociativeArray.prototype.indexOf = function (item) {
        return this.list.indexOf(item);
    };
    AssociativeArray.prototype.getItem = function (key) {
        return this.map[key];
    };
    AssociativeArray.prototype.getItemByIndex = function (index) {
        var result;
        if (index < this.list.length) {
            result = this.list[index];
        }
        return result;
    };
    AssociativeArray.prototype.getItemKey = function (item) {
        var result = null;
        var key;
        for (key in this.map) {
            if (this.map[key] == item) {
                result = key;
                break;
            }
        }
        return result;
    };
    AssociativeArray.prototype.getAllItems = function () {
        return this.list.concat();
    };
    AssociativeArray.prototype.getLength = function () {
        return this.list.length;
    };
    AssociativeArray.prototype.forEach = function (callback, thisArg) {
        this.list.forEach(callback, thisArg);
    };
    AssociativeArray.prototype.every = function (callback, thisArg) {
        return this.list.every(callback, thisArg);
    };
    return AssociativeArray;
}(BaseObject));
export { AssociativeArray };
//# sourceMappingURL=AssociativeArray.js.map