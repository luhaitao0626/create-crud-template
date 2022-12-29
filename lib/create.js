const path = require("path");
const Inquirer = require("inquirer");
const Compiler = require("./compiler");
const normallizer = require("./normalizer");
const { getConfigFiles } = require("../lib/utils/index");
const { getCwd } = require("./utils");

const cwd = getCwd();

const getConigFilePath = async (files) => {
  let configPath = null;
  if (files.length === 0) {
    // if there is no config.js
    configPath = null; // set null，compiler will use default.config.js afterwards
    console.log(
      "Because there is no config.js in current working directory, it assumes you are using default.config to create Entity"
    );
  } else if (files.length === 1) {
    // There is only one config.js, use it as config
    configPath = path.resolve(cwd, files[0]);
  } else {
    // There are multiple config.js files, offer user options to select
    let file = await Inquirer.prompt({
      name: "config",
      type: "list",
      choices: files,
      message: "please choose a config file",
    });
    configPath = path.resolve(cwd, file.config);
  }

  return configPath;
}

const getConfig = (configPath) => {
  let config;
  configPath
    ? (config = require(configPath))
    : (config = require(path.resolve(__dirname, "../default.config")));
  return config;
}

async function create() {
  // 1.find [entity].config.js files in cwd;
  let files = getConfigFiles(cwd);

  // 2. user assign a config.js
  const configPath = await getConigFilePath(files);

  // 3. getConfig through configPath
  const config = getConfig(configPath);

  // 4.normalize options
  let options = normallizer(config);

  // 5.create a compiler with options
  let compiler = new Compiler(options);

  // 6.compiler.run(cb)
  //  选择输出到当前目录下或者是当前目录/entityName下
  //  cb中输出文件
  compiler.run();
}

module.exports = create;
