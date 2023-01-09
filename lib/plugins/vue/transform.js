const transformTemplate = require("./transformTemplate");
const transformScript = require("../ts/transform");
const { getAstByType } = require("./utils");

const transform = (ast, options) => {
  const templateAst = getAstByType(ast, "template");
  transformTemplate(templateAst, options);

  const scriptAst = getAstByType(ast, "script")[0].content[0];
  transformScript(scriptAst, options);

  return ast;
};

module.exports = transform;
