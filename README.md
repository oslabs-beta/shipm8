# ShipM8, the mobile app for monitoring Kubernetes

ShipM8 is a mobile application for Kubernetes with support for AWS EKS deployments.

ShipM8 is made with [React Native](https://facebook.github.io/react-native/). For [development](#run-locally-using-simulators) purposes you can run the application using both iOS and Android simulators.

## To get started with development (iOS)

To develop and test the application you need to setup your local environment, then run the simulator.
You'll need the React Native CLI, Xcode, and Cocoapods. Be sure you have Xcode installed (at least version 11.3.1).

Once you have Xcode properly installed

Install `react-native-cli`

```npm install -g react-native-cli```

With `react-native-cli` installed

```npm install```

Next, install `cocoapods` if you have not already

```sudo gem install cocoapods```

Install iOS dependencies

```cd iOS/ && pod install```

Finally, cd back to main project directory and run the app on iOS

```npm run ios```