﻿import { IEventDispatcher } from "../eventlistenerhelper/IEventDispatcher";
import { IEventListener } from "../eventlistenerhelper/IEventListener";

import { EventEmitter } from "eventemitter3";

// Type definition for the eventemitter3
declare type IEventEmitter = {
    addListener(type: string, listener: Function, context?: any);
    removeListener(type: string, listener: Function, context?: any);
    removeAllListeners(type?: string);
    emit(type: string, ...args);
};

export class BaseEventDispatcher implements IEventDispatcher<string> {
    private eventEmitter: IEventEmitter;

    public constructor(...args) {
        this.eventEmitter = new EventEmitter();
    }

    addEventListener(type: string, listener: IEventListener): void {
        this.eventEmitter.addListener(type, listener as Function);
    }

    removeAllEventListeners(type?: string): void {
        this.eventEmitter.removeAllListeners(type);
    }

    removeEventListener(type: string, listener: IEventListener): void {
        this.eventEmitter.removeListener(type, listener as Function);
    }

    dispatchEvent(type: string, ...args: any[]): void {
        this.eventEmitter.emit(type, ...args);
    }
}
