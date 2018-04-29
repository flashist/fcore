import {IEventListenerCallback} from "../eventlistenerhelper/IEventListenerCallback";
import {IDefaultEventDispatcher} from "../eventlistenerhelper/IDefaultEventDispatcher";
import {IEventEmitter} from "../eventlistenerhelper/IEventEmitter";
import {IEventDispatcher} from "../eventlistenerhelper/IEventDispatcher";
export class EventsHelperTools {

    static addEventListener(dispatcher: IDefaultEventDispatcher, type: string, listener: IEventListenerCallback): void {
        const emitter = (dispatcher as IEventDispatcher);
        if (emitter.addEventListener) {
            emitter.addEventListener(type, listener);
        } else {
            (dispatcher as IEventEmitter).on(type, listener);
        }
    }

    static removeEventListener(dispatcher: IDefaultEventDispatcher, type: string, listener: IEventListenerCallback): void {
        const emitter = (dispatcher as IEventDispatcher);
        if (emitter.removeEventListener) {
            emitter.removeEventListener(type, listener);
        } else {
            (dispatcher as IEventEmitter).off(type, listener);
        }
    }

    static removeAllEventListeners(dispatcher: IDefaultEventDispatcher, type?: string): void {
        const emitter = (dispatcher as IEventDispatcher);
        if (emitter.removeAllEventListeners) {
            emitter.removeAllEventListeners(type);
        } else {
            (dispatcher as IEventEmitter).removeAllListeners(type);
        }
    }

    static dispatch(dispatcher: IDefaultEventDispatcher, event: any, ...args): void {
        const emitter = (dispatcher as IEventDispatcher);
        if (emitter.dispatchEvent) {
            emitter.dispatchEvent(event, ...args);
        } else {
            (dispatcher as IEventEmitter).emit(event, ...args);
        }
    }
}