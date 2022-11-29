const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

class Compiler {
  constructor(options) {
    this.options = options;
    this.templatePath = options.templatePath;
    this.excludes = options.excludes;
    this.output = options.output;
  }
  // 筛选出需要输出的所有文件夹和其中的文件
  getOutputFileList() {
    let tree = [
      {
        name: "index.vue",
        isDirectory: false,
      },
      {
        name: "index.ts",
        isDirectory: false,
      },
      // {
      //     name: 'store',
      //     isDirectory: true,
      //     children: [

      //     ]
      // }
    ];
    return tree;
  }
  compile() {
    const fileList = this.getOutputFileList();
    fileList.forEach((item) => {
      console.log(item.name);
      const target = path.resolve(__dirname, this.templatePath, item.name);
      this.render(target,item.name);
    });
  }
  render(target, filename) {
    const distDir = this.output;
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
            fs.writeFile(path.join(distDir, filename), content, (err) => {
              if (err) {
                throw Error(err);
              }
              console.log("写入成功");
            });
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

function writeFile(path,content,callback){
    fs.writeFile(path, content, (err) => {
        if (err) {
          throw Error(err);
        }
        console.log("写入成功");
      });
}

module.exports = Compiler;
