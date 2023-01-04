const ELEMENT = "ELEMENT";
const WHITESPACE = "WHITESPACE";

const { parser } =  require('posthtml-parser')

// const { parse: parseSFC } = require("@vue/compiler-sfc");

/**
 * This parse will return ast of vue sfc file;
 * @param {*} source
 * @returns {*} ast
 */
const parse = (source) => {
  // const ast = parseSFC(source);
  const ast = {};
  const ctx = {};
  let i = 0;
  len = source.length;
  const tokens = [];
  const isTagOpen = false;v 
  while (i < len) {
    const char = source.charAt(i);
    if (char === "<") {
      const token = {
        type: ELEMENT,
        value: "",
      };
      for (i = i + 1; i < len; i++) {
        const char = source.charAt(i);
        if (char != "\s" || char != "\r\n" || char != "\n") {
          token.value += char;
        } else {
          break;
        }
      }
      tokens.push(token);
    }

    if(char === "\s" || char === "\r\n" || char === "\n"){
      const token = {
        type: WHITESPACE,
        value: "",
      };
      for (i = i + 1; i < len; i++) {
        const char = source.charAt(i);
        if (char === "\s" || char === "\r\n" || char === "\n") {
          token.value += char;
        } else {
          break;
        }
      }
      tokens.push(token);
    }

    if(char === '>'){
      
    }
  }

  // template, script each one need to be processed in their own way

  return ast;
};

module.exports = parser;
