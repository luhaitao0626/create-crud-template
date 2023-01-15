const t = require('@babel/types')

function createDatas(options){
    const dataNodes = [];
    for(let i = 0; i< 3; i++){
        const onePieceOfData = createDataNode(options);
        dataNodes.push(onePieceOfData)
    }
    return dataNodes;

}
// TODO generate mock data by mock.js
function createDataNode(options) {
    const propertyNodes = [];
    const { fields } = options;
    for (let key in fields) {
        const field = fields[key];
        const propType = field.prop.name.toLowerCase();
        let propertyNode;
        switch (propType) {
            case 'string':
                propertyNode = t.objectProperty(t.identifier(key), t.stringLiteral(key))
                break;
            case 'number':
                propertyNode = t.objectProperty(t.identifier(key), t.numericLiteral(1))
                break;
            case 'boolean':
                propertyNode = t.objectProperty(t.identifier(key), t.booleanLiteral(true))
                break;
            default:
                propertyNode = t.objectProperty(t.identifier(key), t.stringLiteral(key))
                break;
        }
        propertyNodes.push(propertyNode)
    }
    const dataNode = t.objectExpression(propertyNodes);
    return dataNode
}

function processMockData(path, options) {
    const { node } = path;
    const { filename } = options;
    if (
        filename.includes('mockData.ts') &&
        node.id.name === 'list'
    ) {
        path.traverse({
            ArrayExpression(_path) {
                const { node: _node } = _path;
                const dataNodes = createDatas(options);
                _path.replaceWith(t.arrayExpression(dataNodes));
                _path.stop()
            }

        })
    }
}
module.exports = processMockData