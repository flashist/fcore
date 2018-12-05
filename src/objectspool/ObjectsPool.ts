import {Dictionary} from "../datastructure/Dictionary";
import {IConstructor} from "../other/IConstructor";
import {IFunctionArguments} from "../other/IFunctionArguments";

export class ObjectsPool {
    protected objectsToClassMap: Dictionary<any, any>;

    public constructor() {
        this.objectsToClassMap = new Dictionary<IConstructor, any[]>();
    }

    public addObject<T>(object: T, ObjectClass: IConstructor<T>): void {
        if (!object) {
            return;
        }

        let tempItems: any[] = this.getObjectsByClass(ObjectClass);
        if (tempItems) {
            if (tempItems.indexOf(object) == -1) {
                tempItems.push(object);
            }
        }
    }

    public getObject<T>(ObjectClass: IConstructor<T>, ...args): T {
        let result: any;

        let tempArr: any[] = this.getObjectsByClass(ObjectClass);
        if (tempArr.length > 0) {
            result = tempArr.shift();

        } else {
            result = this.createNewObject(ObjectClass, ...args);
        }

        return result;
    }

    protected createNewObject<T>(ObjectClass: IConstructor<T>, ...args): T {
        return new ObjectClass(...args);
    }

    protected getObjectsByClass<T>(ObjectClass: T): T[] {
        let result: any[] = (this.objectsToClassMap.getItem(ObjectClass) as any[]);
        if (!result) {
            result = [];
            this.objectsToClassMap.addItem(ObjectClass, result);
        }

        return result;
    }
}
