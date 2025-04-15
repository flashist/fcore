import { IFunctionArguments } from "../../other/IFunctionArguments";

export interface IDelayedFunctionVO<T extends Function = Function> {

    func: T;
    thisContext: any;
    applyArgs: IFunctionArguments<T>;

    delayStartTime: number;
    delayTime: number;

}
