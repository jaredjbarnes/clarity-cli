import * as fs from "fs-extra";
import * as path from "path";
import * as childProcess from "child-process-es6-promise";

var templates = {
    babel: "project-template",
    system: "system-project-template"
};

export default (program) => {

    program.version("0.0.1")
        .option("-t, --type [type]", "Type of project. Options are: 'babel' (default), 'system' (dispatcher system).")
        .parse(process.argv);

    var args = program.args;
    var command = args[0];
    var projectName = args[1];
    var type = program.type || "babel"
    var templateName = templates[type] || templates.babel;

    var templateDirectory = path.join(__dirname, "../../", templateName);
    var projectDirectory = path.join(process.cwd(), projectName);
    var packageJsonFile = path.join(projectDirectory, "package.json");

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    console.log("Creating template....");

    fs.copy(templateDirectory, projectDirectory).then(() => {
        console.log("Modifying package.json...");
        return fs.readJson(packageJsonFile);
    }).then((packageJson) => {
        packageJson.name = projectName;
        console.log("Saving package.json...");
        return fs.writeJson(packageJsonFile, packageJson);
    }).then(() => {
        console.log("Running npm for you, this may take a while...");
        return childProcess.exec("npm install", { cwd: projectDirectory });
    }).then(()=>{
        console.log("Locked and loaded, you are ready to go. Happy coding.");
    });

}
