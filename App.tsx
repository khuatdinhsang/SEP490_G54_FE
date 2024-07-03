import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import './src/config/translation.config';
import colors from './src/constant/color';
import Navigator from './src/navigator';
import { Provider } from 'react-redux';
import { persistor, store } from './src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from './src/config/firebase.config';
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
  const getToken = async () => {
    const token = await messaging().getToken({
      vapidKey: "BAjalMty6lwI0zsibvdKVoEGOZsJ5nCOU8uO1jaHER6Yp2ajSIGBq8eyI7dsRBjB6Qr4OUuAYKWvLDAxDYeB8IU",
    });
    console.log("39", token)
  }
  useEffect(() => {
    requestUserPermission()
    getToken()
    console.log("aaaa")
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
