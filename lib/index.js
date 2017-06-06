"use strict";

var _commander = require("commander");

var _commander2 = _interopRequireDefault(_commander);

var _fs = require("fs");

var fs = _interopRequireWildcard(_fs);

var _path = require("path");

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = {};

fs.readdirSync(path.join(__dirname, "commands")).forEach(function (file) {
    var parts = file.split(".");
    var commandName = parts[0];

    if (parts[parts.length - 1] !== "js") {
        return;
    }

    var command = require(path.join(__dirname, "commands", file));

    if (command && command.default) {
        command = command.default;
    }

    commands[commandName] = command;
});

_commander2.default.version("0.0.1").arguments("<cmd> [env]", "create a vscode project").action(function (name) {
    setTimeout(function () {
        if (typeof commands[name] === "function") {
            commands[name](_commander2.default);
        }
    }, 0);
}).parse(process.argv);
//# sourceMappingURL=index.js.map