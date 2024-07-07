import messaging from '@react-native-firebase/messaging';
export const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
        console.log('Authorization status:', authStatus);
    }
};
export const getToken = async () => {
    // const token = await messaging().getToken({
    //     vapidKey: "BAjalMty6lwI0zsibvdKVoEGOZsJ5nCOU8uO1jaHER6Yp2ajSIGBq8eyI7dsRBjB6Qr4OUuAYKWvLDAxDYeB8IU",
    // });
    const token = await messaging().getToken();
    console.log("39", token)
}
