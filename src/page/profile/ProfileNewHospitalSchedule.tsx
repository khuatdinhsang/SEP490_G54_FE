import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
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
import { flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import { paddingHorizontalScreen } from '../../styles/padding';
import HospitalScheduleInputComponent from './component/HospitalScheduleInputComponent';
import HospitalTypeComponent from './component/HospitalTypeComponent';
import { TypeMakeHospitalSchedule } from './const';
import { useTranslation } from 'react-i18next';
import SelectDate from '../../component/inputSelectDate';
import { medicalAppointmentService } from '../../services/medicalAppointment';
import { ErrorMessage } from 'formik';

const ProfileNewHospitalSchedule = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [typeMakeHospitalSchedule, setTypeMakeHospitalSchedule] = useState<
    TypeMakeHospitalSchedule | undefined
  >(undefined);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
  const [day, setDay] = useState<number>(new Date().getDate());
  const [address, setAddress] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [showYearScroll, setShowYearScroll] = useState(false);
  const [showMonthScroll, setShowMonthScroll] = useState(false);
  const [showDayScroll, setShowDayScroll] = useState(false);
  const { t, i18n } = useTranslation();
  const [isValidDate, setIsValidDate] = useState(true);
  const [date, setDate] = useState<Date>(new Date())
  const handleYearChange = (newYear: number) => setYear(newYear);
  const handleMonthChange = (newMonth: number) => setMonth(newMonth);
  const handleDayChange = (newDay: number) => setDay(newDay);
  const toggleYearScroll = () => setShowYearScroll(!showYearScroll);
  const toggleMonthScroll = () => setShowMonthScroll(!showMonthScroll);
  const toggleDayScroll = () => setShowDayScroll(!showDayScroll);
  const [messageError, setMessageError] = useState<string>("")
  useEffect(() => {
    const isValid = isValidDateForYearMonthDay(year, month, day);
    setIsValidDate(isValid);
  }, [year, month, day]);
  useEffect(() => {
    setDate(new Date(year, month - 1, day + 1));
  }, [day, month, year])
  const isLeapYear = (year: number): boolean => {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  };
  const getMaxDaysInMonth = (year: number, month: number) => {
    if (month === 2 && isLeapYear(year)) {
      return 29; // Leap year February
    } else if (month === 2) {
      return 28; // Regular February
    } else if ([4, 6, 9, 11].includes(month)) {
      return 30; // Months with 30 days
    } else {
      return 31; // Months with 31 days
    }
  };

  const isValidDateForYearMonthDay = (
    year: number,
    month: number,
    day: number,
  ) => {
    const maxDays = getMaxDaysInMonth(year, month);
    return day >= 1 && day <= maxDays;
  };

  const handleCreateSchedule = async (): Promise<any> => {
    const transformData = {
      location: address,
      note,
      date,
      type: typeMakeHospitalSchedule
    }
    try {
      const res = await medicalAppointmentService.create(transformData)
      console.log("res")
      if (res.code === 200) {
      }
    } catch (error: any) {
      if (error?.response?.status === 400 || error?.response?.status === 401) {
        setMessageError(error.message);
      } else {
        setMessageError("Unexpected error occurred.");
      }
    }

  };

  const handleSetTypeMakeHospitalScheduleSeeDoctor = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.DIAGNOSIS);
  };
  const handleSetTypeMakeHospitalScheduleHealthCheckup = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.MEDICAL_CHECKUP);
  };
  const isDisable = typeMakeHospitalSchedule && address && note ? false : true
  console.log("120", isDisable)
  console.log("121", address, note, typeMakeHospitalSchedule)

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
            <View style={[flexRowSpaceBetween, { width: '100%' }]}>
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
          {messageError && <Text style={styles.textError}>{messageError}</Text>}
          <View style={{ marginTop: 15 }} />
          <ButtonComponent
            handleClick={handleCreateSchedule}
            text="저장"
            isDisable={isDisable}
          />
          <View style={{ paddingTop: 20 }} />
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
  textError: {
    color: colors.red,
    fontWeight: "500",
    fontSize: 18
  }
});

export default ProfileNewHospitalSchedule;
