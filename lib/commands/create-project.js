"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fsExtra = require("fs-extra");

var fs = _interopRequireWildcard(_fsExtra);

var _path = require("path");

var path = _interopRequireWildcard(_path);

var _childProcessEs6Promise = require("child-process-es6-promise");

var childProcess = _interopRequireWildcard(_childProcessEs6Promise);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = function (program) {

    var args = program.args;
    var command = args[0];
    var projectName = args[1];

    var templateDirectory = path.join(__dirname, "../../template");
    var projectDirectory = path.join(process.cwd(), projectName);
    var packageJsonFile = path.join(projectDirectory, "package.json");

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    fs.copy(templateDirectory, projectDirectory).then(function () {
        return fs.readJson(packageJsonFile);
    }).then(function (packageJson) {
        packageJson.name = projectName;
        return fs.writeJson(packageJsonFile, packageJson);
    }).then(function () {
        return childProcess.exec("npm install", { cwd: projectDirectory });
    }).then(function () {
        return childProcess.exec("node /node_modules/babel-cli/bin/babel.js src --out-dir lib --source-maps", { cwd: projectDirectory });
    });
};
//# sourceMappingURL=create-project.js.map