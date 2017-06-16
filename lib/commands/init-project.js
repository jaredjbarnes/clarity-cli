"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _childProcessEs6Promise = require("child-process-es6-promise");

var _childProcessEs6Promise2 = _interopRequireDefault(_childProcessEs6Promise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isObject(item) {
    return item && (typeof item === "undefined" ? "undefined" : _typeof(item)) === 'object' && !Array.isArray(item);
}

function mergeDeep(target) {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        sources[_key - 1] = arguments[_key];
    }

    if (!sources.length) {
        return target;
    }

    var source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (var key in source) {
            if (isObject(source[key])) {
                if (!target[key]) Object.assign(target, _defineProperty({}, key, {}));
                mergeDeep(target[key], source[key]);
            } else {
                Object.assign(target, _defineProperty({}, key, source[key]));
            }
        }
    }

    return mergeDeep.apply(undefined, [target].concat(sources));
}

exports.default = function (program) {

    program.version("0.0.1").option("-t, --type [type]", "Type of project. Options are: 'babel' (default), 'system' (dispatcher system).").parse(process.argv);

    var args = program.args;
    var command = args[0];
    var projectName = args[1] || "";
    var templateName = "init-project-template";

    var templateDirectory = _path2.default.join(__dirname, "../../templates/", templateName);
    var projectDirectory = process.cwd();
    var readmeFile = _path2.default.join(projectDirectory, "README.md");
    var packageJsonFile = _path2.default.join(projectDirectory, "package.json");
    var mainFile = _path2.default.join(projectDirectory, "src/index.js");
    var testFile = _path2.default.join(projectDirectory, "src/tests/example.js");
    var existingPackageJson = null;
    var existingReadme = null;
    var existingMain = null;
    var existingTest = null;

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    console.log("Creating template....");
    console.log("Checking for existing 'src/tests/example.js' file.");

    _fsExtra2.default.readFile(testFile).catch(function () {

        console.log("No 'tests/example.js' found.");
        return null;
    }).then(function (test) {

        existingTest = test;
        console.log("Checking for existing 'src/index.js' file.");
        return _fsExtra2.default.readFile(mainFile);
    }).catch(function () {

        console.log("No 'src/index.js' found.");
        return null;
    }).then(function (main) {

        console.log("Checking for existing README.md file.");
        existingMain = main;
        return _fsExtra2.default.readFile(readmeFile);
    }).catch(function () {

        console.log("No README.md file found.");
        return null;
    }).then(function (readme) {

        existingReadme = readme;

        if (readme == null) {
            console.log("Found README.md file.");
        }

        console.log("Checking for existing package.json.");
        return _fsExtra2.default.readJson(packageJsonFile);
    }).catch(function () {

        console.log("No package.json file found.");
        return {};
    }).then(function (json) {

        existingPackageJson = json;
        return _fsExtra2.default.copy(templateDirectory, projectDirectory);
    }).then(function () {

        console.log("Modifying package.json...");

        return _fsExtra2.default.readJson(packageJsonFile);
    }).then(function (packageJson) {

        var newPackageJson = mergeDeep({ name: projectName }, packageJson, existingPackageJson);

        console.log("Saving package.json...");
        return _fsExtra2.default.writeJson(packageJsonFile, newPackageJson);
    }).then(function () {

        console.log("Saved package.json.");

        if (existingReadme != null) {
            console.log("Saving README.md file.");
            return _fsExtra2.default.writeFile(readmeFile, existingReadme);
        }
    }).then(function () {

        console.log("Saved README.md.");

        if (existingMain != null) {
            console.log("Saving 'src/index.js'.");
            return _fsExtra2.default.writeFile(mainFile, existingMain);
        }
    }).then(function () {

        console.log("Saved 'src/index.js'.");
        if (existingTest != null) {
            console.log("Saving 'src/tests/example.js");
            return _fsExtra2.default.writeFile(testFile, existingTest);
        }
    }).then(function () {

        console.log("Saved 'src/tests/example.js'.");
        console.log("Running npm for you, this may take a while...");

        return _childProcessEs6Promise2.default.exec("npm install", { cwd: projectDirectory });
    }).then(function () {

        console.log("Locked and loaded, you are ready to go. Happy coding.");
    });
};
//# sourceMappingURL=init-project.js.map