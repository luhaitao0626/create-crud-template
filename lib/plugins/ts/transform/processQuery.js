const processQuery = (path, options) => {
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

  // getEntitys(param.value) => param.value is removed in index.ts
  if(
    !options.hasQuery &&
    filename.includes('index.ts') &&
    node &&
    node.callee &&
    node.callee.name === 'getEntitys'
  ){
    path.traverse({
      MemberExpression(path) {
        const {node} = path;
        if(node.object.name === 'params' && node.property.name === 'value'){
          // getEntitys(param.value) => param.value is removed in index.ts
          path.remove();
          // console.log('getEntitys(param.value) => param.value is removed in index.ts')
        }
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
  if(
    !options.hasQuery &&
    filename.includes('crud.ts') &&
    node &&
    node.id &&
    node.id.name === 'getEntitys'
  ){
    path.traverse({
      ArrowFunctionExpression(path) {
        const {node} = path;
        node.params = node.params.filter(param => {
          return param.name != 'params'
        });
      }
    });
    
  }
};
module.exports = processQuery;
