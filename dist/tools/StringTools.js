import { ObjectTools } from "./ObjectTools";
var StringTools = (function () {
    function StringTools() {
    }
    StringTools.substituteList = function (sourceText) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return StringTools.substitute(sourceText, args);
    };
    StringTools.substitute = function (sourceText, substituteParams) {
        if (substituteParams === void 0) { substituteParams = null; }
        var resultStr = sourceText;
        if (ObjectTools.isSimpleType(substituteParams)) {
            substituteParams = [substituteParams];
        }
        if (substituteParams) {
            var tempArgStr;
            var foundPattern;
            var paramName;
            for (paramName in substituteParams) {
                tempArgStr = substituteParams[paramName];
                foundPattern = "{" + paramName + "}";
                resultStr = StringTools.replaceText(resultStr, foundPattern, tempArgStr);
            }
        }
        return resultStr;
    };
    StringTools.replaceText = function (sourceString, searchString, replaceString) {
        // Split the string (if the search string has been found)
        var replacedString = sourceString.split(searchString).join(replaceString);
        return replacedString;
    };
    return StringTools;
}());
export { StringTools };
//# sourceMappingURL=StringTools.js.map