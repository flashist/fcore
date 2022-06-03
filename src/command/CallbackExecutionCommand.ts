import { Command } from "./Command";

export class CallbackExecutionCommand<ResolveType = any> extends Command<ResolveType> {

    constructor(public callback: (...args) => any | void) {
        super(callback);
    }

    protected executeInternal(): void {
        this.callback();

        this.notifyComplete();
    }


}