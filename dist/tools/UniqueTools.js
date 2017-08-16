var UniqueTools = (function () {
    function UniqueTools() {
    }
    UniqueTools.getObjectUniqueId = function (object) {
        if (!object.hasOwnProperty(UniqueTools.UNIQUE_ID_PROP_NAME)) {
            UniqueTools.globalUniqueId++;
            object[UniqueTools.UNIQUE_ID_PROP_NAME] = UniqueTools.globalUniqueId.toString();
        }
        return object[UniqueTools.UNIQUE_ID_PROP_NAME];
    };
    return UniqueTools;
}());
export { UniqueTools };
UniqueTools.UNIQUE_ID_PROP_NAME = "flashistUniqueId";
UniqueTools.globalUniqueId = 0;
//# sourceMappingURL=UniqueTools.js.map