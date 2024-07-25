import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import StepComponent from '../../../components/StepComponent';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import colors from '../../../../../constant/color';
import DoctorComponent from '../../../components/DoctorComponent';
import InputComponent from '../../../../../component/input';
import { useTranslation } from 'react-i18next';
interface Step2Props {
  advantage: string,
  errAdvantage: string,
  defect: string,
  errDefect: string,
  setAdvantage: (value: string) => void;
  setErrAdvantage: (value: string) => void;
  setDefect: (value: string) => void;
  setErrDefect: (value: string) => void;
}
const Step2 = ({
  advantage,
  errAdvantage,
  defect,
  errDefect,
  setAdvantage,
  setErrAdvantage,
  setDefect,
  setErrDefect,
}: Step2Props) => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text="나의 건강 경영 강/약점 발견" textLeft="Step2" />
        <View style={{ marginTop: 24 }} />
        <Text style={styles.text}>
          이전에 실시하였던 설문을 바탕으로 발견한 나의 건강 경영 강점과
          약점입니다.
        </Text>
        <View style={{ marginTop: 24 }}>
          <Text style={styles.label}>중간목표</Text>
          <TextInput
            value={advantage}
            style={[styles.input, { height: 120 }]}
            onChangeText={(text) => {
              setErrAdvantage("");
              if (text.trim().length === 0) {
                setErrAdvantage(t("placeholder.err.invalidInput"));
                setAdvantage("")
              }
              setAdvantage(text);
            }}
            textAlignVertical='top'
            placeholder="예시) 식사 규칙적으로 하기"
            multiline={true}
            maxLength={200}
          />
          {errAdvantage && <Text style={styles.textError}>{errAdvantage}</Text>}
          <View style={{ marginTop: 20 }} />
          <Text style={styles.label}>1년후 목표</Text>
          <TextInput
            style={[styles.input, { height: 120 }]}
            value={defect}
            textAlignVertical='top'
            onChangeText={(text) => {
              setErrDefect("");
              if (text.trim().length === 0) {
                setErrDefect(t("placeholder.err.invalidInput"));
                setDefect("")
              }
              setDefect(text);
            }}
            placeholder="예시) 식사 규칙적으로 하기"
            multiline={true}
            maxLength={200}
          />
        </View>
        {errDefect && <Text style={styles.textError}>{errDefect}</Text>}
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
  },
  label: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginBottom: 12,
  },
});
export default Step2;
