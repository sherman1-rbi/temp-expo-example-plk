const fs = require('fs');
const path = require('path');

const { withPlugins, withProjectBuildGradle } = require('@expo/config-plugins');
const { mergeContents } = require('@expo/config-plugins/build/utils/generateCode');

const withProjectGradleChange = config =>
  withProjectBuildGradle(config, config => {
    if (config.modResults.contents.includes('expo-aws-waf')) {
      return config;
    }
    const sourceRepositoryPath = path.join(__dirname, 'sdk/android/repository');
    if (!fs.existsSync(sourceRepositoryPath)) {
      throw new Error('Failed to locate custom local repository path');
    }

    const destRepositoryPath = path.join(config.modRequest.platformProjectRoot, 'maven-local');
    if (!fs.existsSync(destRepositoryPath)) {
      fs.mkdirSync(destRepositoryPath, { recursive: true });
      fs.cpSync(sourceRepositoryPath, destRepositoryPath, { recursive: true });
    }

    const localMavenRepositoryBlock = [
      `allprojects {`,
      `    repositories {`,
      `        maven {`,
      `            url 'file://${destRepositoryPath}'`,
      `        }`,
      `    }`,
      `}`,
    ].join('\n');

    const originalContents = config.modResults.contents;
    const updatedContents = mergeContents({
      comment: '//',
      newSrc: localMavenRepositoryBlock,
      offset: 1,
      src: originalContents,
      tag: 'expo-aws-waf',
    });
    config.modResults.contents = updatedContents.contents;

    return config;
  });

const withAwsWafAndroid = config => {
  return withPlugins(config, [withProjectGradleChange]);
};

module.exports = { withAwsWafAndroid };
