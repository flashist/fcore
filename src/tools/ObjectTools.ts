import { IObjectToolsCopyConfig } from "./IObjectToolsCopyConfig";

export class ObjectTools {
    public static copyProps(
        to: any,
        from: any,
        config?: IObjectToolsCopyConfig): boolean {

        var result: boolean = false;

        var propNames: string[] = Object.keys(from);
        var propsCount: number = propNames.length;
        var propName: string;
        for (var propIndex: number = 0; propIndex < propsCount; propIndex++) {
            propName = propNames[propIndex];

            if (to[propName] != from[propName]) {

                // Check additionally for existed properties,
                // if the settings are set correspondingly
                let isCopyingAllowed: boolean = false;
                if (!config?.ignoreExistedProperties ||
                    (config?.ignoreExistedProperties && to[propName] === undefined)) {
                    isCopyingAllowed = true;
                }

                if (isCopyingAllowed) {
                    if (config?.ignoreNonExistedProperties) {
                        if (!to.hasProperty(propName)) {
                            isCopyingAllowed = false;
                        }
                    }
                }

                if (isCopyingAllowed) {
                    if (config?.overrideExistedProperties) {
                        to[propName] = ObjectTools.clone(from[propName]);

                    } else {
                        ObjectTools.copySingleProp(to, from, propName);
                    }

                    // Remember that change was made
                    result = true;
                }
            }
        }

        return result;
    }

    static copySingleProp(to: any, from: any, propName: string, config?: IObjectToolsCopyConfig): void {
        if (Array.isArray(from[propName])) {
            let tempList = to[propName];
            if (!to[propName]) {
                tempList = [];
            }
            ObjectTools.copyProps(tempList, from[propName], config);

            if (!to[propName]) {
                to[propName] = tempList;
            }

        } else if (ObjectTools.isObject(from[propName])) {
            if (!to[propName]) {
                to[propName] = {};
            }
            ObjectTools.copyProps(to[propName], from[propName], config);

        } else {
            to[propName] = from[propName];
        }
    }

    static clone(from: any): any {
        let result: any;

        if (Array.isArray(from)) {
            result = [];
            ObjectTools.copyProps(result, from);

        } else if (ObjectTools.isObject(from)) {
            result = {};
            ObjectTools.copyProps(result, from);

        } else {
            result = from;
        }

        return result;
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

    public static getObjectConstructorName(object: any): string {
        return object.constructor ? ObjectTools.getConstructorName(object.constructor) : "";
    }

    public static getConstructorName(constructor: any): string {
        return constructor.name ? constructor.name : "";
    }
}
