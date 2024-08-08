const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const { withDangerousMod, withPlugins } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode');

const SDK_FILENAME_IOS = 'WafMobileSdk-001.000.001.zip';
const SDK_OUTPUT_PATH = 'cocoapods/WafMobileSdk';

const withAwsWafPodfileChange = config =>
  withDangerousMod(config, [
    'ios',
    config => {
      const podfilePath = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      if (!fs.existsSync(podfilePath)) {
        throw new Error(`Failed to locate Podfile at ${podfilePath}`);
      }

      const podfileContents = fs.readFileSync(podfilePath, 'utf-8');

      if (podfileContents.includes('expo-aws-waf')) {
        return config;
      }

      const wafSdkZipPath = path.join(__dirname, `sdk/ios/${SDK_FILENAME_IOS}`);
      if (!fs.existsSync(wafSdkZipPath)) {
        throw new Error(`Failed to locate AWS WAF SDK at ${wafSdkZipPath}`);
      }
      const sdkOutputPath = path.join(config.modRequest.platformProjectRoot, SDK_OUTPUT_PATH);
      if (!fs.existsSync(sdkOutputPath)) {
        fs.mkdirSync(sdkOutputPath, { recursive: true });
        childProcess.execFileSync('unzip', ['-o', wafSdkZipPath, '-d', sdkOutputPath]);
      }

      const awsWafSdkBlock = [`  pod 'WafMobileSdk', :path => '${SDK_OUTPUT_PATH}'`].join('');

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
    },
  ]);

const withAwsWafIOS = config => {
  return withPlugins(config, [withAwsWafPodfileChange]);
};

module.exports = { withAwsWafIOS };
