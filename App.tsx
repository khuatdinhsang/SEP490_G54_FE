import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import './src/config/translation.config';
import colors from './src/constant/color';
import Navigator from './src/navigator';
import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import { getToken, requestUserPermission } from './src/config/firebase.config';
import NotificationModule from './src/native-module/NotificationModule';
import TimerModule from './src/native-module/timer.module';
import { generateRandomId } from './src/util';
import { setScreen } from './src/store/screen.slice';
import { useResetScreenAtStartOfWeek } from './src/hooks/resetScreen';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
  fonts: {
    fontFamily: 'Spoqa Han Sans Neo, sans-serif',
  },
};

function App(): React.JSX.Element {
  // config translation
  // const { t, i18n } = useTranslation();
  // const [currentLanguage, setCurrentLanguage] = useState("en");
  // const handleChangeText = () => {
  //   setCurrentLanguage(currentLanguage === "en" ? "ko" : "en");
  //   i18n.changeLanguage(currentLanguage === "en" ? "ko" : "en");
  // };
  // <Text>{t("authentication.login")}</Text>
  // <Button onPress={handleChangeText} title="change lang" />
  useEffect(() => {
    const initialize = async () => {
      await requestUserPermission();
      await getToken();
    };

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("Received message", remoteMessage);
      const title = remoteMessage.notification?.title ?? 'No Title';
      const body = remoteMessage.notification?.body ?? 'No Body';
      NotificationModule.onPress(title, body);
    });

    initialize();

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer theme={MyTheme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigator />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
