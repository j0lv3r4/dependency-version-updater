const fs = require("fs");

const updatePkg = (path, dependencies) => {
  const js = require(path);
  js.dependencies = Object.assign({}, js.dependencies, dependencies);
  fs.writeFileSync(path, JSON.stringify(js));
};

module.exports = updatePkg;
