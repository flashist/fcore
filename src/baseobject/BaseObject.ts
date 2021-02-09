import {BaseEventDispatcher} from "../event/eventdispatcher/BaseEventDispatcher";
import {EventListenerHelper} from "../event/eventlistenerhelper/EventListenerHelper";
import {IDatable} from "./IDatable";

export class BaseObject<DataType extends any = any> extends BaseEventDispatcher implements IDatable {

    protected isConstructed: boolean;

    private _data: DataType;

    protected eventListenerHelper: EventListenerHelper<Event | string | any>;

    constructor(...args) {
        super(...args);

        this.construction(...args);
        this.isConstructed = true;

        this.addListeners();
        this.commitData();
    }


    protected construction(...args): void {
        this.eventListenerHelper = new EventListenerHelper(this);
    }

    public destruction(): void {
        this.removeListeners();

        if (this.eventListenerHelper) {
            this.eventListenerHelper.destruction();
            this.eventListenerHelper = null;
        }
    }


    protected addListeners(): void {
        this.removeListeners();

        // Note: subclasses should implement their own logic here
    }

    protected removeListeners(): void {
        if (this.eventListenerHelper) {
            this.eventListenerHelper.removeAllListeners();
        }
    }


    protected commitData(): void {
        // Note: subclasses should implement their own logic here
    }

    protected arrange(): void {
        // Note: subclasses should implement their own logic here
    }


    public get data(): DataType {
        return this._data;
    }

    public set data(value: DataType) {
        if (this.data == value) {
            return;
        }

        this.processDataUnset(this._data);
        this._data = value;
        this.processDataSet(this._data);

        this.commitData();
    }

    protected processDataUnset(value: DataType): void {
        // Subclasses should implement their logic
    }

    protected processDataSet(value: DataType): void {
        // Subclasses should implement their logic
    }
}