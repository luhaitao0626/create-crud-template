const { parser: parserHtml } =  require('posthtml-parser');
const parserJs = require('../ts/parser');
const { getScriptNode } = require('./utils');

// TODO：parse Template and ts
function parser(code){
  const ast = parserHtml(code);
  /**
   * parserHtml returns an AST of .vue file. However this ast is not complete yet.
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
