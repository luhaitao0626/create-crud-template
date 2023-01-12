const processQuery = (path, options) => {
  const { node } = path;
  // if user has no need for query, then remove path;
  if (
    node &&
    node.source &&
    node.source.value === "./query" &&
    !options.hasQuery
  ) {
    path.remove();
  }
};
module.exports = processQuery;
