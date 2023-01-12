const processPagination = (path, options) => {
  const { node } = path;
  // remove import xxxx from './pagination'
  if (
    node &&
    node.source &&
    node.source.value === "./pagination" &&
    !options.hasPagination
  ) {
    path.remove();
  }

  // process resetPagination()
  if (
    node.callee &&
    node.callee.name === "resetPagination" &&
    !options.hasPagination
  ) {
    path.remove();
  }

  if (
    node.left &&
    node.left.object &&
    node.left.object.name === "total" &&
    !options.hasPagination
  ) {
    console.log('total.value is removed')
    path.remove();
  }
};

module.exports = processPagination;
