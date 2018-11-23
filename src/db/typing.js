"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InternalSymbol {
}
var UPDATE_COMMANDS_LITERAL;
(function (UPDATE_COMMANDS_LITERAL) {
    UPDATE_COMMANDS_LITERAL["SET"] = "set";
    UPDATE_COMMANDS_LITERAL["REMOVE"] = "remove";
    UPDATE_COMMANDS_LITERAL["INC"] = "inc";
    UPDATE_COMMANDS_LITERAL["MUL"] = "mul";
    UPDATE_COMMANDS_LITERAL["PUSH"] = "push";
    UPDATE_COMMANDS_LITERAL["POP"] = "pop";
    UPDATE_COMMANDS_LITERAL["SHIFT"] = "shift";
    UPDATE_COMMANDS_LITERAL["UNSHIFT"] = "unshift";
})(UPDATE_COMMANDS_LITERAL = exports.UPDATE_COMMANDS_LITERAL || (exports.UPDATE_COMMANDS_LITERAL = {}));
class DatabaseUpdateCommand {
}
exports.DatabaseUpdateCommand = DatabaseUpdateCommand;
class DatabaseLogicCommand {
}
exports.DatabaseLogicCommand = DatabaseLogicCommand;
class DatabaseQueryCommand extends DatabaseLogicCommand {
}
exports.DatabaseQueryCommand = DatabaseQueryCommand;
class DatabaseLogicCommand {
}
exports.DatabaseLogicCommand = DatabaseLogicCommand;
