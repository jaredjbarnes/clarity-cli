#!/usr/bin/env node
"use strict";

var _commander = _interopRequireDefault(require("commander"));

var fs = _interopRequireWildcard(require("fs"));

var path = _interopRequireWildcard(require("path"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commands = {};
fs.readdirSync(path.join(__dirname, "commands")).forEach(file => {
  let parts = file.split(".");
  let commandName = parts[0];

  if (parts[parts.length - 1] !== "js") {
    return;
  }

  let command = require(path.join(__dirname, "commands", file));

  if (command && command.default) {
    command = command.default;
  }

  commands[commandName] = command;
});
var hasInitialized = false;

_commander.default.version("0.0.1").arguments("<cmd> [env]", "create a vscode project").action(name => {
  if (!hasInitialized) {
    hasInitialized = true;

    if (typeof commands[name] === "function") {
      commands[name](_commander.default);
    }
  }
}).parse(process.argv);
//# sourceMappingURL=index.js.map