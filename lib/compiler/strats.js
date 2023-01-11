const vuePlugin = require("../plugins/vue");
const tsPlugin = require("../plugins/ts");

const strats = {
  isPluginInstalled(filetype) {
    return this[filetype] ? true : false;
  },
};

const installPlugin = (plugin) => {
  strats[plugin.name] = plugin;
};

installPlugin(vuePlugin);
installPlugin(tsPlugin);

module.exports = strats;
