import {Dictionary} from "../datastructure/Dictionary";

export class ObjectsPool {
    protected objectsToClassMap: Dictionary<any, any>;

    public constructor() {
        this.objectsToClassMap = new Dictionary<any, any>();
    }

    public addObject(object: any, ObjectClass: any): void {
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

    public getObject(ObjectClass: any): any {
        let result: any;

        let tempArr: any[] = this.getObjectsByClass(ObjectClass);
        if (tempArr.length > 0) {
            result = tempArr.shift();

        } else {
            result = new ObjectClass();
        }

        return result;
    }

    protected getObjectsByClass(ObjectClass: any): any[] {
        let result: any[] = (this.objectsToClassMap.getItem(ObjectClass) as any[]);
        if (!result) {
            result = [];
            this.objectsToClassMap.addItem(ObjectClass, result);
        }

        return result;
    }
}
