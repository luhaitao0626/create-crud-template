const fs = require('fs');
const path = require('path');
const { getCwd } = require('./utils');

const defaultConfigFilename = "default.config.cjs";
const cwd = getCwd();
const defaultConfigPath = path.resolve(__dirname, defaultConfigFilename);

const init = (name) => {
    let config = fs.readFileSync(defaultConfigPath);
    const filename = name ? `${name}.config.cjs` : defaultConfigFilename;
    const configOutputPath = path.join(cwd, filename);
    fs.writeFileSync(configOutputPath, config, "utf-8");
}

module.exports = init;