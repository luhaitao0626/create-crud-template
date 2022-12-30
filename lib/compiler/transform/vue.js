/**
 * This parse will return ast of vue sfc file;
 * @param {*} source
 * @returns
 */

const parse = (ast, options) => {
  const {
    descriptor: { template },
    scriptSetup,
  } = ast;
  console.log(template);
  console.log(scriptSetup);
  return ast;
};

module.exports = parse;
