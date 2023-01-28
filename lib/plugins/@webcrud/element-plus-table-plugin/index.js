const fileList = require("./fileList");
const path = require("path");
const vueProcessor = require("./transform/vue");
const { getOutputs } = require("./util");
// const htmlProcessor = require("./transform/html");
const tsProcessor = require("./transform/ts");

const processors = [vueProcessor, tsProcessor];

class ElementPlusTablePlugin {
  constructor() {
    this.name = "ElementPlusTablePlugin";
    this.templateDir = path.resolve(__dirname, "template");
    this.files = fileList;
    // 从入口文件的绝对路径开始解析dependency
    this.entryPath = path.resolve(this.templateDir, "./index.vue");
    // 创建rootModule
    // this.rootModule = new Module(entryPath, true); // rootModule
    // 根据rootModule递归分析依赖
    // this.parseModule(this.rootModule);
    this.processors = processors;
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
  installProcessorsOnCompiler(compiler) {
    this.processors.forEach((processor) => {
      compiler.strats.installProcessor(processor);
    });
  }
  processCompiler(compiler) {
    const { options } = compiler;
    compiler.templateDir = this.templateDir;
    compiler.files = getOutputs(options, this.files); // 筛选出要输出的文件列表
  }
  install(compiler) {
    this.installProcessorsOnCompiler(compiler);
    this.processCompiler(compiler);
  }
}

module.exports = ElementPlusTablePlugin;
