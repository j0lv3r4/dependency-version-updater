const fs = require("fs");
const { spawn } = require("child_process");
const prettier = require("prettier");

const updatePkg = (path, dependencies) => {
  const js = require(path);

  let changed = false;

  Object.keys(dependencies).forEach(key => {
    if (js.dependencies && js.dependencies.hasOwnProperty(key)) {
      changed = true;
      js.dependencies[key] = dependencies[key];
    } else {
      console.log(`[${path}] has no dependency ${key}, skipping.`);
    }
  });

  if (changed) {
    fs.writeFileSync(path, JSON.stringify(js));
    spawn("npx", ["prettier", "--write", path]);
  }
};

module.exports = updatePkg;
