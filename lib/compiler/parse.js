const strats = require("./strats");
const getFileType = require('../shared/index');

const parse = (request, source) => {
  const type = getFileType(request);
  const parser = strats[type];
  const ast = parser(source);
  // console.log(ast);
};

module.exports = parse;
