import {IEventListenerCallback} from "./IEventListenerCallback";
export interface IEventEmitter<EventType = string> {
    on(type: string, listener: IEventListenerCallback): void;
    off(type: string, listener: IEventListenerCallback): void;
    removeAllListeners(type?: string): void;
    emit(event: EventType, ...args): void;
}
