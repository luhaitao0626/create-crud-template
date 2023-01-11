const parser = require("./parser");
const transform = require("./transform");
const codegen = require("./codegen");

const process = (code, options) => {
  // get AST from code string.
  const ast = parser(code, {
    sourceType: "module",
    plugins: ["typescript"],
  });

  // transform ast according to user options and return new ast;
  const _ast = transform(ast, options);

  // generate code according to new ast;
  const content = codegen(_ast).code;

  // return final content;
  return content;
};

module.exports = {
  name: ".ts",
  process,
};