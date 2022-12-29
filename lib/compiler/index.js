const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { getCwd, isDirectory, isFile } = require("../utils");
const { isSFC, getFileType } = require("../shared/index");
const parse = require("./parse");

const usingEJS = true;

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
        let source = data.toString();

        const filetype = getFileType(templateFilePath);
        console.log(`filetype: ${filetype}`);
        // TODO：not Using Ejs, but using ast
        if (!usingEJS) {
          if (isSFC(templateFilePath)) {
            console.log(`compile .vue file now: ${templateFilePath}`);
            const ast = parse(templateFilePath, source);

            const $ast = transform(ast, this.options);

            source = codegen($ast);
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
    console.log("写入成功");
  });
}

module.exports = Compiler;
