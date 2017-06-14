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

var templates = {
    babel: "project-template",
    system: "system-project-template"
};

exports.default = function (program) {

    program.version("0.0.1").option("-t, --type [type]", "Type of project. Options are: 'babel' (default), 'system' (dispatcher system).").parse(process.argv);

    var args = program.args;
    var command = args[0];
    var projectName = args[1];
    var type = program.type || "babel";
    var templateName = templates[type] || templates.babel;

    var templateDirectory = path.join(__dirname, "../../templates/", templateName);
    var projectDirectory = path.join(process.cwd(), projectName);
    var packageJsonFile = path.join(projectDirectory, "package.json");

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    console.log("Creating template....");

    fs.copy(templateDirectory, projectDirectory).then(function () {
        console.log("Modifying package.json...");
        return fs.readJson(packageJsonFile);
    }).then(function (packageJson) {
        packageJson.name = projectName;
        console.log("Saving package.json...");
        return fs.writeJson(packageJsonFile, packageJson);
    }).then(function () {
        console.log("Running npm for you, this may take a while...");
        return childProcess.exec("npm install", { cwd: projectDirectory });
    }).then(function () {
        console.log("Locked and loaded, you are ready to go. Happy coding.");
    });
};
//# sourceMappingURL=create-project.js.map