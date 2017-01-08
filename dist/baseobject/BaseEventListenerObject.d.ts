import { EventListenerHelper } from "../event/eventlistenerhelper/EventListenerHelper";
import { BaseObject } from "./BaseObject";
export declare class BaseEventListenerObject extends BaseObject {
    protected eventListenerHelper: EventListenerHelper<Event | string | any>;
    constructor(...args: any[]);
    protected construction(...args: any[]): void;
    destruction(): void;
    protected addListeners(): void;
    protected removeListeners(): void;
}
