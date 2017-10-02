import {
    ArrayTools,
    IEventListenerCallback,
    IDefaultEventDispatcher,
    EventListenerHelperItemVO,
    AssociativeArray
} from "../../index";
import {EventsHelperTools} from "../tools/EventsHelperTools";

export class EventListenerHelper<EventType extends any = any> {
    protected listenerThis: any;

    protected listenersByTypeMap: AssociativeArray<EventListenerHelperItemVO<EventType>[]>;

    constructor(listenerThis: any) {
        this.listenerThis = listenerThis;

        this.construction();
    }

    protected construction(): void {
        this.listenersByTypeMap = new AssociativeArray<EventListenerHelperItemVO<EventType>[]>();
    }

    public destruction(): void {
        this.removeAllListeners();
        this.listenerThis = null;
    }


    public addEventListener(dispatcher: IDefaultEventDispatcher<EventType>,
                            type: string,
                            listener: IEventListenerCallback): void {

        var tempListeners: EventListenerHelperItemVO<EventType>[] = this.getEventListeners(type);

        var tempListenerData: EventListenerHelperItemVO<EventType> = new EventListenerHelperItemVO<EventType>();
        tempListenerData.dispatcher = dispatcher;
        tempListenerData.type = type;
        tempListenerData.listener = listener.bind(this.listenerThis);
        tempListenerData.sourceListener = listener;
        tempListeners.push(tempListenerData);
        //
        // dispatcher.addEventListener(type, tempListenerData.listener);
        EventsHelperTools.addEventListener(
            dispatcher,
            type,
            tempListenerData.listener
        );
    }

    public removeEventListener(dispatcher: IDefaultEventDispatcher<EventType>,
                               type: string,
                               listener: IEventListenerCallback): void {
        var tempListeners: EventListenerHelperItemVO<EventType>[] = this.getEventListeners(type);
        //CustomLogger.log("EventListenerHelper | removeEventListener __ start __ tempListeners.length: " + tempListeners.length);

        tempListeners.filter(
            (item: EventListenerHelperItemVO<EventType>, index: number, array: EventListenerHelperItemVO<EventType>[]): boolean => {
                var result: boolean = true;

                if (item.dispatcher == dispatcher && item.sourceListener == listener) {
                    EventsHelperTools.removeEventListener(
                        item.dispatcher,
                        item.type,
                        item.listener
                    );

                    // Remove the item from the source list
                    result = false;
                }

                return result;
            }
        );

        //CustomLogger.log("EventListenerHelper | removeEventListener __ end __ tempListeners.length: " + tempListeners.length);
    }

    public removeAllListeners(dispatcher?: IDefaultEventDispatcher<EventType>): void {
        //CustomLogger.log("EventListenerHelper | removeAllListeners");

        var listenersByTypeList: EventListenerHelperItemVO<EventType>[][] = this.listenersByTypeMap.getAllItems();
        var listenersList: EventListenerHelperItemVO<EventType>[] = [];

        listenersByTypeList.forEach(
            (item: EventListenerHelperItemVO<EventType>[], index: number, array: EventListenerHelperItemVO<EventType>[][]): void => {
                //CustomLogger.log("EventListenerHelper | removeAllListeners __ start __ item.length: " + item.length);

                // Make a copy of the item, to prevent possible problems with loop and array,
                // because we plan to remove items from it
                var typeListenersCopy: EventListenerHelperItemVO<EventType>[] = item.concat();
                //
                var tempListenerData: EventListenerHelperItemVO<EventType>;
                var listenersCount: number = typeListenersCopy.length;
                for (var listenerIndex: number = 0; listenerIndex < listenersCount; listenerIndex++) {
                    tempListenerData = typeListenersCopy[listenerIndex];
                    if (!dispatcher || tempListenerData.dispatcher == dispatcher) {
                        /*tempListenerData.dispatcher.removeEventListener(
                            tempListenerData.type,
                            tempListenerData.listener
                        );*/
                        EventsHelperTools.addEventListener(
                            tempListenerData.dispatcher,
                            tempListenerData.type,
                            tempListenerData.listener
                        );

                        // Remove information about listener from the list,
                        // to release the memory used by this item
                        ArrayTools.removeItem(item, tempListenerData);
                    }
                }

                //CustomLogger.log("EventListenerHelper | removeAllListeners __ end __ item.length: " + item.length);
            }
        );
    }

    protected getEventListeners(type: string): EventListenerHelperItemVO<EventType>[] {
        if (!this.listenersByTypeMap.containsKey(type)) {
            this.listenersByTypeMap.push([], type);
        }

        var result: EventListenerHelperItemVO<EventType>[] = this.listenersByTypeMap.getItem(type);
        return result;
    }

}
