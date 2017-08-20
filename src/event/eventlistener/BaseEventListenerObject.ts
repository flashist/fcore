import {BaseObject} from "../../baseobject/BaseObject";
import {BaseEventListenerObjectExtendTools} from "./BaseEventListenerObjectExtendTools";
import {IConstructor} from "../../other/IConstructor";

export const BaseEventListenerObjectClass: IConstructor = (BaseEventListenerObjectExtendTools as any).extend(BaseObject);
export class BaseEventListenerObject extends BaseEventListenerObjectClass {

}