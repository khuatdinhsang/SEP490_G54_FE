import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputShareComponent from '../../../components/InputShareComponent';
import InputComponent from '../../../../../component/input';
import { useTranslation } from 'react-i18next';
import { lessonService } from '../../../../../services/lesson';

interface Step3Props {
  onSubmit: (values: { address: string, time: string }) => void,
  setIsDisabled: (value: boolean) => void,
  setIsLoading: (value: boolean) => void
}
const Step3_1 = (props: Step3Props) => {
  const { onSubmit, setIsDisabled, setIsLoading } = props
  const { t } = useTranslation()
  const [address, setAddress] = useState<string>('');
  const [errAddress, setErrAddress] = useState<string>("")
  const [time, setTime] = useState<string>('');
  const [errTime, setErrTime] = useState<string>('');
  const [messageError, setMessageError] = useState<string>("")
  useEffect(() => {
    onSubmit({ address, time })
    const isDisabled = (address && time && !errAddress.length && !errTime.length) ? false : true
    setIsDisabled(isDisabled)
  }, [time, address, setIsDisabled])

  useEffect(() => {
    const getDataLesson3 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson3()
        if (res.code === 200) {
          setMessageError("");
          setAddress(res.result.prefrerredEnvironment)
          setTime(res.result.prefrerredTime)
          setIsLoading(false)
        } else {
          setMessageError("Unexpected error occurred.");
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
    }
    getDataLesson3()
  }, [])
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent
          textLeft="Step3"
          text={t("lesson.createEnvironment")}
        />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={115}
          content={t("lesson.writeEnvironment")}
        />
        <View style={{ marginTop: 30 }} />
        <Text style={styles.text}>
          <Text style={{ fontWeight: '700' }}>{t("lesson.bestEnvironment")}</Text>
          {'\n'}
          {t("lesson.writePlacesAndTime")}
        </Text>
        <View style={{ marginTop: 32 }} />
        <InputComponent
          value={address}
          onChangeText={(value) => {
            setErrAddress("")
            if (value?.trim()?.length === 0) {
              setErrAddress(t("placeholder.err.invalidInput"))
              setAddress("")
            }
            setAddress(value)
          }}
          placeholder={t("lesson.example5")}
          label={t("lesson.location")}
          heightLine={50}
          textError={errAddress}
        />
        <View style={{ marginTop: 15 }} />
        <InputComponent
          value={time}
          onChangeText={(value) => {
            setErrTime("")
            if (value?.trim()?.length === 0) {
              setErrTime(t("placeholder.err.invalidInput"))
              setTime("")
            }
            setTime(value)
          }}
          placeholder={t("lesson.example6")}
          label={t("common.text.hours")}
          heightLine={50}
          textError={errTime}
        />
        {messageError && <Text style={styles.textError}>{messageError}</Text>}
        <View style={{ paddingBottom: 40 }} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G07,
  },
  textError: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.red
  }
});
export default Step3_1;
