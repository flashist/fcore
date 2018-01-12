import {UniqueTools} from "../tools/UniqueTools";
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
        this.map[tempId] = item;

        this.keys.push(key);
    }

    public getKeys(): KeyType[] {
        return this.keys.concat();
    }
}
