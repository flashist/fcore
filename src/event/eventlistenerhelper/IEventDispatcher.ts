import {IEventListenerCallback} from "./IEventListenerCallback";
export interface IEventDispatcher<EventType = string> {
    addEventListener(type: string, listener: IEventListenerCallback): void;
    removeEventListener(type: string, listener: IEventListenerCallback): void;
    // removeAllEventListeners(type?: string): void;
    dispatchEvent(event: EventType, ...args): void;
}
