const Compiler = require("./compiler");
const normallizer = require("./normalizer");

function creator(configPath){
    let config;
    if(!configPath){
        config = require(path.resolve(__dirname,'../default.config'));;
    }else{
        config = require(configPath);
    }
    let options = normallizer(config);
    let compiler = new Compiler(options);
    return compiler;
}

module.exports = creator;