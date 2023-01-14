const { callExpression } = require('@babel/types');
const t = require('@babel/types');


const processQuery = (path, options, type) => {
  const { node } = path;
  const { filename } = options;

  // if there's no query, then remove path in index.vue and index.ts
  if (
    !options.hasQuery &&
    (filename.includes('index.vue') || filename.includes('index.ts')) &&
    node &&
    node.source &&
    node.source.value === "./query"
  ) {
    path.remove();
  }

  // index.ts
  // getEntitys(param.value) => param.value is removed in index.ts
  if (
    !options.hasQuery &&
    filename.includes('index.ts') &&
    node &&
    node.callee &&
    node.callee.name === 'getEntitys'
  ) {
    path.traverse({
      MemberExpression(path) {
        const { node } = path;
        if (node.object.name === 'params' && node.property.name === 'value') {
          // getEntitys(param.value) => param.value is removed in index.ts
          path.remove();
          // console.log('getEntitys(param.value) => param.value is removed in index.ts')
        }
      }
    });
  }

  /**
   * query.ts
   * dynamically generate params
   * `if(!isEmpty(form.field)) obj.field = form.field;`
   */
  //  TODO: here is in infinite loop 
  if (
    options.hasQuery &&
    filename.includes('query.ts') &&
    node &&
    t.isVariableDeclarator(node) &&
    node.id.name === 'params'
  ) {
    // find `if(!isEmpty(form.field)) obj.field = form.field;`
    path.traverse({
      IfStatement(path) {
        const { node } = path;
        const newNodes = [];
        const queryFields = options.queryFields;
        queryFields.forEach(fieldName => {
          const newNode = t.cloneNode(node);
          newNode.test.argument.arguments[0].property.name = fieldName
          newNode.consequent.expression.left.property.name = fieldName
          newNode.consequent.expression.right.property.name = fieldName
          newNodes.push(newNode);
        })
        path.replaceWithMultiple(
          newNodes
        )
        path.stop();
      }
    });
  }

  /**
   * in crud.ts
   * if there is no query then
   * remove params : IEntity in
   * `const getEntitys = async (params: IEntityQuery): Promise<any> => {}`
   * to get 
   *  `const getEntitys = async (): Promise<any> => {}`
   * */
  if (
    !options.hasQuery &&
    filename.includes('crud.ts') &&
    node &&
    node.id &&
    node.id.name === 'getEntitys'
  ) {
    path.traverse({
      ArrowFunctionExpression(path) {
        const { node } = path;
        node.params = node.params.filter(param => {
          return param.name != 'params'
        });
      }
    });

  }
};
module.exports = processQuery;
