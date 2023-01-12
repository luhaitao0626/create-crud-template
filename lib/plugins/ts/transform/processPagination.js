
const processPagination = (path, options) => {
    const { node } = path;
    if (
      node &&
      node.source &&
      node.source.value === "./pagination" &&
      !options.hasPagination
    ) {
      path.remove();
    }
  };

  module.exports = processPagination;