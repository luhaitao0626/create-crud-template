function findExcludes(config) {
  let excludes = [];
  if (!config.hasPagination) {
    excludes.push("pagination.ts");
  }
  if (!config.hasQuery) {
    excludes.push("query.ts");
    excludes.push("typings/entityQuery.ts");
  }
  return excludes;
}

const getOutputs = (config, fileList) => {
  const excludes = findExcludes(config); // 找到不需要输出的文件
  return fileList.filter((file) => {
    return !excludes.includes(file);
  });
};

module.exports = {
  findExcludes,
  getOutputs,
};
