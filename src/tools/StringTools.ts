
import { ObjectTools } from "./ObjectTools";

export class StringTools {

    public static substituteList(sourceText: string, ...args): string {
        return StringTools.substitute(sourceText, args);
    }

    public static substitute(sourceText: string, substituteParams: any = null): string {
        var resultStr: string = sourceText;

        if (ObjectTools.isSimpleType(substituteParams)) {
            substituteParams = [substituteParams];
        }

        if (substituteParams) {
            var tempArgStr: string;
            var foundPattern: string;
            var paramName: string;
            for (paramName in substituteParams) {
                tempArgStr = <string>substituteParams[paramName];

                foundPattern = "{" + paramName + "}";
                resultStr = StringTools.replaceText(resultStr, foundPattern, tempArgStr);
            }
        }

        return resultStr;
    }

    public static replaceText(sourceString: string, searchString: string, replaceString: string): string {
        // Split the string (if the search string has been found)
        var replacedString: string = sourceString.split(searchString).join(replaceString);

        return replacedString;
    }

    public static groupCharacters(
        sourceText: string,
        countInGroup: number = 3,
        groupsSeparator: string = " ",
        startFromEnd: Boolean = true): string {

        let resultArr: string[] = [];

        let sourceTextArr: string[] = sourceText.split("");
        if (startFromEnd) {
            sourceTextArr = sourceTextArr.reverse();
        }

        let charsCount: number = sourceTextArr.length;
        for (let charIndex: number = 0; charIndex < charsCount; charIndex++) {
            resultArr.push(sourceTextArr[charIndex]);

            if (charIndex > 0 && charIndex < sourceText.length - 1 && ((charIndex + 1) % countInGroup == 0)) {
                resultArr.push(groupsSeparator);
            }
        }

        if (startFromEnd) {
            resultArr = resultArr.reverse();
        }

        const result: string = resultArr.join("");
        return result;
    }

    public static splitByCapitalLetters(source: string): string[] {
        return source.split(/(?=[A-Z])/);
    }

    public static capitalizeFirstLetter(source: string, locale: string = navigator.language): string {
        return source.charAt(0).toLocaleUpperCase(locale) + source.substring(1);
    }

    public static count(source: string, find: string): number {
        // const result: number = (source.match(`/${find}/g`) || []).length;
        let result: number = source.split(find).length - 1;
        if (result < 0) {
            result = 0;
        }

        return result;
    }
}
