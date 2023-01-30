const path = require("path");
const Inquirer = require("inquirer");
const Compiler = require("./compiler");
const normalizer = require("./normalizer");
const { getConfigFiles } = require("../lib/utils/index");
const { getCwd } = require("./utils");


const cwd = getCwd();

const getConigFilePath = async (files) => {
  if (!files) return null;
  let configPath = null;
  if (files.length === 0) {
    // if there is no config.js
    configPath = null; // set null，compiler will use default.config.cjs afterwards
    console.warn(
      "INFO: Because there is no [entity].config.cjs in current working directory, it is assumed you are using default.config to create Entity"
    );
  } else if (files.length === 1) {
    // There is only one config.js, use it as config
    configPath = path.resolve(cwd, files[0]);
  } else {
    // There are multiple config.cjs files, offer user options to select
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

const validateConfigFilePath = (configPath) => {
  const arr = configPath.split('.');
  if(arr.length === 3 && arr[0] != ''){
    return true
  }else{
    return false
  }
}

const getConfig = (configPath) => {
  let config;
  configPath
    ? (config = require(configPath))
    : (config = require(path.resolve(__dirname, "./default.config.cjs")));
  return config;
}

async function create() {
  // 1.find [entity].config.cjs files in cwd;
  let files = getConfigFiles(cwd);

  if(files.length === 0) return console.warn(`please use command: "webcrud-cli init <entity>" to create a config file before create files`) 

  // 2. user assign a [entity].config.cjs
  // TODO validate configPath   /[entity].config.cjs/ 
  const configPath = await getConigFilePath(files);

  const configFileName = path.relative(cwd, configPath);

  // 3. resolve entityName from config file path and append entity in config object
  const entity = configFileName.split('.')[0];

  // 4. getConfig through configPath
  const config = getConfig(configPath);
  config.entity = entity;

  // 5.normalize options
  let options = normalizer(config);

  // 6.create a compiler with options
  let compiler = new Compiler(options);

  // console.log(compiler)
  // 7.compiler.run(cb)
  //  选择输出到当前目录下或者是当前目录/entityName下
  //  cb中输出文件
  compiler.run();
}

module.exports = create;
