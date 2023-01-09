const traverse = function (tree, visitor) {
    if (Array.isArray(tree)) {
      tree.forEach((node) => {
        if (node.content && Array.isArray(node.content)) {
          visitor.enter(node);
          node.content && traverse(node.content, visitor);
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
  
  // let n = 0;
  // const padding = () => {
  //   return "  ".repeat(n);
  // };
  
  function createNode(tag, attrs, children) {
    return {
      tag,
      attrs,
      content: children,
    };
  }
  
  // find ending whiteSpaces of string
  const findEndingWhiteSpaces = (str) => {
    let count = 0;
    for (let i = str.length - 1; i >= 0; i--) {
      const char = str[i];
      if (char === " ") {
        count++;
      } else {
        break;
      }
    }
    return count;
  };
  
  const getChildIndent = (node) => {
    let whiteSpaces = 0;
    for (let i = 0; i < node.content.length; i++) {
      child = node.content[i];
      if (typeof child === "string") {
        index = i;
        whiteSpaces = findEndingWhiteSpaces(child);
        break;
      }
    }
    return whiteSpaces;
  };
  
  const insert = (node, childNode) => {
    let index = 0;
    let indent = 0;
    for (let i = 0; i < node.content.length; i++) {
      child = node.content[i];
      if (typeof child === "string") {
        index = i;
        indent = findEndingWhiteSpaces(child);
        break;
      }
    }
    // insert childNode after first string node;
    node.content.splice(index + 1, 0, childNode);
    node.content.splice(index + 2, 0, "\r\n" + " ".repeat(indent));
  };
  
  // <el-input v-model="form.query" placeholder="请输入fields[query].label" />
  const createQueryNode = (queryField, fields, indent) => {
    const tag = "el-form-item";
    const label = queryField;
    // create "el-input" node in "el-form-item"
    const content = createNode("el-input", {
      "v-model": `form.${queryField}`,
      placeholder: `Please input ${fields[queryField].label}`,
    });
    const node = {
      tag,
      attrs: {
        label,
      },
      content: [
        "\r\n" + " ".repeat(indent + 2),
        content,
        "\r\n" + " ".repeat(indent),
      ],
    };
  
    return node;
  };
  
  const transformQuery = (node, options) => {
    if (
      node.tag === "el-form" &&
      node.attrs["name"] &&
      node.attrs["name"] === "queryForm"
    ) {
      node.content = node.content || [];
      if (options.hasQuery) {
        const { queryFields, fields } = options;
        queryFields.reverse().forEach((queryField, index) => {
          const indent = getChildIndent(node);
          const childNode = createQueryNode(queryField, fields, indent);
          // insert childNode into first non LF node;
          insert(node, childNode);
        });
      } else {
        // mark this node as removed;
        // in codegen phase this node will be removed 
        node.removed = true;
      }
    }
  };
  
  const transformPagination = (node, options) => {
    if (node.tag && node.tag === "el-pagination") {
      node.content = node.content || [];
      if (!options.hasPagination) {
        // mark this node as removed;
        // in codegen phase this node will be removed 
        node.removed = true;
      }
    }
  };
  
  const isEditableElement = (node) => {
      if(node.attrs && node.attrs['mode'] && node.attrs['mode'] === 'editable') {
          return true;
      }else if(node.attrs && node.attrs['mode'] && node.attrs['mode'] === 'ineditable'){
          return false;
      }else{
          return false;
      }
  }
  
  // Transform entity list
  const transformEntity = (node, options) => {
    if (node.tag && node.tag === "el-table-column") {
      const attrs = node.attrs;
      if(options.editable){
          if(!isEditableElement(node)) node.removed = true;
      }else{
          if(isEditableElement(node)) node.removed = true;
      }
    }
  };
  
  /**
   * This parse will return ast of html file;
   * @param {*} source
   * @returns {*} ast
   */
  const transform = (ast, options) => {
    const visitor = {
      enter(node) {
        // const log = node.tag ? `${padding()}'enter '${node.tag}` : `${padding()}'enter textnode'`
        // console.log(log);
        // n += 2;
        transformQuery(node, options);
        transformPagination(node, options);
        transformEntity(node, options);
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
  