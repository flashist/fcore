import { Command } from "./Command";

export class CallbackExecutionCommand<ResolveType = any> extends Command<ResolveType> {

    constructor(public callback: (...args) => any | void) {
        super(callback);
    }

    protected async executeInternal() {
        await this.callback();

        this.notifyComplete();
    }


}