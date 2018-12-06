export interface IDelayedFunctionVO {

    func: Function;
    thisContext: any;
    applyArgs: any[];

    delayStartTime: number;
    delayTime: number;

}
