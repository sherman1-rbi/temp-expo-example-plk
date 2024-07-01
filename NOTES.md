## Basic setup

- Create a new Expo project - `npx create-expo-app@latest` ([docs.expo.dev - Create a project](https://docs.expo.dev/get-started/create-a-project/))
- Follow Expo development environment setup instructions for "iOS Simulator", "Development build", and "Build with Expo Application Services (EAS)" toggled _off_ ([docs.expo.dev - Set up your environment](https://docs.expo.dev/get-started/set-up-your-environment/?platform=ios&device=simulated&mode=development-build))
- Install Expo Dev Client - `npx expo install expo-dev-client`
- Run the development server - `npx expo run:ios`

## Custom native code

> Expo projects can use both third-party React Native libraries with native code and your own custom native code. Creating a development build allows you to include your specific native dependencies and customizations and not what's in the latest Expo SDK. These native customizations can be any React Native library or your own custom native code.
> 
> For most third-party native libraries, autolinking makes it easy. All you have to do is install the package and create a new development build to use the module. Some modules might also need a config-plugin for additional native customizations. When adding your own custom native code, the approach varies based on how you want to work with native code.
> [docs.expo.dev - Add custom native code](https://docs.expo.dev/workflow/customizing/)

- Create the local Expo module - `npx create-expo-module@latest --local` ([docs.expo.dev - Adding a new module to an existing application](https://docs.expo.dev/modules/get-started/#adding-a-new-module-to-an-existing-application))

```
? What is the name of the local module? › aws-waf
? What is the native module name? … ExpoAwsWaf
? What is the Android package name? › expo.modules.awswaf
```

- Stop and restart the development server - `npm run ios`

## AWS WAF SDK integration

- Added the iOS AWS WAF SDK to `third-party/WafMobileSdk`
- Created a config plugin in `modules/aws-waf/src/withAwsWaf` to update the `Podfile` during `expo prebuild`
- Added the config plugin to Expo App configuration in `app.json`
- Rerun the iOS prebuild - `npx expo prebuild --clean --platform ios`. The generated `ios/Podfile` now contains the `pod 'WafMobileSdk'` snippet.
```
  use_expo_modules!
# @generated begin expo-aws-waf - expo prebuild (DO NOT MODIFY) ...
  pod 'WafMobileSdk', :path => '/Users/MYUSER/dev/expo-example-plk/third-party/WafMobileSdk'
# @generated end expo-aws-waf
```


```
❌  (modules/aws-waf/ios/ExpoAwsWafModule.swift:3:8)

  1 | import ExpoModulesCore
  2 |
> 3 | import WafMobileSdk
    |        ^ no such module 'WafMobileSdk'
  4 |
  5 | public class ExpoAwsWafModule: Module {
  6 |   // Each module class must implement the definition function. The definition consists of components


› 1 error(s), and 0 warning(s)

CommandError: Failed to build iOS project. "xcodebuild" exited with error code 65.
```
