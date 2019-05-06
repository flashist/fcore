import {UniqueTools} from "../tools/UniqueTools";
import {ArrayTools} from "..";
export class Dictionary<KeyType, ItemType> {

    protected map: any;
    protected keys: KeyType[];

    public constructor() {
        this.map = {};
        this.keys = [];
    }

    public getItem(key: KeyType): ItemType {
        var tempId: string = UniqueTools.getObjectUniqueId(key);
        return this.map[tempId];
    }

    public addItem(key: KeyType, item: ItemType): void {
        var tempId: string = UniqueTools.getObjectUniqueId(key);
        if (this.map[tempId] === item) {
            return;
        }

        this.map[tempId] = item;

        if (this.keys.indexOf(key) === -1) {
            this.keys.push(key);
        }
    }

    public removeItemByKey(key: KeyType): boolean {
        var tempId: string = UniqueTools.getObjectUniqueId(key);
        const result: boolean = !!this.map[tempId];
        if (result) {
            delete this.map[tempId];
            ArrayTools.removeItem(this.keys, key);
        }

        return result;
    }

    public getKeys(): KeyType[] {
        return this.keys.concat();
    }

    public get length(): number {
        return this.keys.length;
    }
}
