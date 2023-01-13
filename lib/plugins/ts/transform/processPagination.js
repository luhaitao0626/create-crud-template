const processPagination = (path, options) => {
  const { node } = path;
  const {filename} = options;

  // if no pagination, then remove import xxxx from './pagination'
  if (
    !options.hasPagination &&
    filename.includes('index.vue') &&
    node &&
    node.source &&
    node.source.value === "./pagination"
  ) {
    path.remove();
  }

  // if no pagination, then remove statement `resetPagination()` in query.ts file
  if (
    !options.hasPagination && 
    filename.includes('query.ts') && 
    node &&
    node.callee &&
    node.callee.name === "resetPagination"
  ) {
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
};

module.exports = processPagination;
