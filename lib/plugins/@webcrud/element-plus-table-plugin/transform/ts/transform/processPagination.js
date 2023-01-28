const processPagination = (path, options) => {
  const { node } = path;
  const {filename} = options;

  // if no pagination, then remove import xxxx from './pagination'
  if (
    !options.hasPagination &&
    (filename.includes('index.vue') || filename.includes('index.ts') || filename.includes('query.ts')) &&
    node &&
    node.source &&
    node.source.value === "./pagination"
  ) {
    path.remove();
  }

  // query.ts
  // if no pagination, then remove statement `resetPagination()`
  if (
    !options.hasPagination && 
    filename.includes('query.ts') && 
    node &&
    node.callee &&
    node.callee.name === "resetPagination"
  ) {
    // console.log('remove resetPagination')
    path.remove();
  }

  // if no pagination, then remove statement(`total.value = total` ) in setEntitys within index.ts
  if (
    !options.hasPagination &&
    filename.includes('index.ts') && 
    node &&
    node.left &&
    node.left.object &&
    node.left.object.name === "total"
    
  ) {
    path.remove();
  }

  /**
   * query.ts
   * if no pagination, then remove 
   * `obj.pageNum = pagination.pageNum;
   *  obj.pageSize = pagination.pageSize;` in
   * `params = computed()`  body
   */
   if (
    !options.hasPagination &&
    filename.includes('query.ts') &&
    node &&
    node.id &&
    node.id.name === "params"
  ) {
    path.traverse({
      AssignmentExpression(path) {
        const { node } = path;
        // remove 
        // `obj.pageNum = pagination.pageNum` and 
        // `obj.pageSize = pagination.pageSize`
        // if no pagination
        if (
          (node.left.object.name === 'obj' && node.left.property.name === 'pageNum') ||
          (node.left.object.name === 'obj' && node.left.property.name === 'pageSize')
        ) {
          path.remove();
        }
      }
    });
  }

};

module.exports = processPagination;
