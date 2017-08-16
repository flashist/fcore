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
import { BaseEventListenerObject } from "../baseobject/BaseEventListenerObject";
import { CommandEvent } from "./CommandEvent";
import { CommandErrorCode } from "./CommandErrorCode";
import { EventListenerHelper } from "../event/eventlistenerhelper/EventListenerHelper";
import { Logger } from "../logger/Logger";
import { ArrayTools } from "../tools/ArrayTools";
var Command = (function (_super) {
    __extends(Command, _super);
    function Command() {
        var _this = _super.call(this) || this;
        _this.errorCode = CommandErrorCode.NO_ERROR;
        _this.eventListenerHelper = new EventListenerHelper(_this);
        return _this;
    }
    Object.defineProperty(Command.prototype, "isExecuting", {
        get: function () {
            return this._isExecuting;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Command.prototype, "isCompleted", {
        get: function () {
            return this._isCompleted;
        },
        enumerable: true,
        configurable: true
    });
    Command.prototype.execute = function () {
        var _this = this;
        console.log("Action | execute __ name: " + this.constructor['name']);
        return new Promise(function (resolve, reject) {
            _this.promiseResolve = resolve;
            _this.promiseReject = reject;
            if (_this.isExecuting || _this.isCompleted) {
                Logger.log("Command | execute", "WARNING! Second execute while executing or complete! this.isExecuting: " + _this.isExecuting + " | this.isCompleted: " + _this.isCompleted);
                return;
            }
            _this._isExecuting = true;
            if (Command.cache.indexOf(_this) == -1) {
                Command.cache.push(_this);
            }
            _this.executeInternal();
        });
    };
    Command.prototype.executeInternal = function () {
        // Note: subclasses should implement their own logic
    };
    Command.prototype.notifyComplete = function (resolveData, rejectErrorData) {
        this._isExecuting = false;
        if (!this.isCompleted) {
            ArrayTools.removeItem(Command.cache, this);
            this._isCompleted = true;
            /*var tempEvent:BaseEvent = new BaseEvent(BaseEvent.COMPLETE);
             this.dispatchEvent(tempEvent);*/
            this.dispatchEvent(CommandEvent.COMPLETE);
            if (this.success) {
                this.promiseResolve(resolveData);
            }
            else {
                this.promiseReject(rejectErrorData);
            }
        }
        //
        this.destruction();
    };
    Command.prototype.terminate = function () {
        if (!this.errorCode) {
            this.errorCode = CommandErrorCode.TERMINATE;
        }
        this.notifyComplete(Error(this.errorCode));
    };
    Object.defineProperty(Command.prototype, "success", {
        get: function () {
            var result = false;
            if (this.errorCode == CommandErrorCode.NO_ERROR) {
                result = true;
            }
            return result;
        },
        enumerable: true,
        configurable: true
    });
    return Command;
}(BaseEventListenerObject));
export { Command };
Command.cache = [];
//# sourceMappingURL=Command.js.map