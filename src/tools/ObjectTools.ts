export class ObjectTools {
    public static copyProps(to: any, from: any, recursive: boolean = true): boolean {
        var result: boolean = false;

        var propNames: string[] = Object.keys(from);
        var propsCount: number = propNames.length;
        var propName: string;
        for (var propIndex: number = 0; propIndex < propsCount; propIndex++) {
            propName = propNames[propIndex];

            if (to[propName] != from[propName]) {
                ObjectTools.copySingleProp(to, from, propName);

                // Remember that change was made
                result = true;
            }
        }

        return result;
    }

    static copySingleProp(to: any, from: any, paramName: string): void {
        if (Array.isArray(from[paramName])) {
            if (!to[paramName]) {
                to[paramName] = [];
            }
            ObjectTools.copyProps(from[paramName], to[paramName]);

        } else if (ObjectTools.isObject(from[paramName])) {
            if (!to[paramName]) {
                to[paramName] = {};
            }
            ObjectTools.copyProps(from[paramName], to[paramName]);

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
}
