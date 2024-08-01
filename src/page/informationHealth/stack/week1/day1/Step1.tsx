import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import { useTranslation } from 'react-i18next';

const Step1 = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <StepComponent text={t("lesson.healthManagement")} textLeft="Step1" />
      <View style={{ marginTop: 32 }} />
      <Text style={styles.text}>
        {t("lesson.niceToMeetYou")}
        {"\n\n"}
        {t("lesson.weekStarting")}
        {"\n\n"}
        {t("lesson.effectiveStrategy")}
      </Text>
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
