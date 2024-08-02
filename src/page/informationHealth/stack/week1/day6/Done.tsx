import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { IMAGE } from '../../../../../constant/image';
import { flexCenter, flexRowCenter } from '../../../../../styles/flex';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import { useTranslation } from 'react-i18next';

const Done = () => {
  const { t } = useTranslation()
  return (
    <View style={[flexRowCenter, styles.container]}>
      <View style={flexCenter}>
        <Image source={IMAGE.INFORMATION_HEALTH.CATEGORY} />
        <Text style={styles.textFirst}>
          <Text style={{ color: colors.primary }}>{t("lesson.week1")} {t("lesson.day6")}</Text>
          {t("lesson.niceToMeetYou")}
        </Text>
        <Text style={styles.text}>
          {t("lesson.thankyou")}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
    flex: 1,
  },
  textFirst: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.gray_G07,
    lineHeight: 28,
    paddingHorizontal: 25,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.gray_G06,
    marginTop: 8,
  },
});
export default Done;
