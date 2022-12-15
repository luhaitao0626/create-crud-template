const fs = require('fs');
const path = require('path');

const cwd = process.cwd();
const target = path.join(cwd, "dist");

const defaultConfigPath = path.resolve("default.config.js");
const defaultConfigOutputPath = path.join(target, "xxx.config.js");


const init = ()=>{
    let config = fs.readFileSync(defaultConfigPath);
    fs.writeFileSync(defaultConfigOutputPath, config, "utf-8");
}

module.exports = init;