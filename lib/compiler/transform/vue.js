const traverse = function (tree, visitor) {
  if (Array.isArray(tree)) {
    tree.forEach((node) => {
      if (node.content && Array.isArray(node.content)) {
        visitor.enter(node);
        console.log(node);
        traverse(node.content, visitor);
        visitor.leave(node);
      } else {
        visitor.enter(node);
        visitor.leave(node);
      }
    });
  } else {
    throw Error("node must be array or string");
  }
};

let n = 0;
const padding = () => {
  return "  ".repeat(n);
};

function createNode(tag,props,children){
  return {
    tag,
    props,
    content: children
  }
}


/**
 * This parse will return ast of vue sfc file;
 * @param {*} source
 * @returns {*} ast
 */
const transform = (ast, options) => {
  const visitor = {
    enter(node) {
      // const log = node.tag ? `${padding()}'enter '${node.tag}` : `${padding()}'enter textnode'`
      // console.log(log);
      // n += 2;
      if (node.tag === 'el-form' && node.attrs['name'] && node.attrs['name'] === 'queryForm') {
        node.content = node.content || [];
        console.log(node);
        if (options.hasQuery) {
          const { queryFields, fields } = options;
          queryFields.forEach(queryField=>{
            const newNode = createNode('el-form-item', {
              label: queryField,
            },[]);
            node.content.push(newNode)
          });
        }
        console.log(node);
      }

    },
    leave(node) {
      // n -= 2;
      // const log = node.tag ? `${padding()}'leave '${node.tag}` : `${padding()}'leave textnode'`
      // console.log(log);
    },
  };
  traverse(ast, visitor);
  return ast;
};

module.exports = transform;
