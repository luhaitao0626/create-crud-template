const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const { getCwd, isDirectory, isFile } = require("../utils");
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
    this.compile();
  }
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
    await Promise.all(promises);
    this.emit();
  }
  render(templateFilePath, relativePath) {
    return new Promise((resolve, reject) => {
      fs.readFile(templateFilePath, (err, data) => {
        if (err) reject(err);
        let template = data.toString();
        let content = ejs.render(template, this.options);
        const response = path.join(this.output, relativePath);
        let assetObj = {
          dist: this.output,
          response,
          relativePath,
          content,
        };
        this.assets.push(assetObj);
        resolve();
      });
    });
  }
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
      console.log(`${asset.response} 写入成功111`);
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
