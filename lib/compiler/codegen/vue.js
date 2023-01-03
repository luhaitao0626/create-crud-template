const traverse = function (tree, visitor, content) {
  if (Array.isArray(tree)) {
    tree.forEach((node) => {
      if (node.content && Array.isArray(node.content)) {
        const openTag = visitor.enter(node, content);
        content += openTag;
        traverse(node.content, visitor);
        const endTag = visitor.leave(node, content);
        content += endTag;
      } else {
        visitor.enter(node, content);
        visitor.leave(node, content);
      }
    });
  } else {
    throw Error("node must be array or string");
  }
  return content;
};

const genProps = (attrs) => {
  let props = "";
  //TODO attrs maybe array or object; need to be processed differently;
  if(typeof attrs === 'object'){
    Object.entries(attrs).forEach(([key, value]) => {
      props += `${key}=${value}`;
    });
  }else if(Array.isArray(attrs)){
    attrs.forEach((attr) => {
      Object.entries(attr).forEach(([key, value]) => {
        props += `${key}=${value}`;
      });
    });
  }else if(!attrs){
    props += '';
  }else{
    props += attrs;
  }
  
  return props;
};

const isTextNode = (node) => {
  return typeof node ==='string';
}

const codenge = (ast) => {
  let content = "";
  const visitor = {
    enter(node) {
      if(isTextNode(node)){
        return node;
      }else{
        return `<${node.tag} ${genProps(node.attrs)}>`;
      }
    },
    leave(node) {
      if(isTextNode(node)){
        return '';
      }else{
        return `</${node.tag} ${genProps(node.attrs)}>`;
      }
    },
  };
  content = traverse(ast, visitor, content);
  return content;
};

module.exports = codenge;
