import {EventListenerHelper} from "../event/eventlistenerhelper/EventListenerHelper";
import {BaseObject} from "./BaseObject";

export class BaseEventListenerObject extends BaseObject {
    protected eventListenerHelper:EventListenerHelper<Event | string | any>;

    constructor(...args) {

        super(...args);
    }

    protected construction(...args):void {
        this.eventListenerHelper = new EventListenerHelper(this);

        super.construction(...args);
    }


    public destruction():void {
        super.destruction();

        if (this.eventListenerHelper) {
            this.eventListenerHelper.destruction();
            this.eventListenerHelper = null;
        }
    }


    protected addListeners():void {
        super.addListeners();
    }

    protected removeListeners():void {
        super.removeListeners();

        if (this.eventListenerHelper) {
            this.eventListenerHelper.removeAllListeners();
        }
    }
}
