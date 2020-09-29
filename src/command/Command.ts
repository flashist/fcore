import {CommandEvent} from "./CommandEvent";
import {CommandErrorCode} from "./CommandErrorCode";
import {EventListenerHelper} from "../event/eventlistenerhelper/EventListenerHelper";
import {ArrayTools} from "../tools/ArrayTools";
import {ObjectTools} from "../tools/ObjectTools";
import {BaseObject} from "../baseobject/BaseObject";

export abstract class Command<ResolveType = any> extends BaseObject {

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

    private promiseResolve: (result?: ResolveType) => void;
    private promiseReject: (errorCode?: string) => void;

    constructor() {
        super();

        this.eventListenerHelper = new EventListenerHelper(this);
    }

    public execute(): Promise<ResolveType> {
        console.log("Command | execute __ name: " + ObjectTools.getConstructorName(this.constructor));

        return new Promise<ResolveType>(
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

                this.executeInternal();
            }
        );
    }


    /**
     *  Note: subclasses should implement their own logic.
     */
    protected abstract executeInternal(): void;

    protected notifyComplete(resolveData?: ResolveType, rejectErrorData?: any): void {
        console.log("Command | notifyComplete __ name: " + ObjectTools.getConstructorName(this.constructor) + " | this.success: ", this.success);

        this._isExecuting = false;

        if (!this.isCompleted) {
            ArrayTools.removeItem(Command.cache, this);

            this._isCompleted = true;

            this.dispatchEvent(CommandEvent.COMPLETE);

            if (this.success) {
                this.promiseResolve(resolveData);
            } else {
                console.warn("Command | notifyComplete __ Completed with error! name: ",  + ObjectTools.getConstructorName(this.constructor), " | errorCode: ", this.errorCode);
                this.promiseReject(rejectErrorData);
            }
        }

        //
        this.destruction();
    }

    public terminate(terminateErrorCode?: string): void {
        if (!terminateErrorCode) {
            terminateErrorCode = CommandErrorCode.TERMINATE;
        }

        this.errorCode = terminateErrorCode;
        this.notifyComplete(null, Error(this.errorCode));
    }


    public get success(): boolean {
        var result: boolean = true;
        if (this.errorCode) {
            result = false;
        }

        return result;
    }
}