const vuePlugin = require('../plugins/vue');

const strats = {};

const installPlugin = ( plugin ) => {
  strats[plugin.name] = plugin;
}

installPlugin(vuePlugin);

module.exports = strats;
