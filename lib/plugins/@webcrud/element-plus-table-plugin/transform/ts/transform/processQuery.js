const t = require('@babel/types');


const processQuery = (path, options, type) => {
  const { node } = path;
  const { filename } = options;

  // index.vue
  // if there's no query, then remove import './query' in index.vue and index.ts
  if (
    !options.hasQuery &&
    (filename.includes('index.vue') || filename.includes('index.ts')) &&
    node &&
    node.source &&
    node.source.value === "./query"
  ) {
    path.remove();
  }

  // crud.ts
  // if there's no query, then remove import './typings/entityQuery'
  if (
    !options.hasQuery &&
    filename.includes('crud.ts') &&
    node &&
    t.isImportDeclaration(node) &&
    node.source &&
    node.source.value === "./typings/entityQuery"
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
   * dynamically generate form declaraction
   * const form = reactive({field: ''})  and generate real fields
   */
  if (
    options.hasQuery &&
    filename.includes('query.ts') &&
    node &&
    t.isVariableDeclarator(node) &&
    node.id.name === 'form'
  ) {
    // find ` field:''` and generate real fields
    path.traverse({
      ObjectExpression(_path) {
        const queryFields = options.queryFields;
        const properties = [];
        let newNode;
        queryFields.forEach(fieldName => {
          const property = t.objectProperty(t.identifier(fieldName), t.stringLiteral(""))
          properties.push(property);
        })
        newNode = t.objectExpression(properties);
        _path.replaceWith(newNode)
        _path.stop();
      }
    });
  }

  /**
   * query.ts
   * dynamically generate params declaraction body
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
   * query.ts
   * `const clearSearchForm = () => {}` generate body
   */
  //  TODO: here is in infinite loop 
  if (
    options.hasQuery &&
    filename.includes('query.ts') &&
    node &&
    t.isVariableDeclarator(node) &&
    node.id.name === 'clearSearchForm'
  ) {
    // find `form.field === ''`
    path.traverse({
      AssignmentExpression(path) {
        const { node } = path;
        const newNodes = [];
        const queryFields = options.queryFields;
        queryFields.forEach(fieldName => {
          const newNode = t.cloneNode(node);
          newNode.left.property.name = fieldName
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
