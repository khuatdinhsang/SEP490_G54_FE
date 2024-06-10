import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../component/button';
import HeaderNavigatorComponent from '../../component/header-navigator';
import colors from '../../constant/color';
import { paddingHorizontalScreen } from '../../styles/padding';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCREENS_NAME } from '../../navigator/const';

const SettingLogout = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePressYesLogout = async () => {
    await AsyncStorage.removeItem('accessToken');
    navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
  };

  const handlePressNoLogout = () => {
    navigation.goBack()
  };

  return (
    <View style={styles.container}>
      <HeaderNavigatorComponent
        text="로그아웃"
        handleClickArrowLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ marginTop: 38 }} />
      <Text style={styles.title}>로그아웃을 하시겠습니까?</Text>
      <ButtonComponent text="예" handleClick={handlePressYesLogout} />
      <View style={{ marginTop: 10 }} />
      <ButtonComponent
        text="아니오"
        handleClick={handlePressNoLogout}
        backgroundColor={colors.black}
      />
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
});

export default SettingLogout;
