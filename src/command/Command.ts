import { CommandEvent } from "./CommandEvent";
import { CommandErrorCode } from "./CommandErrorCode";
import { EventListenerHelper } from "../event/eventlistenerhelper/EventListenerHelper";
import { ArrayTools } from "../tools/ArrayTools";
import { ObjectTools } from "../tools/ObjectTools";
import { BaseObject } from "../baseobject/BaseObject";

export abstract class Command<ResolveType = any> extends BaseObject {

    public constructorName: string;

    protected static cache: Command[] = [];
    protected static CACHE_COMMANDS_COUNT_FOR_WARNING: number = 200;

    protected _isExecuting: boolean;
    public get isExecuting(): boolean {
        return this._isExecuting;
    }

    protected _isCompleted: boolean;
    public get isCompleted(): boolean {
        return this._isCompleted;
    }

    public errorCode: string;
    public rejectErrorData: any;

    protected executePrommise: Promise<ResolveType>;
    private promiseResolve: (result?: ResolveType) => void;
    private promiseReject: (errorCode?: string) => void;

    constructor(...args: any[]) {
        super(...args);
    }

    public execute(): Promise<ResolveType> {
        this.constructorName = ObjectTools.getConstructorName(this.constructor);
        console.log("Command | execute __ name: " + this.constructorName);

        this.executePrommise = new Promise<ResolveType>(
            (resolve: (result: ResolveType) => void, reject: () => void) => {
                this.promiseResolve = resolve;
                this.promiseReject = reject;

                if (this.isExecuting || this.isCompleted) {
                    // Logger.log("Command | execute", "WARNING! Second execute while executing or complete! this.isExecuting: " + this.isExecuting + " | this.isCompleted: " + this.isCompleted);
                    return;
                }
                this._isExecuting = true;

                if (Command.cache.indexOf(this) == -1) {
                    Command.cache.push(this);
                    if (Command.cache.length > Command.CACHE_COMMANDS_COUNT_FOR_WARNING) {
                        console.log("Command | execute __WARNING! Too many commands in the cache!");
                    }
                }

                if (this.guard()) {
                    this.executeInternal();
                } else {
                    this.notifyComplete();
                }
            }
        );

        this.executePrommise.catch(
            (reason: any) => {
                console.warn("Command | notifyComplete __ Completed with error! name: ", this.constructorName, " | reason: ", reason);
            }
        );

        return this.executePrommise;
    }

    public guard(): boolean {
        // Override in subclasses to implement guard behavior
        return true;
    }


    /**
     *  Note: subclasses should implement their own logic.
     */
    protected abstract executeInternal(): void;

    protected notifyComplete(resolveData?: ResolveType, rejectErrorData?: any): void {
        console.log("Command | notifyComplete __ name: ", this.constructorName, " | this.success: ", this.success);

        this._isExecuting = false;

        if (!this.isCompleted) {
            ArrayTools.removeItem(Command.cache, this);

            this._isCompleted = true;

            this.rejectErrorData = rejectErrorData;

            this.removeListeners();

            this.dispatchEvent(CommandEvent.COMPLETE);

            // if (this.success) {
            //     this.promiseResolve(resolveData);
            // } else {
            //     this.promiseReject(rejectErrorData);
            // }
            this.promiseResolve(resolveData);
        }

        //
        this.destruction();
    }

    public async terminate(terminateErrorCode?: string): Promise<ResolveType> {
        if (!terminateErrorCode) {
            terminateErrorCode = CommandErrorCode.TERMINATE;
        }

        this.errorCode = terminateErrorCode;
        this.notifyComplete(null, this.errorCode);

        return this.executePrommise;
    }


    public get success(): boolean {
        var result: boolean = true;
        if (this.errorCode) {
            result = false;
        }

        return result;
    }
}