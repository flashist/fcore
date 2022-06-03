import { Command } from "./Command";

export class CallbackWithPromiseExecutionCommand<ResolveType = any> extends Command<ResolveType> {

    constructor(public callback: (...args) => Promise<any | void>) {
        super(callback);
    }

    protected executeInternal(): void {
        this.callback().then(() => {
            this.notifyComplete();
        });
    }


}