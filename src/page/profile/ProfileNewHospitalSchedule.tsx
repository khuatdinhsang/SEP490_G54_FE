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
import { SCREENS_NAME } from '../../navigator/const';
import LoadingScreen from '../../component/loading';
import { dateNow, padNumber } from '../../util';
import { offsetTime } from '../../constant';

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
  const [addressError, setAddressError] = useState<string>('');
  const [noteError, setNoteError] = useState<string>('');
  const [showYearScroll, setShowYearScroll] = useState(false);
  const [showMonthScroll, setShowMonthScroll] = useState(false);
  const [showDayScroll, setShowDayScroll] = useState(false);
  const { t, i18n } = useTranslation();
  // const [isValidDate, setIsValidDate] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [checkDate, setCheckDate] = useState<Date>(new Date())
  const [date, setDate] = useState<string>("")
  const handleYearChange = (newYear: number) => {
    setYear(newYear)
    setIsValidTime("")
  };
  const handleMonthChange = (newMonth: number) => {
    setMonth(newMonth);
    setIsValidTime("")
  }
  const handleDayChange = (newDay: number) => {
    setDay(newDay)
    setIsValidTime("")
  }
  const toggleYearScroll = () => setShowYearScroll(!showYearScroll);
  const toggleMonthScroll = () => setShowMonthScroll(!showMonthScroll);
  const toggleDayScroll = () => setShowDayScroll(!showDayScroll);
  const [messageError, setMessageError] = useState<string>("")
  const [isValidTime, setIsValidTime] = useState<string>("")
  // useEffect(() => {
  //   const isValid = isValidDateForYearMonthDay(year, month, day);
  //   setIsValidDate(isValid);
  // }, [year, month, day]);
  useEffect(() => {
    setDate(`${year}-${padNumber(month)}-${day}`)
    const localDate = new Date(Date.UTC(year, month - 1, day));
    setCheckDate(localDate);
  }, [day, month, year]);

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
    setIsLoading(true)
    if (checkDate.getTime() < Date.now()) {
      setIsValidTime(t("placeholder.err.inValidTime"))
      setIsLoading(false)
      return
    }
    const transformData = {
      location: address,
      note,
      date,
      type: typeMakeHospitalSchedule
    }

    try {
      const res = await medicalAppointmentService.create(transformData)
      if (res.code === 201) {
        setIsLoading(false)
        navigation.navigate(SCREENS_NAME.PROFILE.MAKE_HOSPITAL_SCHEDULE)
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

  const handleSetTypeMakeHospitalScheduleSeeDoctor = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.DIAGNOSIS);
  };
  const handleSetTypeMakeHospitalScheduleHealthCheckup = () => {
    setTypeMakeHospitalSchedule(TypeMakeHospitalSchedule.MEDICAL_CHECKUP);
  };
  const isDisable = typeMakeHospitalSchedule && address && note ? false : true

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        <HeaderNavigatorComponent
          text={t("hospital.registerHospital")}
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
            <Text style={styles.label}>{t("hospital.purposeHospital")}</Text>
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
            <Text style={styles.label}>{t("hospital.selectDate")}</Text>
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
            {isValidTime && <Text style={styles.textError}>{isValidTime}</Text>}
          </View>
          <View style={styles.component}>
            <Text style={styles.label}>{t("lesson.location")}</Text>
            <TextInput
              style={styles.input}
              placeholder={t("hospital.example1")}
              maxLength={200}
              placeholderTextColor={colors.gray_G04}
              onChangeText={text => {
                setAddressError("")
                if (text.trim().length === 0) {
                  setAddressError(t("placeholder.err.invalidInput"))
                  setAddress("")
                }
                setAddress(text);
              }}
            />
          </View>
          {addressError && <Text style={styles.textError}>{addressError}</Text>}
          <View style={styles.component}>
            <Text style={styles.label}>{t("hospital.note")}</Text>
            <TextInput
              multiline
              maxLength={200}
              textAlignVertical='top'
              style={[styles.input, { height: 120 }]}
              placeholder={t("hospital.example2")}
              placeholderTextColor={colors.gray_G04}
              onChangeText={text => {
                setNoteError("")
                if (text.trim().length === 0) {
                  setNoteError(t("placeholder.err.invalidInput"))
                  setNote("")
                }
                setNote(text);
              }}
            />
          </View>
          {noteError && <Text style={styles.textError}>{noteError}</Text>}
          {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
          <View style={{ marginTop: 15 }} />
          <ButtonComponent
            handleClick={handleCreateSchedule}
            text={t("hospital.save")}
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