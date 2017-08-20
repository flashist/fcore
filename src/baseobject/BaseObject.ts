import {BaseEventListenerObjectExtendTools} from "../event/eventlistener/BaseEventListenerObjectExtendTools";
import {BaseEventDispatcher} from "../event/eventdispatcher/BaseEventDispatcher";
import {IConstructor} from "../other/IConstructor";

export const BaseObjectClass: IConstructor = (BaseEventListenerObjectExtendTools as any).extend(BaseEventDispatcher);
export class BaseObject extends BaseObjectClass {

}