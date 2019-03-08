"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var fs = _interopRequireWildcard(require("fs-extra"));

var path = _interopRequireWildcard(require("path"));

var childProcess = _interopRequireWildcard(require("child-process-es6-promise"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

var templates = {
  babel: "project-template",
  system: "system-project-template"
};

var _default = program => {
  program.version("0.0.1").option("-t, --type [type]", "Type of project. Options are: 'babel' (default), 'system' (dispatcher system).").parse(process.argv);
  var args = program.args;
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
  fs.copy(templateDirectory, projectDirectory).then(() => {
    console.log("Modifying package.json...");
    return fs.readJson(packageJsonFile);
  }).then(packageJson => {
    packageJson.name = projectName;
    console.log("Saving package.json...");
    return fs.writeJson(packageJsonFile, packageJson);
  }).then(() => {
    console.log("Running npm for you, this may take a while...");
    return childProcess.exec("npm install", {
      cwd: projectDirectory
    });
  }).then(() => {
    console.log("Locked and loaded, you are ready to go. Happy coding.");
  });
};

exports.default = _default;
//# sourceMappingURL=create-project.js.map