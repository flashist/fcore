import {
    IDefaultEventDispatcher,
    IEventListener
} from "../../index";

export class EventListenerHelperItemVO<EventType> {
    public dispatcher: IDefaultEventDispatcher<EventType>;
    public type: string;
    public listener: IEventListener;
    public sourceListener: IEventListener;
}
