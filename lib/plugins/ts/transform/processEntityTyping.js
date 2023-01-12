const t = require("@babel/types");

// process ./typings/entity.ts file ast
function processEntityTyping(path, options) {
  let { node } = path;
  if (node && node.id.name === "IEntity") {
    const { fields } = options;
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

module.exports = processEntityTyping;
