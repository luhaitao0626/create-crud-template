const traverse = function (tree, visitor) {
    let content = '';
    if (Array.isArray(tree)) {
      tree.forEach((node) => {
        if (node.content && Array.isArray(node.content)) {
          const openTag = visitor.enter(node, content);
          content += openTag;
          content += traverse(node.content, visitor);
          const endTag = visitor.leave(node);
          content += endTag;
        } else {
          const openTag = visitor.enter(node);
          content += openTag;
          const endTag = visitor.leave(node);
          content += endTag;
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
    if (typeof attrs === 'object') {
      // [[a,1],[b,2]];
      props = Object.entries(attrs).map(item => { // item : [a,1]
        if(item[1] === ""){
          return item[0]
        }else{
          item = item.map((item,index)=>{
            if(index === 1) return JSON.stringify(item);
            return item;
          })
          return item.join('=');
        }
      }).join(' ');
    } else if (Array.isArray(attrs)) {
      attrs.forEach((attr) => {
        props = Object.entries(attr).map(item => { // item : [a,1]
          if(item[1] === ""){
            return item[0]
          }else{
            return item.join('=');
          }
        }).join(' ');
      });
    } else if (!attrs) {
      props += '';
    } else {
      props += attrs;
    }
  
    return props;
  };
  
  const isTextNode = (node) => {
    return typeof node === 'string';
  }
  
  const codenge = (ast) => {
    const visitor = {
      enter(node) {
        if(node.removed){
            node.content = [''];
            return '';
        }
        if (isTextNode(node)) {
          return node;
        } else {
          if (node.attrs) {
            return `<${node.tag} ${genProps(node.attrs)}>`;
          } else {
            return `<${node.tag}>`;
          }
        }
      },
      leave(node) {
        if(node.removed){
            return '';
        }
        if (isTextNode(node)) {
          return '';
        } else {
          return `</${node.tag}>`;
        }
      },
    };
    content = traverse(ast, visitor);
    return content;
  };
  
  module.exports = codenge;
  