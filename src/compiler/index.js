const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

class Compiler {
  constructor(options) {
    this.options = options;
    this.templatePath = options.templatePath;
    this.output = options.output;
    this.files = options.files;
  }
  compile() {
    this.files.forEach((filename) => {
      const target = path.resolve(__dirname, this.templatePath, filename);
      this.render(target, filename);
    });
  }
  render(target, filename) {
    const distDir = this.output;
    console.log(target)

    
    fs.readFile(target, (err, data) => {
      
      if (err) throw Error(err);
      let template = data.toString();
      let content = ejs.render(template, this.options);
      fs.stat(distDir, (err, data) => {
        if (err) {
          //   throw Error(err);
          fs.mkdir(distDir, (err) => {
            if (err) {
              console.log("创建失败");
              throw Error(err);
            }
            fs.writeFile(path.join(distDir, filename), content, (err) => {
              if (err) {
                throw Error(err);
              }
              console.log("写入成功");
            });
          });
        } else {
          if (data.isDirectory()) {
            if (filename.includes("/")) {
              fs.stat(path.join(distDir, filename.split("/")[0]), (err) => {
                if (err) {
                  fs.mkdirSync(path.join(distDir, filename.split("/")[0]));
                  fs.writeFile(path.join(distDir, filename), content, (err) => {
                    if (err) {
                      throw Error(err);
                    }
                    console.log("写入成功");
                  });
                }else{
                  fs.writeFile(path.join(distDir, filename), content, (err) => {
                    if (err) {
                      throw Error(err);
                    }
                    console.log("写入成功");
                  });
                }
                
              });
            } else {
              fs.writeFile(path.join(distDir, filename), content, (err) => {
                if (err) {
                  throw Error(err);
                }
                console.log("写入成功");
              });
            }
          } else {
            // 如果没有dist目录就创建一个
            fs.mkdir(distDir, (err) => {
              if (err) {
                console.log("创建失败");
                throw Error(err);
              }
              fs.writeFile(path.join(distDir, filename), content, (err) => {
                if (err) {
                  throw Error(err);
                }
                console.log("写入成功");
              });
            });
          }
        }
      });
    });
  }
  emit() {}
  run() {
    this.compile();
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
