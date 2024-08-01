import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StepComponent from '../../../components/StepComponent';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import colors from '../../../../../constant/color';
import DoctorComponent from '../../../components/DoctorComponent';
import InputComponent from '../../../../../component/input';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { lessonService } from '../../../../../services/lesson';


export interface valuesStep3 {
  recentValues: string,
  influenceOnLife: string,
  newValues: string,
  reasonForChanging: string
}

interface Step3Props {
  setIsDisabled: (value: boolean) => void;
  onSubmit: (value: valuesStep3) => void;
  setIsLoading: (value: boolean) => void;
}
const Step3 = ({
  setIsDisabled, onSubmit, setIsLoading
}: Step3Props) => {
  const [err1, setErr1] = useState<string>("")
  const [err2, setErr2] = useState<string>("")
  const [err3, setErr3] = useState<string>("")
  const [err4, setErr4] = useState<string>("")
  const [recentValues, setRecentValues] = useState('');
  const [influenceOnLife, setInfluenceOnLife] = useState('');
  const [newValues, setNewValues] = useState('');
  const [reasonForChanging, setReasonForChanging] = useState('');
  const [messageError, setMessageError] = useState('');
  const { t } = useTranslation()
  useEffect(() => {
    const getDataLesson4 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson4()
        if (res.code === 200) {
          console.log("44", res.result.score10)
          setIsLoading(false)
          setMessageError("");
          setRecentValues(res.result.recentValues)
          setInfluenceOnLife(res.result.influenceOnLife)
          setNewValues(res.result.recentValues)
          setReasonForChanging(res.result.reasonForChanging)
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
    if (recentValues && influenceOnLife && newValues && reasonForChanging) {
      setIsDisabled(false)
      onSubmit({ recentValues, influenceOnLife, newValues, reasonForChanging })
    }
    else {
      setIsDisabled(true)
    }
  }, [recentValues, influenceOnLife, newValues, reasonForChanging])
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text="가치관 점검하기 512" textLeft="Step3" />
        <View style={{ marginTop: 24 }} />
        <DoctorComponent
          content={`${t("lesson.lookedBackYourLife")} ${t("lesson.valuesTheMeaning")} ${t("lesson.asYouBack")} ${t("lesson.takeSomeTime")}`}
          height={225}
        />
        <View style={{ marginTop: 24 }}>
          <InputComponent
            value={recentValues}
            onChangeText={(text: string) => {
              setErr1("")
              if (text.trim().length === 0) {
                setErr1(t("placeholder.err.invalidInput"))
                setRecentValues("")
              }
              setRecentValues(text)
            }}
            placeholder={t("lesson.example7")}
            label={t("lesson.myValuesSoFar")}
            heightLine={120}
            multiline={true}
          />
          {err1 && <Text style={styles.textErr}>{err1}</Text>}
          <View style={{ marginTop: 20 }} />
          <InputComponent
            value={influenceOnLife}
            onChangeText={(text: string) => {
              setErr2("")
              if (text.trim().length === 0) {
                setErr2(t("placeholder.err.invalidInput"))
                setInfluenceOnLife("")
              }
              setInfluenceOnLife(text)
            }}
            placeholder={t("lesson.example8")}
            label={t("lesson.impactOfValues")}
            heightLine={120}
            multiline={true}
          />
          {err2 && <Text style={styles.textErr}>{err2}</Text>}
          <View style={{ marginTop: 20 }} />
          <InputComponent
            value={newValues}
            onChangeText={(text: string) => {
              setErr3("")
              if (text.trim().length === 0) {
                setErr3(t("placeholder.err.invalidInput"))
                setNewValues("")
              }
              setNewValues(text)
            }}
            placeholder={t("lesson.example9")}
            label={t("lesson.valueWantToChange")}
            heightLine={120}
            multiline={true}
          />
          {err3 && <Text style={styles.textErr}>{err3}</Text>}
          <View style={{ marginTop: 20 }} />
          <InputComponent
            value={reasonForChanging}
            onChangeText={(text: string) => {
              setErr4("")
              if (text.trim().length === 0) {
                setErr4(t("placeholder.err.invalidInput"))
                setReasonForChanging("")
              }
              setReasonForChanging(text)
            }}
            placeholder={t("lesson.example10")}
            label={t("lesson.reasonWantToChange")}
            heightLine={120}
            multiline={true}
          />
        </View>
        {err4 && <Text style={styles.textErr}>{err4}</Text>}
        {messageError && <Text style={styles.textErr}>{messageError}</Text>}
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
    fontWeight: '700',
    fontSize: 18,
    color: colors.gray_G07,
    lineHeight: 28,
    paddingHorizontal: 25,
  },
  textErr: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.red
  },

});
export default Step3;
