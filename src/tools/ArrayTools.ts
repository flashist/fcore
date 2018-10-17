import {NumberTools} from "./NumberTools";

export class ArrayTools {
    protected static REMOVE_COUNT_ALL: number = -1;


    public static removeItem(list: any[], item: any, removeCount: number = ArrayTools.REMOVE_COUNT_ALL): void {
        if (removeCount == ArrayTools.REMOVE_COUNT_ALL) {
            removeCount = Number.MAX_VALUE;
        }

        let totalRemovedCount: number = 0;
        let itemIndex: number = list.indexOf(item);
        while (itemIndex != -1 && totalRemovedCount < removeCount) {
            list.splice(itemIndex, 1);

            itemIndex = list.indexOf(item, itemIndex);
            totalRemovedCount++;
        }
    }

    public static removeItems(list: any[], removeItems: any[]): void {
        let item: any;
        for (let itemIndex: number = 0; itemIndex < removeItems.length; itemIndex++) {
            item = removeItems[itemIndex];
            ArrayTools.removeItem(list, item);
        }
    }

    public static checkIfEqual(list1: any[], list2: any[]): boolean {
        let isEqual: boolean = true;

        // If there are the only 1 correct array
        if ((!list1 && list2) || (list1 && !list2)) {
            isEqual = false;

        } else if (list1 && list2) {
            if (list1.length != list2.length) {
                isEqual = false;

            } else {
                let itemsCount: number = list1.length;
                for (let itemIndex: number = 0; itemIndex < itemsCount; itemIndex++) {
                    if (list1[itemIndex] != list2[itemIndex]) {
                        isEqual = false;
                        break;
                    }
                }
            }
        }

        return isEqual
    }

    public static changeItemIndex(item: any, list: any[], newIndex: number): void {
        if (newIndex >= list.length) {
            return;
        }

        let oldIndex: number = list.indexOf(item);
        if (oldIndex == -1) {
            return;
        }
        if (oldIndex == newIndex) {
            return;
        }

        list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
    }

    public static randomizeArray(array: any[]): void {
        array.sort(ArrayTools.randomizeSortFunction);
    }

    public static randomizeSortFunction(obj1: Boolean, obj2: Object): number {
        let randNum: number = -1 + Math.floor((Math.random() * 3));
        return randNum;
    }

    public static randomizeItemsInArray(sourceArray: any[], itemsCount: number): void {
        let randIndex1: number;
        let randIndex2: number;
        let sourceArrayLength: number = sourceArray.length;
        for (let itemIndex: number = 0; itemIndex < itemsCount; itemIndex++) {
            randIndex1 = NumberTools.getRandom(0, sourceArrayLength, true);
            randIndex2 = NumberTools.getRandom(0, sourceArrayLength, true);
            ArrayTools.swapItemsInArray(sourceArray, randIndex1, randIndex2);
        }
    }

    public static swapItemsInArray(sourceArray: any[], index1: number, index2: number): void {
        let obj1: any = sourceArray[index1];
        let obj2: any = sourceArray[index2];
        sourceArray[index1] = obj2;
        sourceArray[index2] = obj1;
    }

    public static getRandomObj(array: any[], except: any[] = null): any {
        let randObj: Object = null;

        // Если есть список объектов, которые нужно исключить из выборки,
        // то создаём копию списка и убираем их
        if (except) {
            array = array.concat();
            ArrayTools.removeItems(array, except);
        }

        if (array.length > 0) {
            let randIndex: number = Math.floor(Math.random() * array.length);
            randObj = array[randIndex];
        }

        return randObj;
    }

    public static getUniqueItems(list: any[]): any[] {
        let result: any[] = list.filter(ArrayTools.removeDuplicatesFilter);
        return result;
    }

    protected static removeDuplicatesFilter(item: any, index: number, list: any): boolean {
        return (index == 0) ? true : list.lastIndexOf(item, index - 1) == -1;
    }
}
