const parser = require('./parser');
const transform = require('./transform');
const codegen = require('./codegen');


module.exports = {
    name: '.vue',
    parser,
    transform,
    codegen,
}