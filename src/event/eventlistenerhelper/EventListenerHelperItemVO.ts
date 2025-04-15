import { IDefaultEventDispatcher } from "./IDefaultEventDispatcher";
import { IEventListener } from "./IEventListener";

export class EventListenerHelperItemVO<EventType> {
    public dispatcher: IDefaultEventDispatcher<EventType>;
    public type: string;
    public listener: IEventListener;
    public sourceListener: IEventListener;
}
