const glob = require("glob");

const findPkgs = (dir, cb) => {
  const options = {
    cwd: dir,
    absolute: true
  };

  console.log("options:", options);

  glob("**/*.json", options, (err, files) => {
    if (err) return new Error(err);

    const pkgList = files.filter(file => {
      const arr = file.split("/");

      if (arr.includes("node_modules")) {
        return false;
      }

      if (arr.includes("package.json")) {
        return true;
      }
    });

    cb(pkgList);
  });
};

module.exports = findPkgs;
