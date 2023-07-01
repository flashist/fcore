import { IEventListener } from "./IEventListener";
export interface IEventDispatcher<EventType = string> {
    addEventListener(type: string, listener: IEventListener): void;
    removeEventListener(type: string, listener: IEventListener): void;
    // removeAllEventListeners(type?: string): void;
    dispatchEvent(event: EventType, ...args): void;
}
