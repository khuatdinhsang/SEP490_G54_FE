import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { IMAGE } from '../../../constant/image';
import { flexRowCenter } from '../../../styles/flex';
import colors from '../../../constant/color';
import { useTranslation } from 'react-i18next';

interface HospitalScheduleButtonComponentProps {
  handleOnPress: () => void;
}

const HospitalScheduleButtonComponent = ({
  handleOnPress,
}: HospitalScheduleButtonComponentProps) => {
  const { t } = useTranslation()
  return (
    <Pressable
      style={[flexRowCenter, styles.container, styles.shadowBox]}
      onPress={handleOnPress}>
      <Image source={IMAGE.ICON_PLUS_ORANGE} />
      <View style={{ marginLeft: 10 }} />
      <Text style={styles.text}>{t("hospital.registerHospital")}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 0,
    borderColor: colors.primary,
    borderWidth: 1,
    backgroundColor: colors.orange_01,
    borderRadius: 12,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.primary,
  },
  shadowBox: {
    // backgroundColor: '#FFFFFF',
    // padding: 20,
    // borderRadius: 10,
    // shadowColor: '#303030',
    // shadowOffset: {width: 0, height: 0},
    // shadowOpacity: 0.06,
    // shadowRadius: 10,
    // elevation: 10,
  },
});

export default HospitalScheduleButtonComponent;
