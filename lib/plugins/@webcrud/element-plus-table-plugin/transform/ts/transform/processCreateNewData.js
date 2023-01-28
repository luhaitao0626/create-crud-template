const t = require("@babel/types");
const { createOneEmptyDataPiece } = require("./shared");

const processCreateNewData = (path, options, type) => {
  const { node } = path;
  const { filename } = options;

  // index.ts
  // dynamically generate const newData = {}  in create function
  if (
    filename.includes("index.ts") &&
    node &&
    node.id &&
    node.id.name === "newData"
  ) {
    path.traverse({
      ObjectExpression(_path) {
        const { node: _node } = _path;
        const newDataNode = createOneEmptyDataPiece(options);
        _path.replaceWith(newDataNode)
        _path.stop();
      },
    });
    path.stop();
  }
};
module.exports = processCreateNewData;
