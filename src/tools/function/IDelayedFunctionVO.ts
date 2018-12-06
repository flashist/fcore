import {IFunctionArguments} from "../../index";

export interface IDelayedFunctionVO<T extends Function = Function> {

    func: T;
    thisContext: any;
    applyArgs: IFunctionArguments<T>;

    delayStartTime: number;
    delayTime: number;

}
