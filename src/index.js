const config = require("../crud.config");
const Compiler = require("./compiler");
const normallizer = require("./normalizer");
debugger

let options = normallizer(config);
let compiler = new Compiler(options);
compiler.run();
// let template = createTemplate(options);
