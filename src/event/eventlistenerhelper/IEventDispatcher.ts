import {IEventListenerCallback} from "./IEventListenerCallback";
export interface IEventDispatcher<EventType> {
    addEventListener(type:string, listener:IEventListenerCallback<EventType>): void;

    removeAllEventListeners(type?:string): void;
    removeEventListener(type:string, listener:IEventListenerCallback<EventType>): void;

    dispatchEvent(event:EventType, ...args): void;
}
