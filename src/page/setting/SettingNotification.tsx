import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ButtonComponent from '../../component/button';
import DialogSingleComponent from '../../component/dialog-single';
import HeaderNavigatorComponent from '../../component/header-navigator';
import SwitchComponent from '../../component/switch';
import { IMAGE } from '../../constant/image';
import { paddingHorizontalScreen } from '../../styles/padding';

const SettingNotification = () => {
  const { t, i18n } = useTranslation();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [notificationAllowed, setNotificationAllowed] =
    useState<boolean>(false);
  const [notificationUseApp, setNotificationUseApp] = useState<boolean>(false);
  const [notificationScheduleHealthCheck, setNotificationScheduleHealthCheck] =
    useState<boolean>(true);
  const [notificationPlanManagement, setNotificationPlanManagement] =
    useState<boolean>(false);
  const [notificationReviewMonthly, setNotificationReviewMonthly] =
    useState<boolean>(false);
  const [notificationReviewWeekly, setNotificationReviewWeekly] =
    useState<boolean>(true);
  const [notificationQA, setNotificationQA] = useState<boolean>(false);

  const handleClickDialog = () => {
    console.log('YES');
    setIsShowDialog(false);
  };

  const handleOnPressButton = () => {
    setIsShowDialog(true);
  };

  return (
    <View style={styles.container}>
      <HeaderNavigatorComponent
        text="푸시알림"
        isIconLeft={true}
        handleClickArrowLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{ marginTop: 30 }} />
      <View style={{ flex: 1 }}>
        <SwitchComponent
          text="전체 알림 설정"
          value={notificationAllowed}
          onChangeValue={setNotificationAllowed}
          style={styles.switch}
        />
        <SwitchComponent
          text="주기적 앱 사용 알림"
          value={notificationUseApp}
          onChangeValue={setNotificationUseApp}
          style={styles.switch}
        />
        <SwitchComponent
          text="건강검진 및 진료 알림"
          value={notificationScheduleHealthCheck}
          onChangeValue={setNotificationScheduleHealthCheck}
          style={styles.switch}
        />
        <SwitchComponent
          text="실천계획 관리 작성 알림"
          value={notificationPlanManagement}
          onChangeValue={setNotificationPlanManagement}
          style={styles.switch}
        />
        <SwitchComponent
          text="월간평가 알림"
          value={notificationReviewMonthly}
          onChangeValue={setNotificationReviewMonthly}
          style={styles.switch}
        />
        <SwitchComponent
          text="주간평가 알림"
          value={notificationReviewWeekly}
          onChangeValue={setNotificationReviewWeekly}
          style={styles.switch}
        />
        <SwitchComponent
          text="문의하기 알림"
          value={notificationQA}
          onChangeValue={setNotificationQA}
          style={styles.switch}
        />
      </View>
      <ButtonComponent text="저장" handleClick={handleOnPressButton} />
      <DialogSingleComponent
        isOverlay={true}
        isActive={isShowDialog}
        handleClickButton={handleClickDialog}
        title="저장이 완료됐습니다."
        content="설정한 알림을 받아볼 수 있습니다."
        imageSource={IMAGE.ICON_CHECK_COLOR}
        buttonText="확인"
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
  switch: {
    marginVertical: 12,
  },
});

export default SettingNotification;
