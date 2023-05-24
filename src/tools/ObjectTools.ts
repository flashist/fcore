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
                        if (!to.hasOwnProperty(propName)) {
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

    static copySingleProp(to: any, from: any, propName: string | number, config?: IObjectToolsCopyConfig): void {
        if (Array.isArray(from[propName])) {
            let tempFromList: any[] = from[propName];

            let tempList = to[propName];
            if (!tempList) {
                tempList = [];
                to[propName] = tempList;
            }

            // ObjectTools.copyProps(tempList, from[propName], config);
            let fromElementsCount: number = tempFromList.length;
            for (let fromElementIndex: number = 0; fromElementIndex < fromElementsCount; fromElementIndex++) {
                if (ObjectTools.isObject(tempList[fromElementIndex])) {
                    ObjectTools.copyProps(tempList[fromElementIndex], tempFromList[fromElementIndex], config);

                } else {
                    tempList[fromElementIndex] = ObjectTools.clone(tempFromList[fromElementIndex]);
                }
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

    static copySinglePropFromValue(to: any, propName: string | number, value: any, config?: IObjectToolsCopyConfig): void {
        ObjectTools.copyProps(to, { [propName]: value }, config);
        // if (Array.isArray(to[propName])) {
        //     let tempList = to[propName];
        //     if (!to[propName]) {
        //         tempList = [];
        //     }
        //     ObjectTools.copyProps(tempList, value, config);

        //     if (!to[propName]) {
        //         to[propName] = tempList;
        //     }

        // } else if (ObjectTools.isObject(to[propName])) {
        //     if (!to[propName]) {
        //         to[propName] = {};
        //     }
        //     ObjectTools.copyProps(to[propName], value, config);

        // } else {
        //     to[propName] = value;
        // }
    }

    static clone<T>(from: T): T {
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
        if (!Array.isArray(obj) && !ObjectTools.isObject(obj)) {
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

    public static checkIfEqual(obj1: any, obj2: any): boolean {
        let result: boolean = true;

        if (obj1 !== obj2) {
            // if casting to boolean is different, then objects are not equal
            if (!!obj1 !== !!obj2) {
                result = false;

            } else {
                for (let key in obj1) {
                    if (obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key)) {
                        if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
                            if (!ObjectTools.checkIfEqual(obj1[key], obj2[key])) {
                                result = false;
                                break;
                            }

                        } else if (obj1[key] !== obj2[key]) {
                            result = false;
                            break;
                        }

                    } else {
                        result = false;
                        break;
                    }
                }
            }
        }

        return result;
    }
}
