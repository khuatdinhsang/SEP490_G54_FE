import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexCenter } from '../../../styles/flex';
import { TypeMakeHospitalSchedule } from '../const';
import { useTranslation } from 'react-i18next';

interface HospitalTypeComponentProps {
  state: TypeMakeHospitalSchedule | undefined;
  handleOnPress: () => void;
  type: TypeMakeHospitalSchedule;
}

const HospitalTypeComponent = (props: HospitalTypeComponentProps) => {
  const { state, handleOnPress, type } = props;
  const { t } = useTranslation()
  const isActive = state === type;
  const backgroundColor = isActive ? colors.orange_01 : 'transparent';
  const color = isActive ? colors.primary : colors.gray_G05;
  const borderColor = isActive ? colors.primary : colors.gray_G03;

  return (
    <Pressable
      style={[
        styles.typeComponent,
        flexCenter,
        {
          backgroundColor,
          borderColor,
        },
      ]}
      onPress={() => handleOnPress()}>
      <Image
        source={
          type === TypeMakeHospitalSchedule.DIAGNOSIS
            ? IMAGE.PROFILE.HOSPITAL_SCHEDULE.TYPE1
            : IMAGE.PROFILE.HOSPITAL_SCHEDULE.TYPE2
        }
      />
      <View style={{ marginVertical: 5 }} />
      <Text style={[styles.textType, { color }]}>{t("hospital.diagnosis")}</Text>
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
  typeComponent: {
    borderColor: colors.gray_G03,
    borderWidth: 1,
    borderRadius: 8,
    height: 120,
    flex: 1,
  },
  textType: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
  },
});

export default HospitalTypeComponent;
