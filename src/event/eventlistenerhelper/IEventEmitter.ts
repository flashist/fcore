import { IEventListener } from "./IEventListener";
export interface IEventEmitter<EventType = string> {
    on(type: string, listener: IEventListener): void;
    off(type: string, listener: IEventListener): void;
    // removeAllListeners(type?: string): void;
    emit(event: EventType, ...args): void;
}
