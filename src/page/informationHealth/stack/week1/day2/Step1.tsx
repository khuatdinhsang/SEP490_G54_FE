import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import DoctorComponent from '../../../components/DoctorComponent';
import StepComponent from '../../../components/StepComponent';
import { useTranslation } from 'react-i18next';

const Step1 = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text={t("lesson.healthManagement")} textLeft="Step1" />
        <View style={{ marginTop: 24 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.healthyHabits")}
        />
        <View style={{ marginTop: 20 }}>
          <Text style={styles.text}>{`1) ${t("lesson.havePositiveMind")}`}</Text>
          <Text style={styles.text}>{`2) ${t("lesson.practiceRegular")}`}</Text>
          <Text style={styles.text}>{`3) ${t("lesson.eatHealthFood")}`}</Text>
          <Text style={styles.text}>{`4) ${t("lesson.takingMedication")}`}</Text>
          <Text style={styles.text}>{`5) ${t("lesson.activeLife")}`}</Text>
          <Text style={styles.text}>{`6) ${t("lesson.regularHealth")}`}</Text>
          <Text style={styles.text}>{`7) ${t("lesson.makeTimeHelpOther")}`}</Text>
          <Text style={styles.text}>{`8) ${t("lesson.lifeFaithAndReligion")}`}</Text>
          <Text style={styles.text}>{`9) ${t("lesson.quitSmoking")}`}</Text>
          <Text style={styles.text}>{`10) ${t("lesson.abstainDrinking")}`}</Text>
          <Text style={styles.text}>
            {`11) ${t("lesson.workLifeBalance")}`}
          </Text>
          <Text style={styles.text}>
            {`12) ${t("lesson.lovedOnes")}`}
          </Text>
        </View>
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
    color: colors.gray_G07,
    lineHeight: 32,
  },
});
export default Step1;
