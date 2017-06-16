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
    var mainFile = path.join(projectDirectory, "src/index.js");
    var testFile = path.join(projectDirectory, "src/tests/example.js");
    var existingPackageJson = null;
    var existingReadme = null;
    var existingMain = null;
    var existingTest = null;

    if (projectName == null) {
        throw new Error("Please provide a project name.");
    }

    console.log("Creating template....");
    console.log("Checking for existing 'src/tests/example.js' file.");

    fs.readFile(testFile).catch(() => {

        console.log("No 'tests/example.js' found.");
        return null;

    }).then((test) => {

        existingTest = test;
        console.log("Checking for existing 'src/index.js' file.");
        return fs.readFile(mainFile)

    }).catch(() => {

        console.log("No 'src/index.js' found.");
        return null;

    }).then((main) => {

        console.log("Checking for existing README.md file.");
        existingMain = main;
        return fs.readFile(readmeFile);

    }).catch(() => {

        console.log("No README.md file found.");
        return null;

    }).then((readme) => {

        existingReadme = readme;

        if (readme == null) {
            console.log("Found README.md file.");
        }

        console.log("Checking for existing package.json.");
        return fs.readJson(packageJsonFile);

    }).catch(() => {

        console.log("No package.json file found.");
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

    }).then(() => {

        console.log("Saved package.json.");

        if (existingReadme != null) {
            console.log("Saving README.md file.");
            return fs.writeFile(readmeFile, existingReadme);
        }

    }).then(() => {

        console.log("Saved README.md.");

        if (existingMain != null) {
            console.log("Saving 'src/index.js'.");
            return fs.writeFile(mainFile, existingMain);
        }

    }).then(() => {

        console.log("Saved 'src/index.js'.");
        if (existingTest != null) {
            console.log("Saving 'src/tests/example.js");
            return fs.writeFile(testFile, existingTest);
        }

    }).then(() => {

        console.log("Saved 'src/tests/example.js'.");
        console.log("Running npm for you, this may take a while...");

        return childProcess.exec("npm install", { cwd: projectDirectory });

    }).then(() => {

        console.log("Locked and loaded, you are ready to go. Happy coding.");

    });

}
