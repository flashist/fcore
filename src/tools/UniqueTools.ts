import {NumberTools} from "./NumberTools";
import {ObjectTools} from "./ObjectTools";

export class UniqueTools {
    protected static UNIQUE_ID_PROP_NAME: string = "flashistUniqueId";

    protected static DEFAULT_POOL_ID: string = "defaultPoolId";

    protected static globalUniqueId: number = 0;
    protected static uniqueIdByPool: {[key: string]: number} = {};
    protected static simpleTypesUniqueValuesMap: {[key: string]: string} = {};

    public static getObjectUniqueId(object: any): string {
        let result: string;

        if (ObjectTools.isObject(object)) {
            if (!object.hasOwnProperty(UniqueTools.UNIQUE_ID_PROP_NAME)) {
                UniqueTools.globalUniqueId++;
                object[UniqueTools.UNIQUE_ID_PROP_NAME] = UniqueTools.globalUniqueId.toString();
            }
            result = object[UniqueTools.UNIQUE_ID_PROP_NAME];

        // Simple types (doesn't support null+undefined, yet)
        } else {
            const simpleTypeId: string = object.toString();
            if (!UniqueTools.simpleTypesUniqueValuesMap[simpleTypeId]) {
                UniqueTools.globalUniqueId++;
                UniqueTools.simpleTypesUniqueValuesMap[simpleTypeId] = UniqueTools.globalUniqueId.toString();
            }
            
            result = UniqueTools.simpleTypesUniqueValuesMap[simpleTypeId];
        }

        return result;
    }

    public static getUniqueIdForPool(poolId?: string): string {
        if (!poolId) {
            poolId = UniqueTools.DEFAULT_POOL_ID;
        }

        if (!UniqueTools.uniqueIdByPool[poolId] && UniqueTools.uniqueIdByPool[poolId] !== 0) {
            UniqueTools.uniqueIdByPool[poolId] = 0;

        } else if (UniqueTools.uniqueIdByPool[poolId] === NumberTools.MAX_SAFE_INTEGER) {
            UniqueTools.uniqueIdByPool[poolId] = 0;

        } else {
            UniqueTools.uniqueIdByPool[poolId]++;
        }

        return UniqueTools.uniqueIdByPool[poolId].toString();
    }

    public static setCounterForPool(counter: number, poolId?: string): void {
        if (!poolId) {
            poolId = UniqueTools.DEFAULT_POOL_ID;
        }
        UniqueTools.uniqueIdByPool[poolId] = counter;
    }
}
