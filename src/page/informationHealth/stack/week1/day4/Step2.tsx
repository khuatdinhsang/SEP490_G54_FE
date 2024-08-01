import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputChart from './components/InputChart';
import LineChart from './components/LineChart';
import { lessonService } from '../../../../../services/lesson';
import LoadingScreen from '../../../../../component/loading';
import { useTranslation } from 'react-i18next';
export interface TypeErrorDay4 {
  err1?: string,
  err2?: string,
  err3?: string,
  err4?: string,
  err5?: string
}
interface Step2Props {
  step: number,
  setIsDisabled: (value: boolean) => void
  onSubmit: (value: { x: string, y: number }[]) => void,
  setIsLoading: (value: boolean) => void,
}
const Step2 = (props: Step2Props) => {
  const { t } = useTranslation()
  const { step, setIsDisabled, onSubmit, setIsLoading } = props
  const [error, setError] = useState<TypeErrorDay4>({})
  const [messageError, setMessageError] = useState<string>("")
  const [data, setData] = useState<
    Array<{ x: string; y: number; label?: string }>
  >([
    { x: '10대', y: 0 },
    { x: '20대', y: 0 },
    { x: '30대', y: 0 },
    { x: '40대', y: 0 },
    { x: '50대', y: 0 },
  ]);
  useEffect(() => {
    const getDataLesson4 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson4()
        if (res.code === 200) {
          console.log("44", res.result.score10)
          setIsLoading(false)
          setMessageError("");
          const oldData = [
            { x: '10대', y: res.result.score10 },
            { x: '20대', y: res.result.score20 },
            { x: '30대', y: res.result.score30 },
            { x: '40대', y: res.result.score40 },
            { x: '50대', y: res.result.score50 },
          ]
          setData(oldData)
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
    getDataLesson4()
  }, [])
  useEffect(() => {
    const isAllErrorsEmpty = (error: TypeErrorDay4) => {
      return Object.values(error).every(value => value === '');
    };
    const areAllFieldsFilled = (data: Array<{ x: string; y: number; label?: string }>) => {
      return data.every(field => field.y > 0);
    };
    const isDisable = !(step === 2 && areAllFieldsFilled(data) && isAllErrorsEmpty(error));
    setIsDisabled(isDisable)
    onSubmit(data)
  }, [step, data, error])

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text={t("lesson.drawingCurve")} />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.letSetScores")}
        />
        <LineChart domainY={[0, 100]} data={data} />
        <InputChart
          data={data}
          setData={setData}
          error={error}
          setError={setError}
        />
        {messageError && <Text style={styles.textError}>{messageError}</Text>}
        <View style={{ paddingBottom: 30 }} />
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
