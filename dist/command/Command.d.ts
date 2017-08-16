import { BaseEventListenerObject } from "../baseobject/BaseEventListenerObject";
export declare class Command extends BaseEventListenerObject {
    protected static cache: Command[];
    protected _isExecuting: boolean;
    readonly isExecuting: boolean;
    protected _isCompleted: boolean;
    readonly isCompleted: boolean;
    errorCode: string;
    private promiseResolve;
    private promiseReject;
    constructor();
    execute(): Promise<any>;
    protected executeInternal(): void;
    protected notifyComplete(resolveData?: any, rejectErrorData?: any): void;
    terminate(): void;
    readonly success: boolean;
}
