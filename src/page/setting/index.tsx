import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import colors from '../../constant/color';
import CategoryComponent from '../../component/category';
import { paddingHorizontalScreen } from '../../styles/padding';
import { HeightDevice } from '../../util/Dimenssion';
import { SCREENS_NAME } from '../../navigator/const';
import RangeBlock from '../../component/range-block';
import BarChart from '../../component/bar-chart';
import LineChart from '../../component/line-chart';

const Setting = () => {
  const { t, i18n } = useTranslation();

  const [isShowDialog, setIsShowDialog] = useState<boolean>(true);
  const [notificationAllowed, setNotificationAllowed] = useState<boolean>(true);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleClickDialog = () => {
    console.log('YES');
    setIsShowDialog(false);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderNavigatorComponent
          text="설정"
          isIconLeft={true}
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={{ marginTop: 40 }} />
        <CategoryComponent
          text="푸시알림"
          handleOnPress={() => {
            navigation.navigate(SCREENS_NAME.SETTING.SETTING_NOTIFICATION);
          }}
        />
        <View style={styles.divide} />
        <CategoryComponent
          text="비밀번호 변경"
          handleOnPress={() => {
            navigation.navigate(SCREENS_NAME.SETTING.CHANGE_PASSWORD);
          }}
        />
        <View style={styles.divide} />
        <CategoryComponent text="앱정보" handleOnPress={() => { }} />
        <View style={styles.divide} />
        <CategoryComponent
          text="로그아웃"
          handleOnPress={() => {
            navigation.navigate(SCREENS_NAME.SETTING.SETTING_LOGOUT);
          }}
        />
      </View>
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
