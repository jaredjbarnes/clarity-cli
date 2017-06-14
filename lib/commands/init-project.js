"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _childProcessEs6Promise = require("child-process-es6-promise");

var _childProcessEs6Promise2 = _interopRequireDefault(_childProcessEs6Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var templates = {
    babel: "project-template",
    system: "system-project-template"
};

exports.default = function (program) {

    program.version("0.0.1").option("-t, --type [type]", "Type of project. Options are: 'babel' (default), 'system' (dispatcher system).").parse(process.argv);

    var args = program.args;
    var command = args[0];
    var projectName = args[1] || "";
    var type = program.type || "babel";
    var templateName = templates[type] || templates.babel;

    var templateDirectory = _path2.default.join(__dirname, "../../templates/", templateName);
    var projectDirectory = process.cwd();
    var packageJsonFile = _path2.default.join(projectDirectory, "package.json");
    var existingPackageJson = null;

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    console.log("Creating template....");

    _fsExtra2.default.readJson(packageJsonFile).catch(function () {
        return {};
    }).then(function (json) {
        existingPackageJson = json;
        return _fsExtra2.default.copy(templateDirectory, projectDirectory);
    }).then(function () {
        console.log("Modifying package.json...");
        return _fsExtra2.default.readJson(packageJsonFile);
    }).then(function (packageJson) {
        var newPackageJson = Object.assign({ name: projectName }, packageJson, existingPackageJson);

        console.log("Saving package.json...");
        return _fsExtra2.default.writeJson(packageJsonFile, newPackageJson);
    }).then(function () {
        console.log("Running npm for you, this may take a while...");
        return _childProcessEs6Promise2.default.exec("npm install", { cwd: projectDirectory });
    }).then(function () {
        console.log("Locked and loaded, you are ready to go. Happy coding.");
    });
};
//# sourceMappingURL=init-project.js.map