const path = require("path");
const { usingEjs } = require("../config");
const allFiles = require("../fileList");
const processQuery = require("../plugins/ts/transform/processQuery");

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

// TODO: check queryFields and fields, make sure queryFeilds's are in fields

const getFieldNames = (fieldsObj) => {
  return Object.getOwnPropertyNames(fieldsObj);
};

const getInitialEntity = (entityName) => {
  return (
    entityName.slice(0, 1).toUpperCase() + entityName.slice(1).toLowerCase()
  );
};

// const isHasQuery = (queryFields) => {
//   return queryFields && queryFields.length > 0;
// };

const getQueryFields = (fields) => {
  const queryFeilds = [];
  for (let key in fields) {
    if(key === "id") continue;
    const fieldObj = fields[key];
    if (fieldObj.query) {
      queryFeilds.push(key)
    }
  }
  return queryFeilds
}

let normalizer = function (config) {
  const templatePath = getFolder(config.type);
  config.queryFields = getQueryFields(config.fields);
  (config.queryFields.length === 0) ? (config.hasQuery = false) : (config.hasQuery = true);
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
  };
  return ctx;
};

module.exports = normalizer;
