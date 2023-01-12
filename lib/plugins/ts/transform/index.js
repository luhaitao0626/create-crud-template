const t = require("@babel/types");
const { default: traverse } = require("@babel/traverse");
const processQuery = require('./processQuery');
const processPagination = require('./processPagination');
const processEntityTyping = require('./processEntityTyping')
const processEntityQueryTyping = require('./processEntityQueryTyping');

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
    },
  });
  return ast;
};

module.exports = transform;
