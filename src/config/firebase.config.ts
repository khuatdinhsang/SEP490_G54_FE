import AsyncStorage from '@react-native-async-storage/async-storage';
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
    const token = await messaging().getToken({
        vapidKey: "BMOssgoskayRgS2I-P9HcAjkHAejXed-MjbMqYjEjcftZJaQdGGlhCKxoipyt5raJYegowHkyjWWc4NDtc3WxfU",
    });
    console.log("aa", token)
    if (token) {
        await AsyncStorage.setItem('deviceToken', token);
    }

}
