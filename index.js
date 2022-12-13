const { program } = require("commander");
const path = require("path");
const cwd = process.cwd();
const target = path.join(cwd, "dist");
const defaultConfigPath = path.resolve("default.config.js");
const defaultConfigOutputPath = path.join(target, "aaa.config.js");
const fs = require("fs");
const { getConfigFiles } = require("./src/utils/index");
const creator = require("./src");
program
  .name("create-crud-template")
  .description("CLI to create crud template")
  .version("0.0.1");

program
  .command("init")
  .description("pull default.config.js into cwd for user to customize options")
  // .argument('<string>','assign name for entity')
  .option("--name", "assign name for entity")
  .action((str, options) => {
    console.log(options.name);
    let config = fs.readFileSync(defaultConfigPath);
    fs.writeFileSync(defaultConfigOutputPath, config, "utf-8");
  });


program
  .command("create")
  .description(
    "create template by [entity].config.js. If there is no .config.js in cwd then cli will use default config.js to create template!"
  )
  .action((str, options) => {
    // 1.找到当前目录下的.config.js
    let files = getConfigFiles(cwd);
    console.log(files);
    
    // 2. 指定config.js
    let configPath;
    if(files.length === 0){ // 没有config.js
        configPath = cwd; // 设为空，后面会使用default.config.js
    }else if(files.length === 1){//  如果只有一个config.js文件就将其作为config
        configPath = path.resolve(cwd,files[0]);
    }else{//如果有多个，让用户选择指定一个作为config，
        configPath = path.resolve(cwd,files[0]);
    }

    // 3.cli(options)生成compiler
    let compiler = creator(configPath);
    // 4.compiler.run(cb)
    compiler.run(()=>{

    })
    // 5. 选择输出到当前目录下或者是当前目录/entityName下
    
    // 6.cb中输出文件

    // 
  });

  program.parse();
