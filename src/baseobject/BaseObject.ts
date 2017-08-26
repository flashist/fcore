import {BaseEventDispatcher} from "../event/eventdispatcher/BaseEventDispatcher";
import {IConstructor} from "../other/IConstructor";
import {BaseObjectExtendTools} from "./BaseObjectExtendTools";

export const BaseObjectClass: IConstructor = (BaseObjectExtendTools as any).extend(BaseEventDispatcher);
export class BaseObject extends BaseObjectClass {

}