import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { IMAGE } from '../../../../../constant/image';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import { useTranslation } from 'react-i18next';

const Step1 = () => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text={t("lesson.drawingCurve")} textLeft="Step1" />
        <View style={{ marginTop: 25 }} />
        <DoctorComponent content={t("lesson.takeAPieceOfPaper")} height={65} />
        <View style={{ marginTop: 20 }} />
        <Text style={styles.text}>
          {t("lesson.ageIntervals")}{t("lesson.visualize")}{t("lesson.takeAMoment")}{t("lesson.backOurLives")}
        </Text>
        <View style={{ marginTop: 20 }} />
        <Image source={IMAGE.INFORMATION_HEALTH.IMAGE188} />
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
