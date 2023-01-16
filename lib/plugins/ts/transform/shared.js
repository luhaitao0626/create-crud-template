const t = require("@babel/types");

// TODO generate mock data by mock.js
function createMockDataNode(options) {
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

function createOneEmptyDataPiece(options) {
    const propertyNodes = [];
    const { fields } = options;
    for (let key in fields) {
        const field = fields[key];
        const propType = field.prop.name.toLowerCase();
        let propertyNode;
        switch (propType) {
            case 'string':
                propertyNode = t.objectProperty(t.identifier(key), t.stringLiteral(""))
                break;
            case 'number':
                propertyNode = t.objectProperty(t.identifier(key), t.stringLiteral(""))
                break;
            case 'boolean':
                propertyNode = t.objectProperty(t.identifier(key), t.stringLiteral(""))
                break;
            default:
                propertyNode = t.objectProperty(t.identifier(key), t.stringLiteral(""))
                break;
        }
        propertyNodes.push(propertyNode)
    }
    // add editable: true, and isCreating: true
    const editable = t.objectProperty(t.identifier('editable'), t.booleanLiteral(true));
    const isCreating = t.objectProperty(t.identifier('isCreating'), t.booleanLiteral(true));
    propertyNodes.push(editable);
    propertyNodes.push(isCreating);
    const dataNode = t.objectExpression(propertyNodes);
    return dataNode
}

module.exports = {
    createMockDataNode,
    createOneEmptyDataPiece
}