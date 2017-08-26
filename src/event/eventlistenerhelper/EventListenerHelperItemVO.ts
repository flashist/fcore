import {
    IEventDispatcher,
    IEventListenerCallback
} from "../../index";

export class EventListenerHelperItemVO<EventType> {
    public dispatcher:IEventDispatcher<EventType>;
    public type:string;
    public listener:IEventListenerCallback<EventType>;
    public sourceListener:IEventListenerCallback<EventType>;
}
