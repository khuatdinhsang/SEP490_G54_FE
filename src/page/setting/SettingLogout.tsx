import { CommonActions, ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../component/button';
import HeaderNavigatorComponent from '../../component/header-navigator';
import colors from '../../constant/color';
import { paddingHorizontalScreen } from '../../styles/padding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREENS_NAME } from '../../navigator/const';
import { useState } from 'react';
import LoadingScreen from '../../component/loading';
import { removeAsyncStorageWhenLogout } from '../../util';
import { authService } from '../../services/auth';

const SettingLogout = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>("")
  const handlePressYesLogout = async () => {
    setIsLoading(true)
    try {
      const res = await authService.logout()
      if (res.code === 200) {
        setIsLoading(false)
        await removeAsyncStorageWhenLogout()
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: SCREENS_NAME.LOGIN.MAIN }],
          }),
        );
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Unexpected error occurred.");
      }
    }
    finally {
      setIsLoading(false)
    }

  };

  const handlePressNoLogout = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <HeaderNavigatorComponent
        text={t("setting.logout")}
        isIconLeft={true}
        handleClickArrowLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ marginTop: 38 }} />
      <Text style={styles.title}>{t("setting.wouldYouLogout")}</Text>
      <ButtonComponent text={t("common.text.yes")} handleClick={handlePressYesLogout} />
      <View style={{ marginTop: 10 }} />
      <ButtonComponent
        text={t("common.text.no")}
        handleClick={handlePressNoLogout}
        backgroundColor={colors.black}
      />
      {errorMessage && !isLoading && <Text style={styles.textError}>{errorMessage}</Text>}
      {isLoading && <LoadingScreen />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen * 2,
    flex: 1,
    paddingBottom: 30,
  },
  title: {
    color: colors.black,
    fontSize: 18,
    fontWeight: '500',
    lineHeight: 28,
    marginVertical: 20,
  },
  textError: {
    fontWeight: '500',
    fontSize: 14,
    color: colors.red
  }
});

export default SettingLogout;
