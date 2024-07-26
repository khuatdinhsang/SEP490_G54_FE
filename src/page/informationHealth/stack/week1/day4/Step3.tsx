import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StepComponent from '../../../components/StepComponent';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import colors from '../../../../../constant/color';
import DoctorComponent from '../../../components/DoctorComponent';
import InputComponent from '../../../../../component/input';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


export interface valuesStep3 {
  recentValues: string,
  influenceOnLife: string,
  newValues: string,
  reasonForChanging: string
}

interface Step3Props {
  setIsDisabled: (value: boolean) => void;
  onSubmit: (value: valuesStep3) => void;
}
const Step3 = ({
  setIsDisabled, onSubmit
}: Step3Props) => {
  const [err1, setErr1] = useState<string>("")
  const [err2, setErr2] = useState<string>("")
  const [err3, setErr3] = useState<string>("")
  const [err4, setErr4] = useState<string>("")
  const [recentValues, setRecentValues] = useState('');
  const [influenceOnLife, setInfluenceOnLife] = useState('');
  const [newValues, setNewValues] = useState('');
  const [reasonForChanging, setReasonForChanging] = useState('');
  const { t } = useTranslation()
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
        <StepComponent text="가치관 점검하기" textLeft="Step3" />
        <View style={{ marginTop: 24 }} />
        <DoctorComponent
          content="인생곡선을 그리며 살아온 인생을 돌아봤나요? 사람은 누구나 삶의 의미와 가치를 중요하게 생각하고 그것을 찾기 위해 노력합니다. 인생을 돌아보며 발견한 여러분의 가치관은 무엇인가요? 삶의 가치관을 점검해보는 시간을 가져봅시다."
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
            placeholder="예시) 사회적 성공을 중요하게 생각"
            label="지금까지 나의 가치관"
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
            placeholder="예시) 식사 규칙적으로 하기"
            label="가치관이 건강에 미친 영향"
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
            placeholder="예시) 건강을 중요하게 생각"
            label="변화하고자 하는 가치관"
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
            placeholder="예시) 지인들과 행복하게 오래 함께 하고 싶음"
            label="변화하고자 하는 이유"
            heightLine={120}
            multiline={true}
          />
        </View>
        {err4 && <Text style={styles.textErr}>{err4}</Text>}
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
  }
});
export default Step3;
