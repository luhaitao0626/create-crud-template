const t = require("@babel/types");

function findQueryFields(options) {
  const { queryFields, fields } = options;
  const res = {};
  queryFields.forEach((query) => {
    fields[query] && (res[query] = fields[query]);
  });
  return res;
}

// ./typings/entityQuery.ts
// TODO: query must use selected ts type {name?: string}
function processEntityQueryTyping(path, options) {
  const { filename } = options;
  let { node } = path;
  if (
    filename.includes('entityQuery.ts') &&
    node && node.id.name === "IEntityQuery"
  ) {
    const fields = findQueryFields(options);
    const propertyNodes = [];
    for (let key in fields) {
      const value = fields[key];
      const propType = value.prop.name.toLowerCase()
      let typeNode;
      // generate interface object's keyword according to propType
      // `interface IEntityQuery { [key]: type{string, number, object...}}`
      // in addition, after create typeNode, this query node must be set as optional
      switch (propType) {
        case "string":
          typeNode = t.tsStringKeyword();
          break;
        case "number":
          typeNode = t.tsNumberKeyword();
          break;
        case "boolean":
          typeNode = t.tsBooleanKeyword();
          break;
        default:
          typeNode = t.tsStringKeyword();
          break;
      }
      const node = t.tSPropertySignature(
        t.identifier(key),
        t.tSTypeAnnotation(typeNode)
      );
      // query property must be optional
      node.optional = true;
      propertyNodes.push(node);
    }
    const newNode = t.tSInterfaceDeclaration(
      t.identifier("IEntityQuery"),
      null,
      null,
      t.tSInterfaceBody(propertyNodes)
    );
    path.replaceWith(newNode);
    path.skip();
  }
}

module.exports = processEntityQueryTyping;
