import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import {
  Pressable,
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
import { flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import { paddingHorizontalScreen } from '../../styles/padding';
import HospitalScheduleInputComponent from './component/HospitalScheduleInputComponent';
import HospitalTypeComponent from './component/HospitalTypeComponent';
import { TypeMakeHospitalSchedule } from './const';
import { useTranslation } from 'react-i18next';
import SelectDate from '../../component/inputSelectDate';
import { medicalAppointmentService } from '../../services/medicalAppointment';
import { ErrorMessage } from 'formik';
import { SCREENS_NAME } from '../../navigator/const';
import LoadingScreen from '../../component/loading';
import InputNumber from '../../component/inputNumber';
import { padNumber } from '../../util';

const ProfileNewHospitalSchedule = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [typeMakeHospitalSchedule, setTypeMakeHospitalSchedule] = useState<
    TypeMakeHospitalSchedule | undefined
  >(undefined);
  const [year, setYear] = useState<string>("")
  const [month, setMonth] = useState<string>("")
  const [day, setDay] = useState<string>("")
  const [address, setAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const [messageError, setMessageError] = useState<string>("")
  const [isValidTime, setIsValidTime] = useState<string>("")
  const handleCreateSchedule = async (): Promise<any> => {
    const date = new Date(Date.UTC(Number(year)), Number(Number(month) - 1), Number(day))
    setIsLoading(true)
    if (date.getTime() < Date.now()) {
      setIsValidTime("Invalid time")
      setIsLoading(false)
      return
    }
    const transformData = {
      location: address,
      note,
      date: `${year}-${padNumber(Number(month))}-${day}`,
      type: typeMakeHospitalSchedule
    }
    try {
      const res = await medicalAppointmentService.create(transformData)
      if (res.code === 201) {
        setIsLoading(false)
        navigation.navigate(SCREENS_NAME.PROFILE.MAKE_HOSPITAL_SCHEDULE)
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
  const handleSetTypeMakeHospitalScheduleSeeDoctor = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.DIAGNOSIS);
  };
  const handleSetTypeMakeHospitalScheduleHealthCheckup = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.MEDICAL_CHECKUP);
  };
  const isDisable = typeMakeHospitalSchedule && year && month && day && address && note ? false : true
  const handleSetYear = (value: any) => {
    setIsValidTime("")
    if (!value) {
      setError(t('placeholder.err.blank'));
      setYear("")
      return;
    }
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(value)) {
      setYear(value);
      setError('');
    } else {
      setError(t('placeholder.err.number'));
    }
  };
  const handleSetMonth = (value: any) => {
    setIsValidTime("")
    if (!value) {
      setError(t('placeholder.err.blank'));
      setMonth("")
      return;
    }
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(value)) {
      setMonth(value);
      setError('');
    } else {
      setError(t('placeholder.err.number'));
    }
  };
  const handleSetDay = (value: any) => {
    setIsValidTime("")
    if (!value) {
      setError(t('placeholder.err.blank'));
      setDay("")
      return;
    }
    const numericRegex = /^[0-9]*$/;
    if (numericRegex.test(value)) {
      setDay(value);
      setError('');
    } else {
      setError(t('placeholder.err.number'));
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <HeaderNavigatorComponent
          text="병원 일정 등록"
          isIconLeft={true}
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={{ marginTop: 10 }} />
          <View style={styles.component}>
            <Text style={styles.label}>병원방문 목적</Text>
            <View style={flexRowCenter}>
              <HospitalTypeComponent
                state={typeMakeHospitalSchedule}
                handleOnPress={handleSetTypeMakeHospitalScheduleSeeDoctor}
                type={TypeMakeHospitalSchedule.DIAGNOSIS}
              />
              <View style={{ marginHorizontal: 8 }} />
              <HospitalTypeComponent
                state={typeMakeHospitalSchedule}
                handleOnPress={handleSetTypeMakeHospitalScheduleHealthCheckup}
                type={TypeMakeHospitalSchedule.MEDICAL_CHECKUP}
              />
            </View>
          </View>
          <View style={styles.component}>
            <Text style={styles.label}>날짜선택</Text>
            {/* <View style={[flexRowSpaceBetween, { width: '100%' }]}>
              <View style={{ width: '31%' }}>
                <SelectDate
                  value={year}
                  text={t('common.text.year')}
                  textButton={t('common.text.next')}
                  toggleModalScroll={toggleYearScroll}
                  handleChange={handleYearChange}
                  showScroll={showYearScroll}
                  length={4}
                  type={'yearPlus'}
                />
              </View>
              <View style={{ width: '31%' }}>
                <SelectDate
                  value={month}
                  text={t('common.text.month')}
                  textButton={t('common.text.next')}
                  toggleModalScroll={toggleMonthScroll}
                  handleChange={handleMonthChange}
                  showScroll={showMonthScroll}
                  length={12}
                  type={'month'}
                />
              </View>
              <View style={{ width: '31%' }}>
                <SelectDate
                  value={day}
                  text={t('common.text.day')}
                  textButton={t('common.text.next')}
                  toggleModalScroll={toggleDayScroll}
                  handleChange={handleDayChange}
                  showScroll={showDayScroll}
                  length={getMaxDaysInMonth(year, month)}
                  type={'day'}
                />
              </View>
            </View> */}
            <View style={[flexRowSpaceBetween, { width: '100%' }]}>
              <Pressable style={{ width: '30%' }}>
                <InputNumber
                  textRight={t('common.text.year')}
                  value={year}
                  keyboardType="numeric"
                  handleSetValue={handleSetYear}
                />
              </Pressable>
              <Pressable style={{ width: '30%' }}>
                <InputNumber
                  textRight={t('common.text.month')}
                  value={month}
                  keyboardType="numeric"
                  handleSetValue={handleSetMonth}
                />
              </Pressable>
              <Pressable style={{ width: '30%' }}>
                <InputNumber
                  textRight={t('common.text.day')}
                  value={day}
                  keyboardType="numeric"
                  handleSetValue={handleSetDay}
                />
              </Pressable>
            </View>
            {error && <Text style={styles.textError}>{error}</Text>}
            {isValidTime && !isLoading && <Text style={styles.textError}>{isValidTime}</Text>}
          </View>
          <View style={styles.component}>
            <Text style={styles.label}>장소</Text>
            <TextInput
              style={styles.input}
              placeholder="예시) 서울대병원"
              placeholderTextColor={colors.gray_G04}
              onChangeText={text => {
                setAddress(text);
              }}
            />
          </View>
          <View style={styles.component}>
            <Text style={styles.label}>메모</Text>
            <TextInput
              multiline
              textAlignVertical='top'
              style={[styles.input, { height: 120 }]}
              placeholder="예시) 서울대병원"
              placeholderTextColor={colors.gray_G04}
              onChangeText={text => {
                setNote(text);
              }}
            />
          </View>
          {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
          <View style={{ marginTop: 15 }} />
          <ButtonComponent
            handleClick={handleCreateSchedule}
            text="저장"
            isDisable={isDisable}
          />
          <View style={{ paddingTop: 20 }} />
        </View>
      </ScrollView>
      {isLoading && <LoadingScreen />}
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
  textError: {
    color: colors.red,
    fontWeight: "500",
    fontSize: 14
  }
});

export default ProfileNewHospitalSchedule;
