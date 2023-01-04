const strats = {
  parse: {},
  transform: {},
  codegen: {},
};
strats.parse[".vue"] = function (code) {
  const parse = require("./parse/vue");
  return parse(code);
};
strats.parse[".ts"] = function (code) {};
strats.parse[".js"] = function (code) {};
strats.parse[".tsx"] = function (code) {};
strats.parse[".jsx"] = function (code) {};

// transform
strats.transform[".vue"] = function (ast, options) {
  const transform = require("./transform/vue");
  return transform(ast, options);
};
strats.transform[".ts"] = function (code) {};
strats.transform[".js"] = function (code) {};
strats.transform[".tsx"] = function (code) {};
strats.transform[".jsx"] = function (code) {};

// codegen
strats.codegen[".vue"] = function (ast) {
  const codegen = require("./codegen/vue.js");
  code = codegen(ast);
  return code;
};
strats.codegen[".ts"] = function (code) {
  
};
strats.codegen[".js"] = function (code) {};
strats.codegen[".tsx"] = function (code) {};
strats.codegen[".jsx"] = function (code) {};

module.exports = strats;
