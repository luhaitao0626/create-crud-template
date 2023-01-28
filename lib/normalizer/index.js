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


// TODO: check queryFields and fields, make sure queryFeilds's are in fields

const getFieldNames = (fieldsObj) => {
  return Object.getOwnPropertyNames(fieldsObj);
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
  config.queryFields = getQueryFields(config.fields);
  (config.queryFields.length === 0) ? (config.hasQuery = false) : (config.hasQuery = true);
  const fieldNames = getFieldNames(config.fields);
  const ctx = {
    ...config,
    templateDir:"",
    files:[],
    fieldNames,
  };
  return ctx;
};

module.exports = normalizer;
