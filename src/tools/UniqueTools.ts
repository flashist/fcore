import {NumberTools} from "./NumberTools";

export class UniqueTools {
    protected static UNIQUE_ID_PROP_NAME: string = "flashistUniqueId";
    protected static DEFAULT_POOL_ID: string = "defaultPoolId";

    protected static globalUniqueId: number = 0;
    protected static uniqueIdByPool: {[key: string]: number};

    public static getObjectUniqueId(object: any): string {
        if (!object.hasOwnProperty(UniqueTools.UNIQUE_ID_PROP_NAME)) {
            UniqueTools.globalUniqueId++;
            object[UniqueTools.UNIQUE_ID_PROP_NAME] = UniqueTools.globalUniqueId.toString();
        }

        return object[UniqueTools.UNIQUE_ID_PROP_NAME];
    }

    public static getUniqueIdForPool(poolId?: string): string {
        if (!poolId) {
            poolId = UniqueTools.DEFAULT_POOL_ID;
        }

        if (UniqueTools.uniqueIdByPool[poolId] === NumberTools.MAX_SAFE_INTEGER) {
            UniqueTools.uniqueIdByPool[poolId] = 0;
        } else {
            UniqueTools.uniqueIdByPool[poolId]++;
        }

        if (!UniqueTools.uniqueIdByPool[poolId] && UniqueTools.uniqueIdByPool[poolId] !== 0) {
            UniqueTools.uniqueIdByPool[poolId] = 0;
        }

        return UniqueTools.uniqueIdByPool[poolId].toString();
    }
}
