
import {LockEvent} from "./LockEvent";
import {BaseObject} from "../baseobject/BaseObject";

export class Lock extends BaseObject {

    protected lockers: any[] = [];

    public get enabled(): boolean {
        return this.lockers.length > 0;
    }

    public add(locker: any): void {
        if (this.lockers.indexOf(locker) !== -1) {
            return;
        }

        this.lockers.push(locker);

        this.dispatchEvent(LockEvent.CHANGE);
    }

    public remove(locker: any): void {
        const lockerIndex: number = this.lockers.indexOf(locker);
        if (lockerIndex === -1) {
            return;
        }

        this.lockers.splice(lockerIndex, 1);

        this.dispatchEvent(LockEvent.CHANGE);
    }
}