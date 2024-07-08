import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import ButtonComponent from '../../component/button';
import DialogSingleComponent from '../../component/dialog-single';
import HeaderNavigatorComponent from '../../component/header-navigator';
import SwitchComponent from '../../component/switch';
import { IMAGE } from '../../constant/image';
import { paddingHorizontalScreen } from '../../styles/padding';
import { notificationService } from '../../services/notification';
import LoadingScreen from '../../component/loading';
import { notificationsResponse } from '../../constant/type/notification';
import { Notification } from '../../constant';

const SettingNotification = () => {
  const { t, i18n } = useTranslation();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(false)
  const [notificationAllowed, setNotificationAllowed] = useState<boolean>(false);
  const [notificationUseApp, setNotificationUseApp] = useState<boolean>(false);
  const [notificationScheduleHealthCheck, setNotificationScheduleHealthCheck] = useState<boolean>(false);
  const [notificationPlanManagement, setNotificationPlanManagement] = useState<boolean>(false);
  const [notificationReviewMonthly, setNotificationReviewMonthly] = useState<boolean>(false);
  const [notificationReviewWeekly, setNotificationReviewWeekly] = useState<boolean>(false);
  const [notificationQA, setNotificationQA] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("")
  const [arrayNotificationSubmit, setArrayNotificationSubmit] = useState<notificationsResponse[]>([])
  const handleClickDialog = async (): Promise<void> => {
    setIsLoading(true)
    try {
      const data = {
        notificationStatusList: arrayNotificationSubmit,
        deviceToken: "abc"
      }
      const res = await notificationService.putNotification(data);
      if (res.code === 200) {
        setIsLoading(false)
        setMessageError("");
        setArrayNotificationSubmit([])
        setIsShowDialog(false)
      } else {
        setMessageError("Failed to fetch questions.");
      }
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        setMessageError(error.response.data.message);
      } else {
        setMessageError("Unexpected error occurred.");
      }
    }
    finally {
      setIsLoading(false)
    }
  };
  useEffect(() => {
    const typeNotificationList = [];
    typeNotificationList.push(
      { typeNotification: Notification.WEEKLY_REPORT_NOTIFICATION, status: notificationReviewWeekly });
    typeNotificationList.push(
      { typeNotification: Notification.MONTHLY_REPORT_NOTIFICATION, status: notificationReviewMonthly });
    typeNotificationList.push(
      { typeNotification: Notification.PLAN_NOTIFICATION, status: notificationPlanManagement });
    typeNotificationList.push(
      { typeNotification: Notification.MEDICAL_APPOINTMENT_NOTIFICATION, status: notificationScheduleHealthCheck });
    typeNotificationList.push(
      { typeNotification: Notification.DAILY_NOTIFICATION, status: notificationUseApp });
    typeNotificationList.push(
      { typeNotification: Notification.QUESTION_NOTIFICATION, status: notificationQA });
    console.log("typeNotificationList", typeNotificationList)
    setArrayNotificationSubmit(typeNotificationList)
  }, [
    notificationReviewWeekly,
    notificationReviewMonthly,
    notificationPlanManagement,
    notificationScheduleHealthCheck,
    notificationUseApp,
    notificationQA
  ]);
  const handleOnPressButton = () => {
    setIsShowDialog(true);
  };
  const updateNotifications = (notifications: notificationsResponse[]) => {
    notifications.forEach(notification => {
      switch (notification.typeNotification) {
        case Notification.DAILY_NOTIFICATION:
          setNotificationUseApp(notification.status)
          break;
        case Notification.PLAN_NOTIFICATION:
          setNotificationPlanManagement(notification.status)
          break;
        case Notification.WEEKLY_REPORT_NOTIFICATION:
          setNotificationReviewWeekly(notification.status)
          break;
        case Notification.MEDICAL_APPOINTMENT_NOTIFICATION:
          setNotificationScheduleHealthCheck(notification.status)
          break;
        case Notification.MONTHLY_REPORT_NOTIFICATION:
          setNotificationReviewMonthly(notification.status)
          break;
        case Notification.QUESTION_NOTIFICATION:
          setNotificationQA(notification.status)
          break;
        default:
          break;
      }
    })
  }
  useEffect(() => {
    const getListNotification = async () => {
      setIsLoading(true)
      try {
        const res = await notificationService.getListNotification();
        if (res.code === 200) {
          setMessageError("");
          updateNotifications(res.result)
          setIsLoading(false)
        } else {
          setMessageError("Failed to fetch questions.");
        }
      } catch (error: any) {
        if (error?.response?.status === 400 || error?.response?.status === 401) {
          setMessageError(error.response.data.message);
        } else {
          setMessageError("Unexpected error occurred.");
        }
      }
      finally {
        setIsLoading(false)
      }
    };
    getListNotification()
  }, [])


  const toggleMainSwitch = (value: boolean) => {
    setNotificationAllowed(value);
    setNotificationUseApp(value);
    setNotificationScheduleHealthCheck(value);
    setNotificationPlanManagement(value);
    setNotificationReviewMonthly(value);
    setNotificationReviewWeekly(value);
    setNotificationQA(value);
  };

  const toggleIndividualSwitch = (setFunction: React.Dispatch<React.SetStateAction<boolean>>, value: boolean) => {
    setFunction(value);
  };

  useEffect(() => {
    const allNotificationsEnabled =
      notificationUseApp &&
      notificationScheduleHealthCheck &&
      notificationPlanManagement &&
      notificationReviewMonthly &&
      notificationReviewWeekly &&
      notificationQA;

    if (allNotificationsEnabled) {
      setNotificationAllowed(true);
    } else if (!notificationUseApp || !notificationScheduleHealthCheck
      || !notificationPlanManagement || !notificationReviewMonthly
      || !notificationReviewWeekly || !notificationQA
    ) {
      setNotificationAllowed(false);
    }
  }, [
    notificationUseApp,
    notificationScheduleHealthCheck,
    notificationPlanManagement,
    notificationReviewMonthly,
    notificationReviewWeekly,
    notificationQA,
  ]);

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
          onChangeValue={toggleMainSwitch}
          style={styles.switch}
        />
        <SwitchComponent
          text="주기적 앱 사용 알림"
          value={notificationUseApp}
          onChangeValue={(value) => toggleIndividualSwitch(setNotificationUseApp, value)}
          style={styles.switch}
        />
        <SwitchComponent
          text="건강검진 및 진료 알림"
          value={notificationScheduleHealthCheck}
          onChangeValue={(value) => toggleIndividualSwitch(setNotificationScheduleHealthCheck, value)}
          style={styles.switch}
        />
        <SwitchComponent
          text="실천계획 관리 작성 알림"
          value={notificationPlanManagement}
          onChangeValue={(value) => toggleIndividualSwitch(setNotificationPlanManagement, value)}
          style={styles.switch}
        />
        <SwitchComponent
          text="월간평가 알림"
          value={notificationReviewMonthly}
          onChangeValue={(value) => toggleIndividualSwitch(setNotificationReviewMonthly, value)}
          style={styles.switch}
        />
        <SwitchComponent
          text="주간평가 알림"
          value={notificationReviewWeekly}
          onChangeValue={(value) => toggleIndividualSwitch(setNotificationReviewWeekly, value)}
          style={styles.switch}
        />
        <SwitchComponent
          text="문의하기 알림"
          value={notificationQA}
          onChangeValue={(value) => toggleIndividualSwitch(setNotificationQA, value)}
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
  switch: {
    marginVertical: 12,
  },
});

export default SettingNotification;
