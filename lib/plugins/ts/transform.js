const t = require("@babel/types");
const { default: traverse } = require("@babel/traverse");

const processQuery = (path, options) => {
  const { node } = path;
  // if user has no need for query, then remove path;
  if (
    node &&
    node.source &&
    node.source.value === "./query" &&
    !options.hasQuery
  ) {
    path.remove();
  }
};

const processPagination = (path, options) => {
  const { node } = path;
  if (
    node &&
    node.source &&
    node.source.value === "./pagination" &&
    !options.hasPagination
  ) {
    path.remove();
  }
};

// process ./typings/entity.ts file ast
function processEntityTyping(path, options) {
  let { node } = path;
  if (node && node.id.name === "IEntity") {
    const { fields } = options;
    const propertyNodes = [];
    for (let key in fields) {
      let value = fields[key].prop.name.toLowerCase();
      let type;
      if(value === 'string'){
        type = t.tsStringKeyword()
      }else{// TODO: generate ts[xxx]Keyword according to value
        type = t.tsStringKeyword()
      }
      const node = t.tSPropertySignature(
        t.identifier(key),
        t.tSTypeAnnotation(type)
      );
      propertyNodes.push(node);
    }
    const newNode = t.tSInterfaceDeclaration(
      t.identifier("IEntity"),
      null,
      null,
      t.tSInterfaceBody(propertyNodes)
    );
    path.replaceWith(newNode);
    path.stop();
  }
}

function processEntityQueryTyping(path, options) {}

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
