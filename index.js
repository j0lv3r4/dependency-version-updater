const program = require("commander");
const findPkgs = require("./findPkgs");
const updatePkg = require("./updatePkg");

program
  .version("0.1.0", "-v, --version")
  .option("-p, --path <directory>", "Folder path")
  .option(
    "-d, --dependencies <dependency>",
    "Dependencies to update separated by a comma"
  )
  .parse(process.argv);

const { path, dependencies } = program;
let depObj = {};

const depArr = dependencies.split(",").map(dependency => {
  const arr = dependency.split("=");
  return { [arr[0]]: arr[1] };
});

depArr.forEach(dep => {
  depObj = Object.assign({}, depObj, dep);
});

const pkgsList = findPkgs(path);
pkgsList.forEach(filePath => {
  updatePkg(filePath, depObj);
});
