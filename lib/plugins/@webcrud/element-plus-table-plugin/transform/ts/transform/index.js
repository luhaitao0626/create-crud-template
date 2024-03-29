const { default: traverse } = require("@babel/traverse");
const processQuery = require("./processQuery");
const processPagination = require("./processPagination");
const processEntityTyping = require("./processEntityTyping");
const processEntityQueryTyping = require("./processEntityQueryTyping");
const processEntityDefination = require("./processEntityDefination");
const processMockData = require("./processMockData");
const processCreateNewData = require("./processCreateNewData");
/**
 * This parse will return ast of vue sfc file;
 * @param {*} source
 * @returns {*} ast
 */
const transform = (ast, options) => {
  traverse(ast, {
    ImportDeclaration(path) {
      processQuery(path, options);
      processPagination(path, options);
    },
    // ExportNamedDeclaration(path) {
    //   processEntityTyping(path, options);
    //   processEntityQueryTyping(path, options);
    // },
    TSInterfaceDeclaration(path) {
      processEntityTyping(path, options);
      processEntityQueryTyping(path, options);
    },
    CallExpression(path) {
      processPagination(path, options);
      processQuery(path, options);
    },
    AssignmentExpression(path) {
      processPagination(path, options);
    },
    VariableDeclarator(path) {
      processEntityDefination(path, options);
      processQuery(path, options);
      processPagination(path, options)
      processMockData(path, options)
      processCreateNewData(path, options)
    },
    IfStatement(path){
      processQuery(path,options)
    }
  });
  return ast;
};

module.exports = transform;
