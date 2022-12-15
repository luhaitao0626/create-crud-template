const fs = require('fs');
const path = require('path');
const { getCwd } = require('./utils');

const cwd = getCwd();
const defaultConfigPath = path.resolve(__dirname, "default.config.js");

const init = (name)=>{
    let config = fs.readFileSync(defaultConfigPath);
    const filename = name? `${name}.config.js` : 'default.config.js';
    const configOutputPath = path.join(cwd, filename);
    fs.writeFileSync(configOutputPath, config, "utf-8");
}

module.exports = init;