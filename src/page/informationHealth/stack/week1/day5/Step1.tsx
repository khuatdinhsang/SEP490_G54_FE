import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import PatientComponent from '../../../components/PatientComponent';
import { useTranslation } from 'react-i18next';

const Step1 = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text={t("lesson.overComing")} textLeft="Step1" />
        <View style={{ marginTop: 32 }} />
        <PatientComponent
          content={t("lesson.sinceExperience")}
          height={85}
        />
        <View style={{ marginTop: 30 }} />
        <Text style={styles.text}>
          {t("lesson.powerToOverCome")}
        </Text>
        <View style={{ marginTop: 15 }} />
        <Text style={styles.text}>
          {t("lesson.studiesHard")} {t("lesson.weightOfLife")} {t("lesson.comparingMySelf")}
        </Text>
        <View style={{ marginTop: 30 }} />
        <Text style={styles.text}>{t("lesson.stopNegativeThoughts")}</Text>
        <View style={{ marginTop: 15 }} />
        <Text style={styles.text}>
          {t("lesson.keepHavingNegative")} {t("lesson.howAboutThis")} {t("lesson.feelMoreNegative")} {t("lesson.letGoOfNegative")} {t("lesson.thinkingHabits")}
        </Text>
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
});
export default Step1;
