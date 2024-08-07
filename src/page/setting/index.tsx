import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { NativeEventEmitter, Platform, SafeAreaView, StyleSheet, ToastAndroid, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import colors from '../../constant/color';
import CategoryComponent from '../../component/category';
import { paddingHorizontalScreen } from '../../styles/padding';
import { HeightDevice } from '../../util/Dimenssion';
import { SCREENS_NAME } from '../../navigator/const';
import RangeBlock from '../../component/range-block';
import BarChart from '../../component/bar-chart';
import LineChart from '../../component/line-chart';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../component/loading';
import { authService } from '../../services/auth';
import { LANG } from '../home/const';
import LanguageModule from '../../native-module/language';

const Setting = () => {
  const { t, i18n } = useTranslation()
  // const [isShowDialog, setIsShowDialog] = useState<boolean>(true);
  // const [notificationAllowed, setNotificationAllowed] = useState<boolean>(true);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [lang, setLang] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const handleClickDialog = () => {
  //   console.log('YES');
  //   setIsShowDialog(false);
  // };
  useEffect(() => {
    setIsLoading(true)
    const changeLanguage = async () => {
      if (lang) {
        try {
          const deviceToken = await AsyncStorage.getItem("deviceToken");
          const data = {
            deviceToken: deviceToken ?? "",
            language: lang === "ko" ? LANG.KR : LANG.EN
          }
          const res = await authService.changeLanguage(data);
          console.log("43", res)
          if (res.code === 200) {
            LanguageModule.setLanguage(lang, (response: string) => {
              console.log(response);
            });
            i18n.changeLanguage(lang);
            await AsyncStorage.setItem('language', lang);
          }
        } catch (error: any) {
          if (error?.response?.status === 400) {
            console.log(error.response.data.message)
          }
        } finally {
          setIsLoading(false);
        }

      }
    };
    changeLanguage();
  }, [lang]);
  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('language');
        if (storedLang) {
          setLang(storedLang);
        } else {
          setLang('en');
        }
      } catch (error) {
        console.error('Failed to fetch language from AsyncStorage:', error);
      }
    };
    fetchLanguage();
  }, []);
  console.log("lang11111", lang)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderNavigatorComponent
          text={t("home.setting")}
          isIconLeft={true}
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={{ marginTop: 40 }} />
        <CategoryComponent
          text={t("setting.putAlarm")}
          handleOnPress={() => {
            navigation.navigate(SCREENS_NAME.SETTING.SETTING_NOTIFICATION);
          }}
        />
        <View style={styles.divide} />
        <CategoryComponent
          text={t("setting.changePass")}
          handleOnPress={() => {
            navigation.navigate(SCREENS_NAME.SETTING.CHANGE_PASSWORD);
          }}
        />
        <View style={styles.divide} />
        <CategoryComponent text={t("setting.language")} setLang={setLang} lang={lang} handleOnPress={() => { }} />
        <View style={styles.divide} />
        <CategoryComponent
          text={t("setting.logout")}
          handleOnPress={() => {
            navigation.navigate(SCREENS_NAME.SETTING.SETTING_LOGOUT);
          }}
        />
      </View>
      {isLoading && <LoadingScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen * 2,
    height: HeightDevice,
    backgroundColor: colors.white,
  },
  divide: {
    height: 1,
    backgroundColor: colors.gray_G02,
    width: '100%',
  },
});

export default Setting;
