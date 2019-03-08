"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _childProcessEs6Promise = _interopRequireDefault(require("child-process-es6-promise"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeep(target, ...sources) {
  if (!sources.length) {
    return target;
  }

  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, {
          [key]: {}
        });
        mergeDeep(target[key], source[key]);
      } else {
        Object.assign(target, {
          [key]: source[key]
        });
      }
    }
  }

  return mergeDeep(target, ...sources);
}

var _default = program => {
  program.version("0.0.1").option("-t, --type [type]", "Type of project. Options are: 'babel' (default), 'system' (dispatcher system).").parse(process.argv);
  var args = program.args;
  var projectName = args[1] || "";
  var templateName = "init-project-template";

  var templateDirectory = _path.default.join(__dirname, "../../templates/", templateName);

  var projectDirectory = process.cwd();

  var readmeFile = _path.default.join(projectDirectory, "README.md");

  var packageJsonFile = _path.default.join(projectDirectory, "package.json");

  var mainFile = _path.default.join(projectDirectory, "src/index.js");

  var testFile = _path.default.join(projectDirectory, "src/tests/example.js");

  var existingPackageJson = null;
  var existingReadme = null;
  var existingMain = null;
  var existingTest = null;

  if (projectName == null) {
    throw new Error("Please provide a project name.");
  }

  console.log("Creating template....");
  console.log("Checking for existing 'src/tests/example.js' file.");

  _fsExtra.default.readFile(testFile).catch(() => {
    console.log("No 'tests/example.js' found.");
    return null;
  }).then(test => {
    existingTest = test;
    console.log("Checking for existing 'src/index.js' file.");
    return _fsExtra.default.readFile(mainFile);
  }).catch(() => {
    console.log("No 'src/index.js' found.");
    return null;
  }).then(main => {
    console.log("Checking for existing README.md file.");
    existingMain = main;
    return _fsExtra.default.readFile(readmeFile);
  }).catch(() => {
    console.log("No README.md file found.");
    return null;
  }).then(readme => {
    existingReadme = readme;

    if (readme == null) {
      console.log("Found README.md file.");
    }

    console.log("Checking for existing package.json.");
    return _fsExtra.default.readJson(packageJsonFile);
  }).catch(() => {
    console.log("No package.json file found.");
    return {};
  }).then(json => {
    existingPackageJson = json;
    return _fsExtra.default.copy(templateDirectory, projectDirectory);
  }).then(() => {
    console.log("Modifying package.json...");
    return _fsExtra.default.readJson(packageJsonFile);
  }).then(packageJson => {
    var newPackageJson = mergeDeep({
      name: projectName
    }, packageJson, existingPackageJson);
    console.log("Saving package.json...");
    return _fsExtra.default.writeJson(packageJsonFile, newPackageJson);
  }).then(() => {
    console.log("Saved package.json.");

    if (existingReadme != null) {
      console.log("Saving README.md file.");
      return _fsExtra.default.writeFile(readmeFile, existingReadme);
    }
  }).then(() => {
    console.log("Saved README.md.");

    if (existingMain != null) {
      console.log("Saving 'src/index.js'.");
      return _fsExtra.default.writeFile(mainFile, existingMain);
    }
  }).then(() => {
    console.log("Saved 'src/index.js'.");

    if (existingTest != null) {
      console.log("Saving 'src/tests/example.js");
      return _fsExtra.default.writeFile(testFile, existingTest);
    }
  }).then(() => {
    console.log("Saved 'src/tests/example.js'.");
    console.log("Running npm for you, this may take a while...");
    return _childProcessEs6Promise.default.exec("npm install", {
      cwd: projectDirectory
    });
  }).then(() => {
    console.log("Locked and loaded, you are ready to go. Happy coding.");
  });
};

exports.default = _default;
//# sourceMappingURL=init-project.js.map