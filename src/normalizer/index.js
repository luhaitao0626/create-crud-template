const path = require("path");

function getFolder(type) {
  if (type === "element-plus") {
    return path.resolve(__dirname, "../template", type);
  } else if (type === "ant-design") {
  } else {
  }
}

function findExcludes(config) {
  let excludes = [];
  if (!config.hasPagination) {
    excludes.push("pagination.ts");
  }
  if (!config.hasQuery) {
    excludes.push("query.ts");
  }
  return excludes;
}

let normalizer = function (config) {
  const templatePath = getFolder(config.type);
  const excludes = findExcludes(config); // 找到不需要输出的文件
//   const output = path.resolve(__dirname, "../../dist");
  const ctx = { ...config, templatePath, excludes };
//   console.log(ctx);
  return ctx;
};

module.exports = normalizer;
