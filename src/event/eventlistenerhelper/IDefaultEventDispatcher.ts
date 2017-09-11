import {IEventDispatcher} from "./IEventDispatcher";
import {IEventEmitter} from "./IEventEmitter";

export type IDefaultEventDispatcher<EventType = any> = IEventDispatcher<EventType> | IEventEmitter<EventType>;