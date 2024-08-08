# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

# AWS Support Case 172107774700227 Guidance

## Build and run iOS example app

- Unpack the provided `.zip` containing the SDK to the `modules/aws-waf/config-plugin/sdk` directory
- `npx expo prebuild --clean --platform ios`
- Open this `ios` directory in XCode
- Build and launch from XCode
- Set the environment variable `AWS_WAF_DOMAIN_NAME=postman-echo.com` and `AWS_WAF_INTEGRATION_URL` to the global/edge WAF integration URL
- Run `npx expo start` (the `AWS_WAF` environment variables must be visible to this process)
- Click the "Press Me" Button in the example app

  The "Press Me" button makes an HTTP POST request to `https://postman-echo.com/post` with an `x-aws-waf-token` header.

