const folderContents = require("folder-contents");

const findPkgs = dir => {
  const options = {
    path: dir,
    recursively: true,
    extensionAccept: ["json"],
    folderIgnore: ["node_modules"]
  };

  const js = folderContents(options);

  const pkgList = Object.entries(js)
    .map(([key, value]) => {
      const file = `${value.path}/${value.name}.${value.ext}`;
      return file;
    })
    .filter(file => {
      const arr = file.split("/");

      if (arr.includes("node_modules")) {
        return false;
      }

      if (arr.includes("package.json")) {
        return true;
      }
    });

  return pkgList;
};

module.exports = findPkgs;
