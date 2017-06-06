import * as fs from "fs-extra";
import * as path from "path";
import * as childProcess from "child-process-es6-promise";

export default (program) => {

    var args = program.args;
    var command = args[0];
    var projectName = args[1];

    var templateDirectory = path.join(__dirname, "../../template");
    var projectDirectory = path.join(process.cwd(), projectName);
    var packageJsonFile = path.join(projectDirectory, "package.json");

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    fs.copy(templateDirectory, projectDirectory).then(() => {
        return fs.readJson(packageJsonFile);
    }).then((packageJson) => {
        packageJson.name = projectName;
        return fs.writeJson(packageJsonFile, packageJson);
    }).then(() => {
        return childProcess.exec("npm install", { cwd: projectDirectory });
    });

}
