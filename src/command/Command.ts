import {BaseEventListenerObject} from "../baseobject/BaseEventListenerObject";
import {CommandEvent} from "./CommandEvent";
import {CommandErrorCode} from "./CommandErrorCode";
import {EventListenerHelper} from "../event/eventlistenerhelper/EventListenerHelper";
import {Logger} from "../logger/Logger";
import {ArrayTools} from "../tools/ArrayTools";

export class Command extends BaseEventListenerObject {

    protected static cache:Command[] = [];

    protected _isExecuting:boolean;
    public get isExecuting():boolean {
        return this._isExecuting;
    }

    protected _isCompleted:boolean;
    public get isCompleted():boolean {
        return this._isCompleted;
    }

    public errorCode:string;

    constructor() {
        super();

        this.errorCode = CommandErrorCode.NO_ERROR;
        this.eventListenerHelper = new EventListenerHelper(this);
    }

    public execute():void {
        if (this.isExecuting || this.isCompleted) {
            Logger.log("Command | execute", "WARNING! Second execute while executing or complete! this.isExecuting: " + this.isExecuting + " | this.isCompleted: " + this.isCompleted);
            return;
        }

        this._isExecuting = true;

        if (Command.cache.indexOf(this) == -1) {
            Command.cache.push(this);
        }

        this.executeInternal();
    }


    protected executeInternal():void {
        // Note: subclasses should implement their own logic
    }


    protected notifyComplete():void {
        this._isExecuting = false;

        if (!this.isCompleted) {
            ArrayTools.removeItem(Command.cache, this);

            this._isCompleted = true;

            /*var tempEvent:BaseEvent = new BaseEvent(BaseEvent.COMPLETE);
             this.dispatchEvent(tempEvent);*/
            this.dispatchEvent(CommandEvent.COMPLETE);
        }


        //
        this.destruction();
    }

    public terminate():void {
        if (!this.errorCode) {
            this.errorCode = CommandErrorCode.TERMINATE;
        }

        this.notifyComplete();
    }


    public get success():boolean {
        var result:boolean = false;
        if (this.errorCode == CommandErrorCode.NO_ERROR) {
            result = true;
        }

        return result;
    }
}