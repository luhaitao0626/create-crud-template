const t = require("@babel/types");

// ./typings/entity.ts
function processEntityTyping(path, options) {
  const { filename } = options;
  let { node } = path;
  if (
    filename.includes('entity.ts') &&
    node && node.id.name === "IEntity"
  ) {
    const { fields } = options;
    const propertyNodes = [];
    for (let key in fields) {
      const value = fields[key];
      const propType = fields[key].prop.name.toLowerCase();
      const isRequired = value.required;
      let typeNode;
      // generate interface object's keyword according to propType
      // `interface IEntity { [key]: type{string, number, object...}}`
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
      // whether property is optional depends on isRequired
      node.optional = Boolean(!isRequired);
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
