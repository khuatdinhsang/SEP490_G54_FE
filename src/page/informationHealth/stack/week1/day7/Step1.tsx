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
        <StepComponent text={t("lesson.writeHealthMission")} textLeft="Step1" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.beforeLearning")}
        />
        <View style={{ marginTop: 20 }} />
        <Text
          style={
            styles.text
          }>{t("lesson.bestWayToEstablish")} {t("lesson.beliefs")}
        </Text>
        <View style={{ marginTop: 15 }} />
        <Text
          style={
            styles.text
          }>
          {t("lesson.missionStatement")} {t("lesson.lifeGoals")} {t("lesson.writeMissionStatement")}</Text>
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
