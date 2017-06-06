import program from "commander";
import * as fs from "fs";
import * as path from "path";

var commands = {};

fs.readdirSync(path.join(__dirname, "commands")).forEach((file) => {
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

program.version("0.0.1")
    .arguments("<cmd> [env]", "create a vscode project").action((name) => {
        setTimeout(() => {
            if (typeof commands[name] === "function") {
                commands[name](program);
            }
        }, 0);
    })
    .parse(process.argv);

    