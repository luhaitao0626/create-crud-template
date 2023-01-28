const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const Inquirer = require("inquirer");
const { getCwd, isDirectory, removeDir } = require("../utils");
const { getFileType, getFileName } = require("../shared/index");
const { usingEjs } = require("../config");
const Strats = require("./strats");
const ElementPlusTablePlugin = require('../plugins/@webcrud/element-plus-table-plugin')

class Compiler {
  constructor(options) {
    this.options = options;
    this.entity = this.options.entity;
    this.templateDir = options.templateDir;
    // TODO: allow user assign output dir or use cwd;
    // this.output = options.output;
    this.cwd = getCwd();
    this.output = path.resolve(this.cwd, this.entity);
    this.files = options.files;
    this.assets = [];
    // TODO strats will be removed if plugin structure finished
    // strats is created by plugin
    this.strats = new Strats();
    this.plugins = new Map();
    // inner plugin ElementPlusTablePlugin
    this.use(new ElementPlusTablePlugin());
  }
  use(plugin) {
    console.log('installing ElementPlusTablePlugin');
    if (this.plugins[plugin.name]) return console.log(`${plugin.name} has been installed`);
    this.plugins.set(plugin.name, plugin);
    plugin.install(this);
  }
  async run() {
    const pleasant = await this.checkOutputEnvGentally();
    if (!pleasant) return;
    await this.beforeCompile();
    await this.compile();
    await this.afterCompile();
    this.emit()
  }
  /**
     * output path environment check
     * check whether cwd has a folder named 'entity'
     * no? create an 'entity' named folder
     * yes? ask user whether to remove its content and emit files in the empty folder
     */
  // check: folder already exists, then stop
  async checkOutputEnvGentally() {
    const outPath = path.resolve(this.cwd, this.entity);
    // if this folder already exists
    if (isDirectory(outPath)) {
      console.warn(
        `[WARNING]: There already exists a folder named ${this.entity} in cwd. Output process exterminated`
      );
      return false;
    } else {
      // there's no directory named this.entity then make a directory
      fs.mkdirSync(outPath);
      return true;
    }
  }
  // check: folder already exists, then ask user to decide whether to overwite or not.
  // TODO
  async checkOutputEnvViolantly() {
    const outPath = path.resolve(this.cwd, this.entity);
    if (isDirectory(outPath)) {
      // if there has a directory that has the same name with this.entity
      // ask user whether to clear contents in this dir and emit file in it
      let userChoice = await Inquirer.prompt({
        name: "config",
        type: "list",
        choices: ["yes", "no"],
        message: `[Critical Warning]: There already has a directory named ${this.entity}. Do you want to overwrite it?`,
      });
      // let userChoice = "accept"
      if (userChoice === "yes") {
        // TODO remove the entity folder and its content entirely
        removeDir(outPath);
        // re make the entity dir
        fs.mkdirSync(outPath);
        return true;
      } else {
        return false;
      }
    } else {
      // there's no directory named this.entity then make a directory
      fs.mkdirSync(outPath);
      return true;
    }
  }
  async beforeCompile() {
    console.log(`Creating CRUD template successfully.`);
  }
  async compile() {
    let promises = [];
    // files that will be emitted
    console.log(`templateDir`, this.options.templateDir)
    console.log(`this.files,`, this.files);
    this.files.forEach((relativePath) => {
      const templateFilePath = path.resolve(
        this.templateDir,
        relativePath
      );
      let p = this.render(templateFilePath, relativePath);
      promises.push(p);
    });
    // parallel emit files
    await Promise.all(promises).catch((err) => {
      console.error('render failed')
      throw Error(err);
    });
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
          // check whether strats has strats[filetype] processor
          if (this.strats[filetype]) {
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
            reject(`processor for ${filetype} file is not installed.`);
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
  async afterCompile() {}
  async emit() {
    this.assets.forEach((asset) => {
      this.emitFile(asset);
    });
  }
  emitFile(asset) {
    const paths = asset.relativePath.split("/");
    const filename = paths.pop();
    paths.forEach((_path) => {
      _path = path.resolve(this.output, _path);
      try {
        let stat = fs.statSync(_path);
      } catch (error) {
        fs.mkdirSync(_path);
      }
    });
    fs.writeFile(asset.response, asset.content, (err) => {
      if (err) throw new Error(err);
    });
  }
}

module.exports = Compiler;
