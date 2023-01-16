const t = require("@babel/types");
const { createMockDataNode } = require("./shared");

function createDatas(options) {
  const dataNodes = [];
  for (let i = 0; i < 3; i++) {
    const onePieceOfData = createMockDataNode(options);
    dataNodes.push(onePieceOfData);
  }
  return dataNodes;
}

function processMockData(path, options) {
  const { node } = path;
  const { filename } = options;
  if (filename.includes("mockData.ts") && node.id.name === "list") {
    path.traverse({
      ArrayExpression(_path) {
        const { node: _node } = _path;
        const dataNodes = createDatas(options);
        _path.replaceWith(t.arrayExpression(dataNodes));
        _path.stop();
      },
    });
  }
}
module.exports = processMockData;
