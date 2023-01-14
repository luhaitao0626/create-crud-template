const t = require("@babel/types");

function findQueryFields(options) {
  const { queryFields, fields } = options;
  const res = {};
  queryFields.forEach((query) => {
    fields[query] && (res[query] = fields[query]);
  });
  return res;
}

// TODO: query must use selected ts type {name?: string}
function processEntityQueryTyping(path, options) {
  let { node } = path;
  const {filename} = options;
  if (
    node && 
    node.id.name === "IEntityQuery"
  ) {
    const fields = findQueryFields(options);
    const propertyNodes = [];
    for (let key in fields) {
      let value = fields[key].prop.name.toLowerCase();
      let type;
      if (value === "string") {
        type = t.tsStringKeyword();
      } else {
        // TODO: generate ts[xxx]Keyword according to value
        type = t.tsStringKeyword();
      }
      const node = t.tSPropertySignature(
        t.identifier(key),
        t.tSTypeAnnotation(type)
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
