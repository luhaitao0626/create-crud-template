const codegenTemplate = require("../html/codegen");
const codegenScript = require("../ts/codegen");
const { getAstByType } = require("./utils");


const codegen = (ast) => {
  // 1. generate script ast into string and update "script" node in ast of .vue;
  const scriptAst = getAstByType(ast, "script")[0].content;
  const { code } = codegenScript(scriptAst[0], {}, "");
  scriptAst[0] = "\r\n" + code + "\r\n";

  // 2. generate code into .vue file
  const _code = codegenTemplate(ast);
  
  return _code;
};

module.exports = codegen;
