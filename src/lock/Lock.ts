import {BaseObject, Dictionary} from "..";

export class Lock extends BaseObject {

    protected locksDict: Dictionary<any, any> = new Dictionary();

    public lock(object: any): void {
        this.locksDict.addItem(object, object);
    }

    public unlock(object: any): void {
        this.locksDict.removeItemByKey(object);
    }

    public get isLocked(): boolean {
        return this.locksDict.length > 0;
    }
}