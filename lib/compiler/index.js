const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const Inquirer = require("inquirer");
const { getCwd, isDirectory, removeDir } = require("../utils");
const { isSFC, getFileType, getFileName } = require("../shared/index");
const { usingEjs } = require("../config");
const strats = require("./strats");
const { checkPrime } = require("crypto");

class Compiler {
  constructor(options) {
    this.options = options;
    this.entity = this.options.entity;
    this.templatePath = options.templatePath;
    // TODO: allow user assign output dir or use cwd;
    // this.output = options.output;
    this.cwd = getCwd();
    this.output = path.resolve(this.cwd, this.entity);
    this.files = options.files;
    this.assets = [];
    this.strats = strats;
  }
  run() {
    this.beforeCompile();
    this.compile();
    this.afterCompile();
  }
  beforeCompile() { }
  async compile() {
    let promises = [];

    // files that will be emitted
    this.files.forEach((relativePath) => {
      const templateFilePath = path.resolve(
        __dirname,
        this.templatePath,
        relativePath
      );
      let p = this.render(templateFilePath, relativePath);
      promises.push(p);
    });
    // parallel emit files
    await Promise.all(promises).catch((err) => {
      throw Error(err);
    });

    const isPleasant = await this.checkOutputEnv();
    isPleasant && this.emit();
  }
  afterCompile() { }
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
          if (valid) { // plugin is installed
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
  async checkOutputEnv(){
    const outPath = path.resolve(this.cwd, this.entity);
    if (isDirectory(outPath)) { // if there has a directory that has the same name with this.entity
      // ask user whether to clear contents in this dir and emit file in it
      let userChoice = await Inquirer.prompt({
        name: "config",
        type: "list",
        choices: [
          "yes",
          "no"
        ],
        message: `[Critical Warning]: There already has a directory named ${this.entity}. Do you want to overwrite it?`,
      });
      // let userChoice = "accept"
      if (userChoice === "accept") { 
        // TODO remove the entity folder and its content entirely
        removeDir(outPath);
        // re make the entity dir
        fs.mkdirSync(outPath);
        return true
      } else {
        return false
      }
    } else {// there's no directory named this.entity then make a directory
      fs.mkdirSync(outPath);
      return true;
    }
  }
  async emit() {
    this.assets.forEach((asset) => {
      this.emitFile(asset);
    });
    
  }
  emitFile(asset) {
    /**
     * output path environment check
     * check whether cwd has a folder named 'entity'
     * no? create an 'entity' named folder
     * yes? ask user whether to remove its content and emit files in the empty folder
     */
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

function writeFile(path, content, callback) {
  fs.writeFile(path, content, (err) => {
    if (err) {
      throw Error(err);
    }
  });
}

module.exports = Compiler;
