const strats = {};
strats[".vue"] = function (code) {
  const ast = {
    template: "",
    script: "",
    style: "",
  };
  return { ast, type };
};
strats[".ts"] = function (code) {};
strats[".js"] = function (code) {};
strats[".tsx"] = function (code) {};
strats[".jsx"] = function (code) {};

module.exports = strats;
