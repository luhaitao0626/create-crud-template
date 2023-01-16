const t = require("@babel/types");
const { createOneEmptyDataPiece } = require("./shared");

const processCreateNewData = (path, options, type) => {
  const { node } = path;
  const { filename } = options;

  // index.ts
  // dynamically generate const newData = {}  in create function
  if (
    filename.includes("index.ts") &&
    node &&
    node.id &&
    node.id.name === "newData"
  ) {
    path.traverse({
      ObjectExpression(_path) {
        const { node: _node } = _path;
        const newDataNode = createOneEmptyDataPiece(options);
        _path.replaceWith(newDataNode)
        _path.stop();
      },
    });
    path.stop();
  }

  /**
   * query.ts
   * dynamically generate form declaraction
   * const form = reactive({field: ''})  and generate real fields
   */
  if (
    options.hasQuery &&
    filename.includes("query.ts") &&
    node &&
    t.isVariableDeclarator(node) &&
    node.id.name === "form"
  ) {
    // find ` field:''` and generate real fields
    path.traverse({
      Property(path) {
        const { node } = path;
        const newNodes = [];
        const queryFields = options.queryFields;
        queryFields.forEach((fieldName) => {
          const newNode = t.cloneNode(node);
          newNode.key.name = fieldName;
          newNodes.push(newNode);
        });
        path.replaceWithMultiple(newNodes);
        path.stop();
      },
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
    filename.includes("query.ts") &&
    node &&
    t.isVariableDeclarator(node) &&
    node.id.name === "params"
  ) {
    // find `if(!isEmpty(form.field)) obj.field = form.field;`
    path.traverse({
      IfStatement(path) {
        const { node } = path;
        const newNodes = [];
        const queryFields = options.queryFields;
        queryFields.forEach((fieldName) => {
          const newNode = t.cloneNode(node);
          newNode.test.argument.arguments[0].property.name = fieldName;
          newNode.consequent.expression.left.property.name = fieldName;
          newNode.consequent.expression.right.property.name = fieldName;
          newNodes.push(newNode);
        });
        path.replaceWithMultiple(newNodes);
        path.stop();
      },
    });
  }

  /**
   * query.ts
   * `const clearSearchForm = () => {}` generate body
   */
  //  TODO: here is in infinite loop
  if (
    options.hasQuery &&
    filename.includes("query.ts") &&
    node &&
    t.isVariableDeclarator(node) &&
    node.id.name === "clearSearchForm"
  ) {
    // find `form.field === ''`
    path.traverse({
      AssignmentExpression(path) {
        const { node } = path;
        const newNodes = [];
        const queryFields = options.queryFields;
        queryFields.forEach((fieldName) => {
          const newNode = t.cloneNode(node);
          newNode.left.property.name = fieldName;
          newNodes.push(newNode);
        });
        path.replaceWithMultiple(newNodes);
        path.stop();
      },
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
    filename.includes("crud.ts") &&
    node &&
    node.id &&
    node.id.name === "getEntitys"
  ) {
    path.traverse({
      ArrowFunctionExpression(path) {
        const { node } = path;
        node.params = node.params.filter((param) => {
          return param.name != "params";
        });
      },
    });
  }
};
module.exports = processCreateNewData;
