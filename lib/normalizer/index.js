const path = require("path");
const { usingEjs } = require("../config");
const allFiles = require("../fileList");

// 根据要类型获取template目录
function getFolder(type) {
  if (type === "element-plus") {
    return path.resolve(
      __dirname,
      "../template",
      type + (usingEjs ? "-ejs" : "")
    );
  } else {
    throw Error(`${type}-crud-template is not available at present`);
  }
}

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

const getOutputs = (excludes, fileList) => {
  return fileList.filter((file) => {
    return !excludes.includes(file);
  });
};

const getFieldNames = (fieldsObj) => {
  return Object.getOwnPropertyNames(fieldsObj);
};

const getInitialEntity = (entityName) => {
  return (
    entityName.slice(0, 1).toUpperCase() + entityName.slice(1).toLowerCase()
  );
};

const isHasQuery = (queryFields) => {
  return queryFields && queryFields.length > 0;
};

let normalizer = function (config) {
  const templatePath = getFolder(config.type);
  const hasQuery = isHasQuery(config.queryFields);
  config.hasQuery = hasQuery;
  const excludes = findExcludes(config); // 找到不需要输出的文件
  const files = getOutputs(excludes, allFiles); // 筛选出要输出的文件列表
  const fieldNames = getFieldNames(config.fields);
  const entityInitial = getInitialEntity(config.entity);
  const ctx = {
    ...config,
    templatePath,
    excludes,
    files,
    fieldNames,
    entityInitial,
    hasQuery,
  };
  // console.log(ctx);
  return ctx;
};

module.exports = normalizer;
