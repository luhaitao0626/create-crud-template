
const getScriptNode = (ast) => {
    return ast.find(node => {
      return node.tag === 'script'
    })
  };

const getAstByType = (ast, type) => {
    return ast.filter((node) => {
      if(type === 'template'){
          return (typeof node === 'string') || node.tag && node.tag === type;
      }else if(type === 'script'){
          return node.tag && node.tag === type;
      }else {
          return false
      }
    });
  };

module.exports = {
    getScriptNode,
    getAstByType,
}

