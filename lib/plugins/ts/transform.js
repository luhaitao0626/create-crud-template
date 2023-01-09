const t = require("@babel/types");
const { default: traverse } = require("@babel/traverse");

const processQuery = (path, options) => {
  const { node } = path;
  // if user has no need for query, then remove path;
  if (node && node.source &&  node.source.value === "./query" && !options.hasQuery) {
    path.remove();
  }
};

const processPagination = ( path, options) => {
  const {node} = path;
  if(node && node.source && node.source.value === './pagination' && !options.hasPagination){
    path.remove();
  }
}

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
  });
};

module.exports = transform