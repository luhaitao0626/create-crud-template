const t = require("@babel/types");

// process ./typings/entity.ts file ast
function processEntityTyping(path, options) {
  const { filename } = options;
  let { node } = path;
  if (
    options.hasQuery &&
    filename.includes('./typings/entity.ts') &&
    node && node.id.name === "IEntity"
  ) {
    debugger;
    // TODO: generate optional property for interface: `name? : 'string'`
    const { fields } = options;
    const propertyNodes = [];
    for (let key in fields) {
      value = fields[key]
      let propType = fields[key].prop.name.toLowerCase();
      let typeNode;
      if (propType === "string") {
        typeNode = t.tsStringKeyword();
      } else {
        // TODO: generate ts[xxx]Keyword according to value
        typeNode = t.tsStringKeyword();
      }
      const node = t.tSPropertySignature(
        t.identifier(key),
        t.tSTypeAnnotation(typeNode)
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
    path.skip();
  }
}

module.exports = processEntityTyping;
