import {CommandEvent} from "./CommandEvent";
import {CommandErrorCode} from "./CommandErrorCode";
import {EventListenerHelper} from "../event/eventlistenerhelper/EventListenerHelper";
import {Logger} from "../logger/Logger";
import {ArrayTools} from "../tools/ArrayTools";
import {BaseObject} from "../baseobject/BaseObject";

export class Command<ResolveType = any> extends BaseObject {

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

        this.errorCode = CommandErrorCode.NO_ERROR;
        this.eventListenerHelper = new EventListenerHelper(this);
    }

    public execute(): Promise<ResolveType> {
        // console.log("Action | execute __ name: " + this.constructor['name']);

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


    protected executeInternal(): void {
        // Note: subclasses should implement their own logic
    }


    protected notifyComplete(resolveData?: ResolveType, rejectErrorData?: any): void {
        this._isExecuting = false;

        if (!this.isCompleted) {
            ArrayTools.removeItem(Command.cache, this);

            this._isCompleted = true;

            /*var tempEvent:BaseEvent = new BaseEvent(BaseEvent.COMPLETE);
             this.dispatchEvent(tempEvent);*/
            this.dispatchEvent(CommandEvent.COMPLETE);

            if (this.success) {
                this.promiseResolve(resolveData);
            } else {
                this.promiseReject(rejectErrorData);
            }
        }

        //
        this.destruction();
    }

    public terminate(): void {
        if (!this.errorCode) {
            this.errorCode = CommandErrorCode.TERMINATE;
        }

        this.notifyComplete(null, Error(this.errorCode));
    }


    public get success(): boolean {
        var result: boolean = false;
        if (this.errorCode == CommandErrorCode.NO_ERROR) {
            result = true;
        }

        return result;
    }
}