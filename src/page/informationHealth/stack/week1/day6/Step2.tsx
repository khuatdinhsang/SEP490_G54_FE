import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InputComponent from '../../../../../component/input';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import TickComponent from './component/TickComponent';
import LoadingScreen from '../../../../../component/loading';
import { putLesson6 } from '../../../../../constant/type/lesson';
import { lessonService } from '../../../../../services/lesson';
import { useTranslation } from 'react-i18next';

interface Step2Props {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: putLesson6) => void;
  setIsLoading(value: boolean): void;
}
const Step2 = (props: Step2Props) => {
  const { isDisabled, setIsDisabled, onSubmit, setIsLoading } = props;
  const [isTick1, setIsTick1] = useState(false);
  const [isTick2, setIsTick2] = useState(false);
  const [isTick3, setIsTick3] = useState(false);
  const [isTick4, setIsTick4] = useState(false);
  const { t } = useTranslation()
  const [messageError, setMessageError] = useState<string>("")
  useEffect(() => {
    setIsDisabled(true);
  }, []);
  useEffect(() => {
    const getDataLesson6 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson6()
        if (res.code === 200) {
          setIsLoading(false)
          setMessageError("");
          setIsTick1(res.result.noMoreThan2)
          setIsTick2(res.result.todoList)
          setIsTick3(res.result.noProcastinating)
          setIsTick4(res.result.doExercises)
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
    getDataLesson6()
  }, [])

  useEffect(() => {
    onSubmit({
      noMoreThan2: isTick1,
      todoList: isTick2,
      noProcastinating: isTick3,
      doExercises: isTick4
    })
    if (isTick1 || isTick2 || isTick3 || isTick4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isTick1, isTick2, isTick3, isTick4]);

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text={t("lesson.developToChange")} />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={310}
          content={`${t("lesson.importantPartOfLive")} ${t("lesson.comeToChange")} ${t("lesson.hisBook")} ${t("lesson.putIntoPractice")}`}
        />

        <View style={{ marginTop: 20 }} />
        <TickComponent
          isTick={isTick1}
          setIsTick={setIsTick1}
          content={t("lesson.thingSameTime")}
        />
        <View style={{ marginVertical: 7 }} />
        <TickComponent
          isTick={isTick2}
          setIsTick={setIsTick2}
          content={t("lesson.listOfTodo")}
        />
        <View style={{ marginVertical: 7 }} />
        <TickComponent
          isTick={isTick3}
          setIsTick={setIsTick3}
          content={t("lesson.putOff")}
        />
        <View style={{ marginVertical: 7 }} />
        <TickComponent
          isTick={isTick4}
          setIsTick={setIsTick4}
          content={t("lesson.trainYourBody")}
        />
        <View style={{ marginVertical: 7 }} />
      </ScrollView>
      {messageError && <Text style={styles.textError}>{messageError}</Text>}
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
    color: colors.red,
    fontSize: 14
  }

});
export default Step2;
