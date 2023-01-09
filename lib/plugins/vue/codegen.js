const codegenTemplate = require("./codegenTemplate");
const { getAstByType } = require("./utils");
const { default: generate } = require("@babel/generator");

const codegen = (ast) => {
  // 1. generate script ast into string and update "script" node in ast of .vue;
  debugger;
  const scriptAst = getAstByType(ast, "script")[0].content;
  const { code } = generate(scriptAst[0], {}, "");
  scriptAst[0] = code;

  debugger
  console.log(ast);

  const _code = codegenTemplate(ast);
  // 2. generate code in to .vue file
  return _code;
};

module.exports = codegen;
