import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {paddingHorizontalScreen} from '../../styles/padding';
import {HeightDevice} from '../../util/Dimenssion';
import colors from '../../constant/color';
import HeaderNavigatorComponent from '../../component/header-navigator';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IMAGE} from '../../constant/image';
import {flexRow} from '../../styles/flex';
import CategoryComponent from '../../component/category';
import HospitalScheduleComponent from './component/HospitalScheduleComponent';
import HospitalScheduleButtonComponent from './component/HospitalScheduleButtonComponent';
import {TypeMakeHospitalSchedule} from './const';
import {SCREENS_NAME} from '../../navigator/const';

const ProfileMakeHospitalSchedule = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleMyHealthMissionStatement = () => {};

  const handleClinicalSurvey = () => {};

  const handleCreateSchedule = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.NEW_HOSPITAL_SCHEDULE);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <HeaderNavigatorComponent
          text="병원 일정 설정"
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={styles.container}>
        <View style={{marginTop: 20}} />
        <View>
          <HospitalScheduleComponent
            typeMakeHospitalSchedule={TypeMakeHospitalSchedule.HEALTH_CHECKUP}
          />
          <HospitalScheduleComponent
            typeMakeHospitalSchedule={TypeMakeHospitalSchedule.HEALTH_CHECKUP}
          />
          <HospitalScheduleComponent
            typeMakeHospitalSchedule={TypeMakeHospitalSchedule.SEE_DOCTOR}
          />
        </View>
        <View style={{marginTop: 10}} />
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
