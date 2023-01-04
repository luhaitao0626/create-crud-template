const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { getCwd } = require("../utils");
const { isSFC, getFileType } = require("../shared/index");
const { usingEjs } = require("../config");
const strats = require("./strats");

class Compiler {
  constructor(options) {
    this.options = options;
    this.templatePath = options.templatePath;
    // TODO: allow user assign output dir or use cwd;
    // this.output = options.output;
    this.output = getCwd();
    this.files = options.files;
    this.assets = [];
  }
  run() {
    this.beforeCompile();
    this.compile();
    this.afterCompile();
  }
  beforeCompile() {}
  async compile() {
    let promises = [];
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
    await Promise.all(promises);
    this.emit();
  }
  render(templateFilePath, relativePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(templateFilePath, (err, data) => {
        if (err) reject(err);
        const filetype = getFileType(templateFilePath);
        let source = data.toString();
        if (!usingEjs) {
          const code = fs.readFileSync(templateFilePath).toString("utf-8");
          // TODO strats.parse transoform codegen;
          if (isSFC(templateFilePath)) {
            // parse file according to filetype and return ast;
            const ast = strats[filetype].parse(code); 

            // transform ast according to user options and return new ast;
            const _ast = strats[filetype].transform(ast, this.options);

            // generate code according to new ast;
            const content = strats[filetype].codegen(_ast);

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
  afterCompile() {}
  emit() {
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
      // console.log(`Writing ${asset.response} successfully.`);
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
