const t = require("@babel/types");

function processEntityDefination(path, options) {
  const { node } = path;
  if (node.id && node.id.name === "columns") {
    const { fields } = options;
    const nodes = [];
    for (let key in fields) {
      const target = fields[key];
      const targetNode = t.objectExpression([
        t.objectProperty(t.identifier("prop"), t.stringLiteral(key)),
        t.objectProperty(t.identifier("label"), t.stringLiteral(target.label)),
        t.objectProperty(
          t.identifier("editable"),
          t.booleanLiteral(target.editable)
        ),
        t.objectProperty(t.identifier("type"), t.stringLiteral(target.type)),
      ]);
      nodes.push(targetNode);
    }

    const newNode = t.variableDeclarator(
      t.identifier("columns"),
      t.arrayExpression([...nodes])
    );
    path.replaceWith(newNode);
    path.skip();
  }
}

module.exports = processEntityDefination;
