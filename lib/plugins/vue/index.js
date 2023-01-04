const parse = require('./parse');
const transform = require('./transform');
const codegen = require('./codegen');


module.exports = {
    name: '.vue',
    parse,
    transform,
    codegen,
}