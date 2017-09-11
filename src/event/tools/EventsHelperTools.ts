import {IEventListenerCallback} from "../eventlistenerhelper/IEventListenerCallback";
import {IDefaultEventDispatcher} from "../eventlistenerhelper/IDefaultEventDispatcher";
import {IEventEmitter} from "../eventlistenerhelper/IEventEmitter";
import {IEventDispatcher} from "../eventlistenerhelper/IEventDispatcher";
export class EventsHelperTools {

    static addEventListener(dispatcher: IDefaultEventDispatcher, type: string, listener: IEventListenerCallback): void {
        const emitter = (dispatcher as IEventEmitter);
        if (emitter.on) {
            emitter.on(type, listener);
        } else {
            (dispatcher as IEventDispatcher).addEventListener(type, listener);
        }
    }

    static removeEventListener(dispatcher: IDefaultEventDispatcher, type: string, listener: IEventListenerCallback): void {
        const emitter = (dispatcher as IEventEmitter);
        if (emitter.off) {
            emitter.off(type, listener);
        } else {
            (dispatcher as IEventDispatcher).removeEventListener(type, listener);
        }
    }

    static removeAllEventListeners(dispatcher: IDefaultEventDispatcher, type?: string): void {
        const emitter = (dispatcher as IEventEmitter);
        if (emitter.removeAllListeners) {
            emitter.removeAllListeners(type);
        } else {
            (dispatcher as IEventDispatcher).removeAllEventListeners(type);
        }
    }

    static dispatch(dispatcher: IDefaultEventDispatcher, event: any, ...args): void {
        const emitter = (dispatcher as IEventEmitter);
        if (emitter.emit) {
            emitter.emit(event, ...args);
        } else {
            (dispatcher as IEventDispatcher).dispatchEvent(event, ...args);
        }
    }
}