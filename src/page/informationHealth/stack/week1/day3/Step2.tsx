import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputShareComponent from '../../../components/InputShareComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { setClosePerson1Redux, setClosePerson2Redux } from '../../../../../store/closePerson.slice';
import LoadingScreen from '../../../../../component/loading';
import { lessonService } from '../../../../../services/lesson';
import { useTranslation } from 'react-i18next';

interface Step2Props {
  setIsDisabled: (value: boolean) => void,
  step: number,
  setStep: (value: number) => void,
  setUser: (value: number) => void,
  setIsLoading: (value: boolean) => void,
  closePerson2EvaluationRedux: string,
  closePerson1EvaluationRedux: string,
  closePerson1MessageRedux: string,
  closePerson2MessageRedux: string
}
const Step2 = (props: Step2Props) => {
  const {
    setIsDisabled, step, setStep, setUser, setIsLoading,
    closePerson2EvaluationRedux,
    closePerson1EvaluationRedux,
    closePerson1MessageRedux,
    closePerson2MessageRedux
  } = props
  const dispatch = useDispatch();
  const { t } = useTranslation()
  const closePerson1Redux = useSelector((state: RootState) => state.closePerson.closePerson1);
  const closePerson2Redux = useSelector((state: RootState) => state.closePerson.closePerson2);
  const [closePerson1, setClosePerson1] = useState<string>(closePerson1Redux)
  const [closePerson2, setClosePerson2] = useState<string>(closePerson2Redux)
  const [messageError, setMessageError] = useState<string>("")
  // useEffect(() => {
  //   const getDataLesson3 = async () => {
  //     setIsLoading(true)
  //     try {
  //       const res = await lessonService.getLesson3()
  //       if (res.code === 200) {
  //         setMessageError("");
  //         setClosePerson1(res.result.closePerson1 ?? "")
  //         setClosePerson2(res.result.closePerson2 ?? "")
  //         setIsLoading(false)
  //       } else {
  //         setMessageError("Unexpected error occurred.");
  //       }
  //     } catch (error: any) {
  //       if (error?.response?.status === 400) {
  //         setMessageError(error.response.data.message);
  //       } else {
  //         setMessageError("Unexpected error occurred.");
  //       }
  //     }
  //     finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   getDataLesson3()
  // }, [])

  useEffect(() => {
    dispatch(setClosePerson1Redux(closePerson1?.trim()));
    dispatch(setClosePerson2Redux(closePerson2?.trim()));
  }, [closePerson1, closePerson2, dispatch]);

  useEffect(() => {
    const isDisable = !(
      closePerson1EvaluationRedux?.trim()?.length > 0 &&
      closePerson2EvaluationRedux?.trim()?.length > 0 &&
      closePerson1MessageRedux?.trim()?.length > 0 &&
      closePerson2MessageRedux?.trim()?.length > 0 &&
      closePerson1?.trim()?.length > 0 &&
      closePerson2?.trim()?.length > 0
    );
    console.log("80", isDisable)
    setIsDisabled(isDisable)
  }, [closePerson1, closePerson2, setIsDisabled])
  console.log("82", closePerson1)
  console.log("83", closePerson2)
  console.log("84", closePerson1EvaluationRedux)
  console.log("85", closePerson2EvaluationRedux)
  console.log("86", closePerson1MessageRedux)
  console.log("87", closePerson2MessageRedux)
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text={t("lesson.writeLove")} />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.writeDownThreeLove")}
        />
        <View style={{ marginTop: 20 }} />
        <Text style={styles.text}>
          {t("lesson.receiveEvaluation")}{t("lesson.clickShare")}{t("lesson.canCheck")}
        </Text>
        <View style={{ marginTop: 32 }} />
        <InputShareComponent
          text="1."
          textButton={t("common.text.share")}
          placeholder={t("common.text.name")}
          closePerson={closePerson1}
          step={step}
          setStep={setStep}
          setClosePerson={setClosePerson1}
          setUser={() => setUser(1)}
        />
        <InputShareComponent
          text="2."
          textButton={t("common.text.share")}
          placeholder={t("common.text.name")}
          closePerson={closePerson2}
          step={step}
          setStep={setStep}
          setClosePerson={setClosePerson2}
          setUser={() => setUser(2)}
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
export default Step2;
