import { Command } from "./Command";
import { CommandEvent } from "./CommandEvent";
import { QueueCommandEvent } from "./QueueCommandEvent";
import { QueueCommandErrorCode } from "./QueueCommandErrorCode";

export class QueueCommand extends Command {
    protected queueCommands: Command[];
    protected curCommandIndex: number;

    protected runningCommand: Command;

    protected lastCompleteCommand: Command;

    public isNeedCompleteAfterTheLastCommand: boolean;
    public isNeedChangeProgressByCommandComplete: boolean;
    public isNeedAbortOnQueueCommandError: boolean;

    private _progress: number;

    constructor(commands: Command[] = null) {
        super();

        if (!commands) {
            commands = [];
        }
        this.queueCommands = commands.concat();
        this.curCommandIndex = -1;

        this._progress = 0;

        this.isNeedCompleteAfterTheLastCommand = true;
        this.isNeedChangeProgressByCommandComplete = true;
    }


    protected executeInternal(): void {
        this.executeNextCommand();
    }

    protected executeNextCommand(): void {
        if (this.isCompleted) {
            return;
        }

        if (!this.runningCommand) {
            if (this.curCommandIndex < this.queueCommands.length - 1) {
                this.curCommandIndex++;

                var tempCommand: Command = this.queueCommands[this.curCommandIndex];
                this.runningCommand = tempCommand;
                //
                this.addSingleCommandListeners(this.runningCommand);
                //
                this.runningCommand.execute();

            } else {
                if (this.isNeedCompleteAfterTheLastCommand) {
                    this.notifyComplete();
                }
            }
        }
    }


    protected addSingleCommandListeners(cmd: Command): void {
        this.eventListenerHelper.addEventListener(
            cmd,
            CommandEvent.COMPLETE,
            this.onCommandComplete
        );
    }

    protected removeSingleCommandListeners(cmd: Command): void {
        this.eventListenerHelper.removeEventListener(cmd, CommandEvent.COMPLETE, this.onCommandComplete);
    }


    protected onCommandComplete(event: string): void {
        this.lastCompleteCommand = this.runningCommand;

        this.resetRunningCommandData();

        if (this.lastCompleteCommand) {
            /*var tempEvent:QueueCommandEvent = new QueueCommandEvent(QueueCommandEvent.COMMAND_COMPLETE);
            tempEvent.command = this.lastCompleteCommand;
            this.dispatchEvent(tempEvent);*/
            this.dispatchEvent(QueueCommandEvent.COMMAND_COMPLETE, this.lastCompleteCommand);
            //
            //this.dispatchProgressEvent();
            if (this.isNeedChangeProgressByCommandComplete) {
                this.setProgress(this.curCommandIndex + 1);
            }

            // If the last command has completed incorrectly
            // and it's required to abort the queue after incorrect command
            if (!this.lastCompleteCommand.success && this.isNeedAbortOnQueueCommandError) {
                this.errorCode = QueueCommandErrorCode.QUEUE_COMMAND_ERROR;
                this.terminate();

                // If the last command has completed correctly,
                // or it's not required to abort the queue on error
            } else {
                this.executeNextCommand();
            }
        }
    }

    protected dispatchProgressEvent(): void {
        /*var tempProgressEvent:ProgressEvent = new ProgressEvent(
            ProgressEvent.PROGRESS,
            this.progress,
            1
        );
        this.dispatchEvent(tempProgressEvent);*/
        this.dispatchEvent(QueueCommandEvent.PROGRESS, this.progress);
    }

    //protected getProgress(): number
    //{
    //    var result: number = 0;
    //    if (this.queueCommands.length > 0 && this.curCommandIndex >= 0)
    //    {
    //        result = (this.curCommandIndex / this.queueCommands.length);
    //    }

    //    return result;
    //}

    public get progress(): number {
        return this._progress;
    }

    protected setProgress(value: number) {
        if (value == this.progress) {
            return;
        }

        this._progress = value;

        this.dispatchProgressEvent();
    }

    protected resetRunningCommandData(): void {
        if (this.runningCommand) {
            this.removeSingleCommandListeners(this.runningCommand);
            this.runningCommand = null;
        }
    }


    public terminate(): void {
        super.terminate();

        //
        if (this.runningCommand) {
            this.runningCommand.terminate();
        }
    }

    protected notifyComplete(): void {
        super.notifyComplete();

        this.resetRunningCommandData();
        this.queueCommands = [];
        this.curCommandIndex = 0;
    }


    public add(cmd: Command): void {
        this.queueCommands.push(cmd);
    }
}