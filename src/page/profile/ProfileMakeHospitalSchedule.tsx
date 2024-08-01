import { SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { paddingHorizontalScreen } from '../../styles/padding';
import colors from '../../constant/color';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import HospitalScheduleComponent from './component/HospitalScheduleComponent';
import HospitalScheduleButtonComponent from './component/HospitalScheduleButtonComponent';
import { SCREENS_NAME } from '../../navigator/const';
import { useCallback, useEffect, useState } from 'react';
import { medicalAppointmentService } from '../../services/medicalAppointment';
import { appointment } from '../../constant/type/medical';
import LoadingScreen from '../../component/loading';
import { useTranslation } from 'react-i18next';

const ProfileMakeHospitalSchedule = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [listAppointments, setListAppointments] = useState<appointment[]>([]);
  const [messageError, setMessageError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false)
  const { t } = useTranslation()
  const handleCreateSchedule = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.NEW_HOSPITAL_SCHEDULE);
  };
  const fetchListAppointment = async () => {
    setIsLoading(true)
    try {
      const res = await medicalAppointmentService.getAll();
      if (res.code === 200) {
        console.log("aa", res.result)
        setMessageError("");
        setIsLoading(false)
        setListAppointments(res.result);
      } else {
        setMessageError("Failed to fetch questions.");
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
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
    fetchListAppointment()
  }, [])
  useFocusEffect(
    useCallback(() => {
      fetchListAppointment();
    }, [])
  );
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.header}>
          <HeaderNavigatorComponent
            text={t("hospital.setYourHospital")}
            isIconLeft={true}
            handleClickArrowLeft={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.container}>
          {listAppointments && listAppointments.map((item) => (
            <HospitalScheduleComponent
              key={item.id}
              typeMakeHospitalSchedule={item.typeMedicalAppointment}
              appointment={item}
            />
          ))}
          {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
          <View style={styles.buttonContainer}>
            <HospitalScheduleButtonComponent handleOnPress={handleCreateSchedule} />
          </View>
        </View>
      </ScrollView>
      {isLoading && <LoadingScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: paddingHorizontalScreen * 2,
  },
  container: {
    flex: 1,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.background,
    paddingTop: 10
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  buttonContainer: {
    flexShrink: 0,
    paddingVertical: 10,
  },
  textName: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginLeft: 12,
  },
  textError: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.red
  },
});

export default ProfileMakeHospitalSchedule;
