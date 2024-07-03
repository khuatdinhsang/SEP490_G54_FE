import messaging from '@react-native-firebase/messaging';
const firebaseConfig = {
    apiKey: "AIzaSyBplOhea2Nyl_WyxliZyFzG8Wtm_B9ofc0",
    authDomain: "testnoti-3aff9.firebaseapp.com",
    projectId: "testnoti-3aff9",
    storageBucket: "testnoti-3aff9.appspot.com",
    messagingSenderId: "1055177897654",
    appId: "1:1055177897654:web:07a914e7aea05fa1161817",
    measurementId: "G-PBGS6ZXW53"
};

export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    // if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED || authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL) {
    //     const token = await messaging().getToken({
    //         vapidKey: "BAjalMty6lwI0zsibvdKVoEGOZsJ5nCOU8uO1jaHER6Yp2ajSIGBq8eyI7dsRBjB6Qr4OUuAYKWvLDAxDYeB8IU",
    //     });
    //     console.log("aa", token);
    // } else {
    //     console.log('Permission not granted');
    // }
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};
