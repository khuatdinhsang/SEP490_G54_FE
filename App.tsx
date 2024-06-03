import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Navigator from './src/navigator';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import './src/config/translation.config';
import { useTranslation } from 'react-i18next';
import colors from './src/constant/color';

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

  return (
    <NavigationContainer theme={MyTheme}>
      <Navigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
