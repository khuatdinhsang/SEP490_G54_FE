import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { flexRowCenter } from '../../../styles/flex';
import { IMAGE } from '../../../constant/image';
import { useTranslation } from 'react-i18next';

const GreenComponent = () => {
  const { t } = useTranslation()
  return (
    <View style={[flexRowCenter, { paddingBottom: 20 }]}>
      <View style={[styles.wrap, flexRowCenter]}>
        <Text style={styles.text}>{t("lesson.shareMailContent")}</Text>
        <Image
          source={IMAGE.INFORMATION_HEALTH.POLYGON3}
          style={styles.image}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrap: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: colors.green,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  image: {
    position: 'absolute',
    width: 13,
    height: 10,
    bottom: -9,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
    color: colors.white,
    lineHeight: 24,
  },
});
export default GreenComponent;
