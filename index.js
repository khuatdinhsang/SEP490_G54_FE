/**
 * @format
 */

import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { Linking } from 'react-native';
messaging().setBackgroundMessageHandler(async message => {
    // NotificationModule.onPress(message?.notification?.title, message?.notification?.body)
    console.log("11", message);
});
// messaging().onNotificationOpenedApp(messaging => {
//     Linking.openURL(`myapp://app/${messaging.data.screen}`);
// });
AppRegistry.registerComponent(appName, () => App);
