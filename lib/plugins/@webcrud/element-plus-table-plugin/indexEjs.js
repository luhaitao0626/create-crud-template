const fileList = require("./fileList");
const path = require("path");
const fs = require("fs");
const { Module } = require("module");

class ElementPlusTablePlugin {
  constructor() {
    this.name = "ElementPlusTablePlugin";
    this.templateDir = path.resolve(__dirname, "template");
    this.files = fileList;
    // 从入口文件的绝对路径开始解析dependency
    this.entryPath = path.resolve(templateDir, "./index.vue");
    // 创建rootModule
    // this.rootModule = new Module(entryPath, true); // rootModule
    // 根据rootModule递归分析依赖
    // this.parseModule(this.rootModule);
  }
  parseModule(module) {
    // 根据filetype开始解析
    switch (module.filetype) {
      case "vue":
        this.parseVueModule(module);
        break;
      case "ts":
      case "js":
      case "tsx":
      case "jsx":
        this.parseDeps(module);
        break;
      default:
        break;
    }
  }
  parseVueModule(module) {
    // 1.分析ast  import创建新的 module
    const source = module.source;
    const ast = getAst(source);
    function traverse(ast) {
      const modules = [];
      // 1. 找到import语句找到模块并创建新的module
      // const module = new Module()
      modules.push(module);
      // TODO
      return modules;
    }
    // 2.将这些module放到当前module.deps中
    module.deps = traverse(ast);
    // 3.遍历deps的modules并递归创建依赖
    for (let i = 0; i < module.deps.length; i++) {
      const dep = module.deps[i];
      parseModule(dep);
    }
    return deps;
  }
  createDep(filepath) {
    const filetype = getFileType(filepath);

    // 1.分析ast  import创建新的 module
    // 2.将这些module放到当前module.deps中
    const deps = parseDeps(filetype, source);
    if (deps.length > 0) {
      deps.forEach((dep) => {
        this.createDep(dep.filepath);
      });
    }
    return deps;
  }
  async compile() {
    let promises = [];
    // files that will be emitted
    this.files.forEach((relativePath) => {
      const templateFilePath = path.resolve(
        __dirname,
        this.templateDir,
        relativePath
      );
      let p = this.render(templateFilePath, relativePath);
      promises.push(p);
    });
    // parallel emit files
    await Promise.all(promises).catch((err) => {
      throw Error(err);
    });
    this.emit();
  }
  render(templateFilePath, relativePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(templateFilePath, (err, data) => {
        if (err) reject(err);
        let source = data.toString();
        // const code = fs.readFileSync(templateFilePath).toString("utf-8");
        const filetype = getFileType(templateFilePath);
        const filename = getFileName(templateFilePath);
        this.options.filename = filename;
        if (!usingEjs) {
          // parse => transoform => codegen => new code;
          // check whether strats has strats[filetype] plugin
          const valid = this.strats.isPluginInstalled(filetype);
          if (valid) {
            // plugin is installed
            // get new content from original source code accroding to options
            const content = this.strats[filetype].process(source, this.options);

            // output file path
            const response = path.join(this.output, relativePath);
            let assetObj = {
              dist: this.output, // output dir
              response,
              relativePath,
              content,
            };
            this.assets.push(assetObj);
            resolve();
          } else {
            reject(`plugin for ${filetype} file is not installed.`);
          }
          // }
        } else {
          // Using which way to create template?  ejs or ast?
          let content = ejs.render(source, this.options);
          const response = path.join(this.output, relativePath);
          let assetObj = {
            dist: this.output, // output dir
            response,
            relativePath,
            content,
          };
          this.assets.push(assetObj);
          resolve();
        }
      });
    });
  }
  install(compiler) {
    // Here, 'this' is plugin instance
    // this will overwrite compiler.compile
    compiler.compile = this.compile;
    this.options = compiler.options;
  }
}

module.exports = ElementPlusTablePlugin;
