import {IConstructor} from "../other/IConstructor";

export class BaseObjectExtendTools {
    static extend<BaseType extends IConstructor>(BaseClass: BaseType) {
        return class ResultClass extends BaseClass {
            protected isConstructed: boolean;

            private _data: any;

            constructor(...args) {
                super();

                this.construction(...args);
                this.isConstructed = true;

                this.addListeners();
                this.commitData();
            }


            protected construction(...args): void {
                // Note: subclasses should implement their own logic here
            }

            public destruction(): void {
                // Note: subclasses should implement their own logic here


                this.removeListeners();
            }


            protected addListeners(): void {
                this.removeListeners();

                // Note: subclasses should implement their own logic here
            }

            protected removeListeners(): void {
                // Note: subclasses should implement their own logic here
            }


            protected commitData(): void {
                // Note: subclasses should implement their own logic here
            }

            protected arrange(): void {
                // Note: subclasses should implement their own logic here
            }


            public get data(): any {
                return this._data;
            }

            public set data(value: any) {
                if (this.data == value) {
                    return;
                }

                this._data = value;

                this.commitData();
            }
        } as any;
    }
}
