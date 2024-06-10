import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import ButtonComponent from '../../component/button';
import HeaderNavigatorComponent from '../../component/header-navigator';
import colors from '../../constant/color';
import {flexRowCenter} from '../../styles/flex';
import {paddingHorizontalScreen} from '../../styles/padding';
import HospitalScheduleInputComponent from './component/HospitalScheduleInputComponent';
import HospitalTypeComponent from './component/HospitalTypeComponent';
import {TypeMakeHospitalSchedule} from './const';

const ProfileNewHospitalSchedule = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [typeMakeHospitalSchedule, setTypeMakeHospitalSchedule] = useState<
    TypeMakeHospitalSchedule | undefined
  >(undefined);
  const [year, setYear] = useState<string>('');
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [isDisable, setIsDisable] = useState<boolean>(true);

  const handleCreateSchedule = () => {
    console.log('YES');
  };

  const handleSetTypeMakeHospitalScheduleSeeDoctor = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.SEE_DOCTOR);
  };

  const handleSetTypeMakeHospitalScheduleHealthCheckup = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.HEALTH_CHECKUP);
  };

  const eventChange = () => {
    if (year && month && day && address && note) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <HeaderNavigatorComponent
          text="병원 일정 등록"
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{marginTop: 10}} />
          <View style={styles.component}>
            <Text style={styles.label}>병원방문 목적</Text>
            <View style={flexRowCenter}>
              <HospitalTypeComponent
                state={typeMakeHospitalSchedule}
                handleOnPress={handleSetTypeMakeHospitalScheduleSeeDoctor}
                type={TypeMakeHospitalSchedule.SEE_DOCTOR}
              />
              <View style={{marginHorizontal: 8}} />
              <HospitalTypeComponent
                state={typeMakeHospitalSchedule}
                handleOnPress={handleSetTypeMakeHospitalScheduleHealthCheckup}
                type={TypeMakeHospitalSchedule.HEALTH_CHECKUP}
              />
            </View>
          </View>
          <View style={styles.component}>
            <Text style={styles.label}>날짜선택</Text>
            <View style={flexRowCenter}>
              <HospitalScheduleInputComponent
                note="년"
                changeText={text => {
                  setYear(text);
                  eventChange();
                }}
                state={year}
              />
              <View style={{marginHorizontal: 5}} />
              <HospitalScheduleInputComponent
                note="월"
                changeText={text => {
                  setMonth(text);
                  eventChange();
                }}
                state={month}
              />
              <View style={{marginHorizontal: 5}} />
              <HospitalScheduleInputComponent
                note="일"
                changeText={text => {
                  setDay(text);
                  eventChange();
                }}
                state={day}
              />
            </View>
          </View>
          <View style={styles.component}>
            <Text style={styles.label}>장소</Text>
            <TextInput
              style={styles.input}
              placeholder="예시) 서울대병원"
              placeholderTextColor={colors.gray_G04}
              onChangeText={text => {
                setAddress(text);
                eventChange();
              }}
            />
          </View>
          <View style={styles.component}>
            <Text style={styles.label}>메모</Text>
            <TextInput
              style={[styles.input, {height: 120}]}
              placeholder="예시) 서울대병원"
              placeholderTextColor={colors.gray_G04}
              onChangeText={text => {
                setNote(text);
                eventChange();
              }}
            />
          </View>
          <View style={{marginTop: 15}} />
          <ButtonComponent
            handleClick={handleCreateSchedule}
            text="저장"
            isDisable={isDisable}
          />
          <View style={{paddingTop: 20}} />
        </View>
      </ScrollView>
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
  label: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginBottom: 12,
  },
  component: {
    marginVertical: 14,
  },
  input: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderColor: colors.gray_G03,
    borderWidth: 1,
    borderRadius: 8,
    color: colors.black,
  },
});

export default ProfileNewHospitalSchedule;
