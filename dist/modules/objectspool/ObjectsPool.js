import { Dictionary } from "../../datastructure/Dictionary";
import { Logger } from "../../logger/Logger";
var ObjectsPool = (function () {
    function ObjectsPool() {
        this.objectsToClassMap = new Dictionary();
    }
    ObjectsPool.prototype.addObject = function (object, ObjectClass) {
        if (!object) {
            return;
        }
        var tempItems = this.getObjectsByClass(ObjectClass);
        if (tempItems) {
            if (tempItems.indexOf(object) == -1) {
                tempItems.push(object);
            }
        }
    };
    ObjectsPool.prototype.getObject = function (ObjectClass, isNeedCreate) {
        if (isNeedCreate === void 0) { isNeedCreate = true; }
        var result;
        var tempArr = this.getObjectsByClass(ObjectClass);
        if (tempArr.length > 0) {
            result = tempArr.shift();
            Logger.log("ObjectsPool | getObject __ OBJECT WAS GOT FROM POOL!");
        }
        else {
            result = new ObjectClass();
            Logger.log("ObjectsPool | getObject __ OBJECT WAS CREATED!");
        }
        return result;
    };
    ObjectsPool.prototype.getObjectsByClass = function (ObjectClass) {
        var result = this.objectsToClassMap.getItem(ObjectClass);
        if (!result) {
            result = [];
            this.objectsToClassMap.addItem(ObjectClass, result);
        }
        return result;
    };
    return ObjectsPool;
}());
export { ObjectsPool };
//# sourceMappingURL=ObjectsPool.js.map