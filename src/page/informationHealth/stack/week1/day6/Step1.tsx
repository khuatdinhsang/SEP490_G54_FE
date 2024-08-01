import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import { useTranslation } from 'react-i18next';

const Step1 = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text={t("lesson.settingLifeGoal")} textLeft="Step1" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.goalsInLife")}
        />
        <View style={{ marginTop: 20 }} />
        <Text style={styles.text}>
          {t("lesson.haveLifeGoal")} {t("lesson.compellingLifeGoals")} {t("lesson.considerAnswering")}
        </Text>
        <View style={{ marginTop: 32 }} />
        <View style={styles.noteWrap}>
          <Text
            style={
              styles.note
            }>{`1) ${t("lesson.rememberMe")}`}</Text>
          <Text
            style={
              styles.note
            }>{`2) ${t("lesson.achieveFiveYear")}`}</Text>
          <Text
            style={
              styles.note
            }>{`3) ${t("lesson.achieveOneYear")}`}</Text>
          <Text
            style={
              styles.note
            }>{`4) ${t("lesson.leverageToAchieve")}`}</Text>
        </View>
        <View style={{ paddingBottom: 20 }} />
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
  note: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
    marginVertical: 7,
  },
  noteWrap: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingLeft: 16,
    backgroundColor: '#FFF5F0',
  },
});
export default Step1;
