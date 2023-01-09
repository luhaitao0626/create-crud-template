const parserHtml =  require('../html/parser');
const parserJs = require('../ts/parser');
const { getScriptNode } = require('./utils');

// parse .vue sfc
function parser(code){
  const ast = parserHtml(code);
  /**
   * parserHtml returns an AST of .vue file. However this ast is not completely transformed yet.
   * Template is parsed in to ast form, while <scritp> is still in the form of string.
   * Therefore, further parsing of script is needed.
   * */ 
  let scriptNode = getScriptNode(ast);
  let script = scriptNode.content[0];
  const scriptAst = parserJs(script, {
    sourceType:'module',
  });
  scriptNode.content[0] = scriptAst;
  return ast;
}

module.exports = parser;
