import {EventListenerHelper} from "../eventlistenerhelper/EventListenerHelper";
import {IConstructor} from "../../other/IConstructor";

export class BaseEventListenerObjectExtendTools {
    static extend<BaseType extends IConstructor>(BaseClass: BaseType) {
        return class extends BaseClass {
            protected eventListenerHelper:EventListenerHelper<Event | string | any>;

            constructor(...args) {

                super(...args);
            }

            protected construction(...args):void {
                this.eventListenerHelper = new EventListenerHelper(this);

                super.construction(...args);
            }


            public destruction():void {
                super.destruction();

                if (this.eventListenerHelper) {
                    this.eventListenerHelper.destruction();
                    this.eventListenerHelper = null;
                }
            }


            protected addListeners():void {
                super.addListeners();
            }

            protected removeListeners():void {
                super.removeListeners();

                if (this.eventListenerHelper) {
                    this.eventListenerHelper.removeAllListeners();
                }
            }
        } as any;
    }
}