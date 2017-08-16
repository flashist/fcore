var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Command } from "./Command";
import { CommandEvent } from "./CommandEvent";
import { QueueCommandEvent } from "./QueueCommandEvent";
import { QueueCommandErrorCode } from "./QueueCommandErrorCode";
var QueueCommand = (function (_super) {
    __extends(QueueCommand, _super);
    function QueueCommand(commands) {
        if (commands === void 0) { commands = null; }
        var _this = _super.call(this) || this;
        if (!commands) {
            commands = [];
        }
        _this.queueCommands = commands.concat();
        _this.curCommandIndex = -1;
        _this._progress = 0;
        _this.isNeedCompleteAfterTheLastCommand = true;
        _this.isNeedChangeProgressByCommandComplete = true;
        return _this;
    }
    QueueCommand.prototype.executeInternal = function () {
        _super.prototype.executeInternal.call(this);
        this.executeNextCommand();
    };
    QueueCommand.prototype.executeNextCommand = function () {
        if (this.isCompleted) {
            return;
        }
        if (!this.runningCommand) {
            if (this.curCommandIndex < this.queueCommands.length - 1) {
                this.curCommandIndex++;
                var tempCommand = this.queueCommands[this.curCommandIndex];
                this.runningCommand = tempCommand;
                //
                this.addSingleCommandListeners(this.runningCommand);
                //
                this.runningCommand.execute();
            }
            else {
                if (this.isNeedCompleteAfterTheLastCommand) {
                    this.notifyComplete();
                }
            }
        }
    };
    QueueCommand.prototype.addSingleCommandListeners = function (cmd) {
        this.eventListenerHelper.addEventListener(cmd, CommandEvent.COMPLETE, this.onCommandComplete);
    };
    QueueCommand.prototype.removeSingleCommandListeners = function (cmd) {
        this.eventListenerHelper.removeEventListener(cmd, CommandEvent.COMPLETE, this.onCommandComplete);
    };
    QueueCommand.prototype.onCommandComplete = function (event) {
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
            }
            else {
                this.executeNextCommand();
            }
        }
    };
    QueueCommand.prototype.dispatchProgressEvent = function () {
        /*var tempProgressEvent:ProgressEvent = new ProgressEvent(
            ProgressEvent.PROGRESS,
            this.progress,
            1
        );
        this.dispatchEvent(tempProgressEvent);*/
        this.dispatchEvent(QueueCommandEvent.PROGRESS, this.progress);
    };
    Object.defineProperty(QueueCommand.prototype, "progress", {
        //protected getProgress(): number
        //{
        //    var result: number = 0;
        //    if (this.queueCommands.length > 0 && this.curCommandIndex >= 0)
        //    {
        //        result = (this.curCommandIndex / this.queueCommands.length);
        //    }
        //    return result;
        //}
        get: function () {
            return this._progress;
        },
        enumerable: true,
        configurable: true
    });
    QueueCommand.prototype.setProgress = function (value) {
        if (value == this.progress) {
            return;
        }
        this._progress = value;
        this.dispatchProgressEvent();
    };
    QueueCommand.prototype.resetRunningCommandData = function () {
        if (this.runningCommand) {
            this.removeSingleCommandListeners(this.runningCommand);
            this.runningCommand = null;
        }
    };
    QueueCommand.prototype.terminate = function () {
        _super.prototype.terminate.call(this);
        //
        if (this.runningCommand) {
            this.runningCommand.terminate();
        }
    };
    QueueCommand.prototype.notifyComplete = function () {
        _super.prototype.notifyComplete.call(this);
        this.resetRunningCommandData();
        this.queueCommands = [];
        this.curCommandIndex = 0;
    };
    QueueCommand.prototype.add = function (cmd) {
        this.queueCommands.push(cmd);
    };
    return QueueCommand;
}(Command));
export { QueueCommand };
//# sourceMappingURL=QueueCommand.js.map