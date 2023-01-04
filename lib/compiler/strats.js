const vuePlugin = require('../plugins/vue');

const strats = {};

const installPlugin = ( plugin ) => {
  strats[plugin.name] = plugin;
  console.log(strats)

}

installPlugin(vuePlugin);

module.exports = strats;
