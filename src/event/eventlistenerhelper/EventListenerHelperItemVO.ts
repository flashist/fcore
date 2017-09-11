import {
    IDefaultEventDispatcher,
    IEventListenerCallback
} from "../../index";

export class EventListenerHelperItemVO<EventType> {
    public dispatcher: IDefaultEventDispatcher<EventType>;
    public type: string;
    public listener: IEventListenerCallback;
    public sourceListener: IEventListenerCallback;
}
