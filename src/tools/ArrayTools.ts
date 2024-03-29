﻿import { NumberTools } from "./NumberTools";
import {ObjectTools} from "./ObjectTools";

export class ArrayTools {
    protected static REMOVE_COUNT_ALL: number = -1;

    public static removeItem<T>(list: T[], item: T, removeCount: number = ArrayTools.REMOVE_COUNT_ALL): boolean {
        let result: boolean = false;

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

        if (totalRemovedCount > 0) {
            result = true;
        }

        return result;
    }

    public static removeItems<T>(list: T[], removeItems: readonly T[]): void {
        let item: any;
        for (let itemIndex: number = 0; itemIndex < removeItems.length; itemIndex++) {
            item = removeItems[itemIndex];
            ArrayTools.removeItem(list, item);
        }
    }

    public static checkIfEqual<ItemType>(list1: ItemType[], list2: ItemType[]): boolean {
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
                    if (!ObjectTools.checkIfEqual(list1[itemIndex], list2[itemIndex])) {
                        isEqual = false;
                        break;
                    }
                }
            }
        }

        return isEqual
    }

    public static checkIfSomeEqual(source: any[], search: any[]): boolean {
        return search.some(
            (item: any) => {
                return source.indexOf(item) >= 0;
            }
        );
    }

    public static getDifference<T>(list1: T[], list2: T[]): T[] {
        let result: T[] = [];

        let allItems: T[] = [
            ...list1,
            ...list2
        ];
        for (let singleItem of allItems) {
            // If an item is unique for one of the lists, then add it to the result
            if (list1.indexOf(singleItem) === -1 || list2.indexOf(singleItem) === -1) {
                result.push(singleItem);
            }
        }

        return result;
    }

    public static getSimilar<T>(list1: T[], list2: T[]): T[] {
        let result: T[] = [];

        for (let singleItem of list1) {
            if (list2.indexOf(singleItem) !== -1) {
                result.push(singleItem);
            }
        }

        return result;
    }

    public static changeItemIndex<T>(item: T, list: T[], newIndex: number): void {
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

    public static randomizeSortFunction(obj1: any, obj2: any): number {
        let randNum: number = -1 + Math.floor((Math.random() * 3));
        return randNum;
    }

    public static randomizeItemsInArray(sourceArray: any[], itemsCount: number): void {
        let randIndex1: number;
        let randIndex2: number;
        let sourceArrayLength: number = sourceArray.length;
        for (let itemIndex: number = 0; itemIndex < itemsCount; itemIndex++) {
            randIndex1 = NumberTools.getRandomInt(0, sourceArrayLength - 1);
            randIndex2 = NumberTools.getRandomInt(0, sourceArrayLength - 1);
            ArrayTools.swapItemsInArray(sourceArray, randIndex1, randIndex2);
        }
    }

    public static swapItemsInArray(sourceArray: any[], index1: number, index2: number): void {
        let obj1: any = sourceArray[index1];
        let obj2: any = sourceArray[index2];
        sourceArray[index1] = obj2;
        sourceArray[index2] = obj1;
    }

    public static getRandomItemBasedOnWeights<T>(items: T[], weights?: number[]): T {
        let result: T;

        const defaultWeight: number = 1;
        if (!weights) {
            weights = Array(items.length).fill(defaultWeight);
        }

        const itemsCount: number = items.length;

        if (weights.length < items.length) {
            for (let itemIndex: number = weights.length; itemIndex < itemsCount; itemIndex++) {
                weights[itemIndex] = defaultWeight;
            }
        }

        let totalWeight: number = 0;
        for (let itemIndex: number = 0; itemIndex < itemsCount; itemIndex++) {
            totalWeight += weights[itemIndex];
        }

        const randWeight: number = Math.random() * totalWeight;

        let totalCheckedWeight: number = 0;
        for (let itemIndex: number = 0; itemIndex < itemsCount; itemIndex++) {
            let singleWeight: number = weights[itemIndex];
            totalCheckedWeight += singleWeight;

            if (randWeight < totalCheckedWeight) {
                result = items[itemIndex];
                break;
            }
        }

        return result;
    }

    public static getRandomItem<T>(array: readonly T[], except: readonly T[] = null): T {
        let randObj: T = null;

        let arrayCopy = array.concat();
        // Если есть список объектов, которые нужно исключить из выборки,
        // то создаём копию списка и убираем их
        if (except) {
            ArrayTools.removeItems(arrayCopy, except);
        }

        if (arrayCopy.length > 0) {
            let randIndex: number = Math.floor(Math.random() * arrayCopy.length);
            randObj = arrayCopy[randIndex];
        }

        return randObj;
    }

    public static getUniqueItems<T>(list: T[]): T[] {
        let result: T[] = list.filter(ArrayTools.removeDuplicatesFilter);
        return result;
    }

    protected static removeDuplicatesFilter(item: any, index: number, list: any): boolean {
        return (index == 0) ? true : list.lastIndexOf(item, index - 1) == -1;
    }
}
