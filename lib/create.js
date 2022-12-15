const path = require("path");
const Inquirer = require("inquirer");
const Compiler = require("./compiler");
const normallizer = require("./normalizer");
const { getConfigFiles } = require("../src/utils/index");

async function create(configPath) {
  // 1.找到当前目录下的.config.js
  let files = getConfigFiles(cwd);
  //   console.log(files);

  // 2. 指定config.js
  let configPath;
  if (files.length === 0) {
    // 没有config.js
    configPath = cwd; // 设为空，后面会使用default.config.js
  } else if (files.length === 1) {
    //  如果只有一个config.js文件就将其作为config
    configPath = path.resolve(cwd, files[0]);
  } else {
    //如果有多个，让用户选择指定一个作为config，
    let file = await Inquirer.prompt({
      name: "config",
      type: "list",
      choices: files,
      message: "please choose a config file",
    });
    configPath = path.resolve(cwd, file.config);
  }

  // 3.cli(options)生成compiler
  if (!configPath) {
    config = require(path.resolve(__dirname, "../default.config"));
  } else {
    config = require(configPath);
  }
  let options = normallizer(config);
  let compiler = new Compiler(options);
  compiler;

  // 4.compiler.run(cb)
  compiler.run();
  // 5. 选择输出到当前目录下或者是当前目录/entityName下

  // 6.cb中输出文件

  //
}

module.exports = create;
