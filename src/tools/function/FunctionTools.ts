import {IDelayedFunctionVO} from "./IDelayedFunctionVO";
import {ArrayTools} from "../ArrayTools";

export class FunctionTools {

    // Interval in milliseconds for checking function
    public static checkIntervalTime: number = 16;

    private static delayedFunctionInfos: IDelayedFunctionVO[] = [];
    private static delayedFunctions: Function[] = [];
    private static isDelayedFunctionsChange: boolean;
    private static checkInterval: any;

    // This thing would implement initialization of all needed stuff for the static class
    private static pseudoStaticConstructor: void = (() => {
        FunctionTools.checkInterval = setInterval(
            () => {
                FunctionTools.onTimer();
            },
            FunctionTools.checkIntervalTime
        );
    })();

    public static destruction(): void {
        FunctionTools.delayedFunctionInfos = null;
        FunctionTools.delayedFunctions = null;

        clearInterval(FunctionTools.checkInterval);
    }

    private static onTimer(): void {
        FunctionTools.callAllDelayedFunctions();
    }

    private static callAllDelayedFunctions(): void {
        if (FunctionTools.delayedFunctionInfos.length <= 0) {
            return;
        }

        // Вызываем все функции
        let info: IDelayedFunctionVO;
        //let delayedFunctionsCount:int = FunctionTools.delayedFunctions.length;
        //for (let funcIndex:int = 0; funcIndex < delayedFunctionsCount; funcIndex++)
        for (let funcIndex: number = 0; funcIndex < FunctionTools.delayedFunctionInfos.length; funcIndex++) {
            //FunctionTools.delayedFunctions[funcIndex].func.apply(null, FunctionTools.delayedFunctions[funcIndex].applyArgs);
            info = FunctionTools.delayedFunctionInfos[funcIndex];

            // Если у объекта не запоминалось время начала задержки, то запоминаем его
            if (!info.delayStartTime) {
                info.delayStartTime = Date.now();
            }

            // Если у объекта нет времени задержки, или если уже прошло
            // достаточно времени для выполнения функции, то выполняем функцию
            if (!info.delayTime || info.delayTime <= Date.now() - info.delayStartTime) {
                info.func.apply(info.thisContext, info.applyArgs);
                ArrayTools.removeItem(FunctionTools.delayedFunctionInfos, info);
                ArrayTools.removeItem(FunctionTools.delayedFunctions, info.func, 1);
            }
        }
    }

    public static addDelayedFunction(
        func: Function,
        thisContext: any,
        applyArgs: any[] = null,
        delayTime: Number = 0,
        checkSameFunction: boolean = false): void {

        // Если нужно проверять функции на совпадение,
        // и если будет найдено, что подобная функция уже добавлена в очередь
        if (checkSameFunction) {
            //if (FunctionTools.delayedFunctions.indexOf(func) != -1)\
            // Если уже есть похожая функция, то прерываемся
            if (FunctionTools.checkIsSameFunctionWithSameParamsExist(func, applyArgs)) {
                return;
            }
        }


        let info: IDelayedFunctionVO = {
            func: func,
            thisContext: thisContext,
            applyArgs: applyArgs,
            delayTime: delayTime,
            delayStartTime: 0
        } as IDelayedFunctionVO;

        //FunctionTools.delayedFunctionsDict[func] = info;
        FunctionTools.delayedFunctionInfos.push(info);
        FunctionTools.delayedFunctions.push(info.func);

        FunctionTools.isDelayedFunctionsChange = true;
    }

    public static addDelayedUniqueFunction(func: Function, thisContext: any, applyParams: any[] = null, delayTime: Number = 0): void {
        FunctionTools.addDelayedFunction(func, thisContext, applyParams, delayTime, true);
    }

    private static checkIsSameFunctionWithSameParamsExist(func: Function, thisContext: any, applyParams: any[] = null): boolean {
        let result: boolean = false;

        // Если в списке уже есть похожие функции
        if (FunctionTools.delayedFunctions.indexOf(func) != -1) {
            let tempInfo: IDelayedFunctionVO;
            let infosCount: number = FunctionTools.delayedFunctionInfos.length;
            for (let infoIndex: number = 0; infoIndex < infosCount; infoIndex++) {
                tempInfo = FunctionTools.delayedFunctionInfos[infoIndex];
                if (tempInfo) {
                    // Если одинаковые функции
                    if (tempInfo.func == func) {
                        // If this context is the same
                        if (tempInfo.thisContext === thisContext) {
                            // Если параметры передаваемые в функцию тоже одинаковые
                            if (ArrayTools.checkIfEqual(applyParams, tempInfo.applyArgs)) {
                                result = true;
                                break;
                            }
                        }
                    }
                }
            }
        }

        return result;
    }
}

