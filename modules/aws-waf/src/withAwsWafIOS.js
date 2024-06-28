const fs = require('fs');
const path = require('path');

const { withDangerousMod } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode');

const withAwsWafIOS = config => withDangerousMod(config, ['ios', config => {
  const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
  if (!fs.existsSync(podfilePath)) {
    throw new Error(`Failed to locate Podfile at ${podfilePath}`);
  }

  const podfileContents = fs.readFileSync(podfilePath, 'utf-8');

  if (podfileContents.includes('WafMobileSdk')) {
    return config;
  }

  const wafMobileSdkPath = path.join(__dirname, '../../../third-party/WafMobileSdk');
  if (!fs.existsSync(wafMobileSdkPath)) {
    throw new Error(`Failed to locate AWS WAF SDK at ${wafMobileSdkPath}`);
  }

  const awsWafSdkBlock = [
	  `  pod 'WafMobileSdk', :path => '${wafMobileSdkPath}'`,
  ].join('');

  const updatedPodfileContents = mergeContents({
    anchor: /use_native_modules/,
    comment: '#',
    newSrc: awsWafSdkBlock,
    offset: 0,
    src: podfileContents,
    tag: 'expo-aws-waf',
  });

  fs.writeFileSync(podfilePath, updatedPodfileContents.contents, { encoding: 'utf8' });

  return config;
}]);

module.exports = { withAwsWafIOS };
