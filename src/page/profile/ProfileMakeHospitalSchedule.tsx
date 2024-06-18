import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { paddingHorizontalScreen } from '../../styles/padding';
import { HeightDevice } from '../../util/Dimenssion';
import colors from '../../constant/color';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IMAGE } from '../../constant/image';
import { flexRow } from '../../styles/flex';
import CategoryComponent from '../../component/category';
import HospitalScheduleComponent from './component/HospitalScheduleComponent';
import HospitalScheduleButtonComponent from './component/HospitalScheduleButtonComponent';
import { TypeMakeHospitalSchedule } from './const';
import { SCREENS_NAME } from '../../navigator/const';
import { useCallback, useState } from 'react';
import { medicalAppointmentService } from '../../services/medicalAppointment';
import { appointment } from '../../constant/type/medical';

const ProfileMakeHospitalSchedule = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [listAppointments, setListAppointments] = useState<appointment[]>([])
  const [messageError, setMessageError] = useState<string>("")
  const handleMyHealthMissionStatement = () => { };
  const handleClinicalSurvey = () => { };
  const handleCreateSchedule = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.NEW_HOSPITAL_SCHEDULE);
  };
  const fetchListAppointment = async () => {
    try {
      const res = await medicalAppointmentService.getAll();
      console.log("Res", res);
      if (res.code === 200) {
        console.log("33", res)
        setListAppointments(res.result);
      } else {
        setMessageError("Failed to fetch questions.");
      }
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        setMessageError(error.message);
      } else {
        setMessageError("Unexpected error occurred.");
      }
    }
  };
  useFocusEffect(
    useCallback(() => {
      fetchListAppointment();
    }, [])
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <HeaderNavigatorComponent
          text="병원 일정 설정"
          isIconLeft={true}
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={{ marginTop: 20 }} />
        <View>
          {listAppointments && listAppointments.map((item) => {
            return (
              <HospitalScheduleComponent
                key={item.id}
                typeMakeHospitalSchedule={item.typeMedicalAppointment}
                appointment={item}
              />
            )
          })}
        </View>
        <View style={{ marginTop: 10 }} />
        <HospitalScheduleButtonComponent handleOnPress={handleCreateSchedule} />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: paddingHorizontalScreen * 2,
  },
  container: {
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.gray_G01,
    flex: 1,
  },
  name: {},
  textName: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginLeft: 12,
  },
});

export default ProfileMakeHospitalSchedule;
