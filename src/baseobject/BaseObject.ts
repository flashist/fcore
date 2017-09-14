﻿/*import {IConstructor} from "../other/IConstructor";

import {BaseObjectExtendTools} from "./BaseObjectExtendTools";

export const BaseObjectClass: IConstructor = (BaseObjectExtendTools as any).extend(BaseEventDispatcher);
export class BaseObject extends BaseObjectClass {

}*/

import {BaseEventDispatcher} from "../event/eventdispatcher/BaseEventDispatcher";
import {EventListenerHelper} from "../event/eventlistenerhelper/EventListenerHelper";

export class BaseObject extends BaseEventDispatcher {

    protected isConstructed: boolean;

    private _data: any;

    protected eventListenerHelper:EventListenerHelper<Event | string | any>;


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


    public get data(): any {
        return this._data;
    }

    public set data(value: any) {
        if (this.data == value) {
            return;
        }

        this._data = value;

        this.commitData();
    }
}