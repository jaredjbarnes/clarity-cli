import fs from "fs-extra";
import path from "path";
import childProcess from "child-process-es6-promise";

export default (program) => {

    program.version("0.0.1")
        .option("-t, --type [type]", "Type of project. Options are: 'babel' (default), 'system' (dispatcher system).")
        .parse(process.argv);

    var args = program.args;
    var command = args[0];
    var projectName = args[1] || "";
    var templateName = "init-project-template";

    var templateDirectory = path.join(__dirname, "../../templates/", templateName);
    var projectDirectory = process.cwd();
    var readmeFile = path.join(projectDirectory, "README.md");
    var packageJsonFile = path.join(projectDirectory, "package.json");
    var existingPackageJson = null;
    var existingReadme = null;

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    console.log("Creating template....");

    fs.readFile(readmeFile).catch(()=>{
        return null;
    }).then((readme) => {
        existingReadme = readme;
        return fs.readJson(packageJsonFile)
    }).catch(() => {
        return {};
    }).then((json) => {
        existingPackageJson = json;
        return fs.copy(templateDirectory, projectDirectory);
    }).then(() => {
        console.log("Modifying package.json...");
        return fs.readJson(packageJsonFile);
    }).then((packageJson) => {
        var newPackageJson = Object.assign({ name: projectName }, packageJson, existingPackageJson);

        console.log("Saving package.json...");
        return fs.writeJson(packageJsonFile, newPackageJson);
    }).then(()=>{
        if (existingReadme != null){
            return fs.writeFile(readmeFile, existingReadme);
        }
    }).then(() => {
        console.log("Running npm for you, this may take a while...");
        return childProcess.exec("npm install", { cwd: projectDirectory });
    }).then(() => {
        console.log("Locked and loaded, you are ready to go. Happy coding.");
    });

}
