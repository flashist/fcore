import { Command } from "./Command";
export declare class QueueCommand extends Command {
    protected queueCommands: Command[];
    protected curCommandIndex: number;
    protected runningCommand: Command;
    protected lastCompleteCommand: Command;
    isNeedCompleteAfterTheLastCommand: boolean;
    isNeedChangeProgressByCommandComplete: boolean;
    isNeedAbortOnQueueCommandError: boolean;
    private _progress;
    constructor(commands?: Command[]);
    protected executeInternal(): void;
    protected executeNextCommand(): void;
    protected addSingleCommandListeners(cmd: Command): void;
    protected removeSingleCommandListeners(cmd: Command): void;
    protected onCommandComplete(event: string): void;
    protected dispatchProgressEvent(): void;
    readonly progress: number;
    protected setProgress(value: number): void;
    protected resetRunningCommandData(): void;
    terminate(): void;
    protected notifyComplete(): void;
    add(cmd: Command): void;
}
