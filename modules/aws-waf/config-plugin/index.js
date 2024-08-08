const { createRunOncePlugin, withPlugins } = require('@expo/config-plugins');

const { withAwsWafAndroid } = require('./with-aws-waf-android');
const { withAwsWafIOS } = require('./with-aws-waf-ios');

module.exports = createRunOncePlugin(config => {
  return withPlugins(config, [withAwsWafAndroid, withAwsWafIOS]);
});
