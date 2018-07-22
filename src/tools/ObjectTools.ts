export class ObjectTools {
    public static copyProps(to: any, from: any, ignoreExistedProperties: boolean = false): boolean {
        var result: boolean = false;

        var propNames: string[] = Object.keys(from);
        var propsCount: number = propNames.length;
        var propName: string;
        for (var propIndex: number = 0; propIndex < propsCount; propIndex++) {
            propName = propNames[propIndex];

            if (to[propName] != from[propName]) {

                // Check additionally for existed properties,
                // if the settings are set correspondingly
                if (!ignoreExistedProperties ||
                    (ignoreExistedProperties && to[propName] === undefined)) {

                    ObjectTools.copySingleProp(to, from, propName);

                    // Remember that change was made
                    result = true;
                }
            }
        }

        return result;
    }

    static copySingleProp(to: any, from: any, paramName: string): void {
        if (Array.isArray(from[paramName])) {
            let tempList = to[paramName];
            if (!to[paramName]) {
                tempList = [];
            }
            ObjectTools.copyProps(tempList, from[paramName]);

            if (!to[paramName]) {
                to[paramName] = tempList;
            }

        } else if (ObjectTools.isObject(from[paramName])) {
            if (!to[paramName]) {
                to[paramName] = {};
            }
            ObjectTools.copyProps(to[paramName], from[paramName]);

        } else {
            to[paramName] = from[paramName];
        }
    }

    public static isObject(obj: any): boolean {
        return obj === Object(obj);
    }

    public static isSimpleType(obj: any): boolean {
        var isSimple: boolean = false;
        if (typeof (obj) == "string" || typeof (obj) == "number" || typeof (obj) == "boolean") {
            isSimple = true;
        }

        return isSimple;
    }

    public static isString(obj: any): boolean {
        if (typeof (obj) == "string") {
            return true;
        } else {
            return false;
        }
    }

    public static isNumber(obj: any): boolean {
        if (typeof (obj) == "number") {
            return true;
        } else {
            return false;
        }
    }

    public static getConstructorName(object: any): string {
        return (object && object.constructor && object.constructor.name) ? object.constructor.name : "";
    }
}
