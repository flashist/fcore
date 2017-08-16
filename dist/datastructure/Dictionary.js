import { UniqueTools } from "../tools/UniqueTools";
var Dictionary = (function () {
    function Dictionary() {
        this.map = {};
    }
    Dictionary.prototype.getItem = function (key) {
        var tempId = UniqueTools.getObjectUniqueId(key);
        var result = this.map[tempId];
        return result;
    };
    Dictionary.prototype.addItem = function (key, item) {
        var tempId = UniqueTools.getObjectUniqueId(key);
        this.map[tempId] = item;
    };
    return Dictionary;
}());
export { Dictionary };
//# sourceMappingURL=Dictionary.js.map