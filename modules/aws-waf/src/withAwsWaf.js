const { createRunOncePlugin, withPlugins } = require('@expo/config-plugins');

const { withAwsWafIOS } = require('./withAwsWafIOS');

module.exports = createRunOncePlugin(config => withPlugins(config, [withAwsWafIOS]));