/*
import {IDelayedFunctionVO} from "./IDelayedFunctionVO";
import {ArrayTools} from "../ArrayTools";

export class FunctionTools {
    private static _instance: FunctionTools;
    private static _isCreated: boolean;

    // Interval in milliseconds for checking function
    public static checkIntervalTime: number = 16;

    private delayedFunctionInfos: IDelayedFunctionVO[] = [];
    private delayedFunctions: Function[] = [];

    private isDelayedFunctionsChange: boolean;

    private checkInterval: any;

    public constructor() {
        FunctionTools.checkInterval = setInterval(
            () => {
                FunctionTools.onTimer();
            },
            FunctionTools.checkIntervalTime
        );
    }

    public destruction(): void {
        FunctionTools.delayedFunctionInfos = null;
        FunctionTools.delayedFunctions = null;

        clearInterval(FunctionTools.checkInterval);
    }

    private onTimer(): void {
        FunctionTools.callAllDelayedFunctions();
    }

    private callAllDelayedFunctions(): void {
        if (FunctionTools.delayedFunctionInfos.length <= 0) {
            return;
        }

        // Вызываем все функции
        let info: IDelayedFunctionVO;
        //let delayedFunctionsCount:int = FunctionTools.delayedFunctions.length;
        //for (let funcIndex:int = 0; funcIndex < delayedFunctionsCount; funcIndex++)
        for (let funcIndex: number = 0; funcIndex < FunctionTools.delayedFunctionInfos.length; funcIndex++) {
            //FunctionTools.delayedFunctions[funcIndex].func.apply(null, FunctionTools.delayedFunctions[funcIndex].applyArgs);
            info = FunctionTools.delayedFunctionInfos[funcIndex];

            // Если у объекта не запоминалось время начала задержки, то запоминаем его
            if (!info.delayStartTime) {
                info.delayStartTime = Date.now();
            }

            // Если у объекта нет времени задержки, или если уже прошло
            // достаточно времени для выполнения функции, то выполняем функцию
            if (!info.delayTime || info.delayTime <= Date.now() - info.delayStartTime) {
                info.func.apply(null, info.applyArgs);
                ArrayTools.removeItem(FunctionTools.delayedFunctionInfos, info);
                ArrayTools.removeItem(FunctionTools.delayedFunctions, info.func, 1);
            }
        }
    }

    public addDelayedFunction(
        func: Function,
        applyArgs: any[] = null,
        delayTime: Number = 0,
        checkSameFunction: boolean = false): void {

        // Если нужно проверять функции на совпадение,
        // и если будет найдено, что подобная функция уже добавлена в очередь
        if (checkSameFunction) {
            //if (FunctionTools.delayedFunctions.indexOf(func) != -1)\
            // Если уже есть похожая функция, то прерываемся
            if (FunctionTools.checkIsSameFunctionWithSameParamsExist(func, applyArgs)) {
                return;
            }
        }


        let info: IDelayedFunctionVO = {
            func: func,
            applyArgs: applyArgs,
            delayTime: delayTime,
            delayStartTime: 0
        } as IDelayedFunctionVO;

        //FunctionTools.delayedFunctionsDict[func] = info;
        FunctionTools.delayedFunctionInfos.push(info);
        FunctionTools.delayedFunctions.push(info.func);

        FunctionTools.isDelayedFunctionsChange = true;
    }

    public addDelayedUniqueFunction(func: Function, applyParams: any[] = null, delayTime: Number = 0): void {
        FunctionTools.instance.addDelayedFunction(func, applyParams, delayTime, true);
    }

    private checkIsSameFunctionWithSameParamsExist(func: Function, applyParams: any[] = null): boolean {
        let result: boolean = false;

        // Если в списке уже есть похожие функции
        if (FunctionTools.delayedFunctions.indexOf(func) != -1) {
            let tempInfo: IDelayedFunctionVO;
            let infosCount: number = FunctionTools.delayedFunctionInfos.length;
            for (let infoIndex: number = 0; infoIndex < infosCount; infoIndex++) {
                tempInfo = FunctionTools.delayedFunctionInfos[infoIndex];
                if (tempInfo) {
                    // Если одинаковые функции
                    if (tempInfo.func == func) {
                        // Если параметры передаваемые в функцию тоже одинаковые
                        if (ArrayTools.checkIfEqual(applyParams, tempInfo.applyArgs)) {
                            result = true;
                            break;
                        }
                    }
                }
            }
        }

        return result;
    }

    public static get instance(): FunctionTools {
        // Если объект ещё не создан, то создаём его
        if (!FunctionTools._instance) {
            FunctionTools._instance = new FunctionTools();
        }

        return FunctionTools._instance;
    }
}*/
