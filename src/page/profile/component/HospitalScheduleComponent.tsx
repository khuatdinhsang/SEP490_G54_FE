import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { flexRow } from '../../../styles/flex';
import { TypeMakeHospitalSchedule } from '../const';
import { appointment } from '../../../constant/type/medical';

interface HospitalScheduleComponentProps {
  typeMakeHospitalSchedule: TypeMakeHospitalSchedule;
  appointment: appointment
}
const HospitalScheduleComponent = (props: HospitalScheduleComponentProps) => {
  const { typeMakeHospitalSchedule, appointment } = props;

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const labelColor =
    typeMakeHospitalSchedule === TypeMakeHospitalSchedule.MEDICAL_CHECKUP
      ? colors.green
      : colors.blue_01;
  const labelColorWrapper =
    typeMakeHospitalSchedule === TypeMakeHospitalSchedule.MEDICAL_CHECKUP
      ? '#EAFFFC'
      : '#ECECFF';

  return (
    <View style={[styles.container, flexRow, styles.shadowBox, { alignItems: 'flex-start' }]}>
      <View style={[styles.labelWrapper, { backgroundColor: labelColorWrapper }]}>
        <Text style={[styles.label, { color: labelColor }]}>
          {typeMakeHospitalSchedule === TypeMakeHospitalSchedule.MEDICAL_CHECKUP
            ? '건강검진'
            : '진료'}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>{appointment.hospital}</Text>
      </View>
      <View >
        <Text style={styles.textRight}>{appointment.date?.split("T")[0]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: colors.white,
    marginVertical: 8,
  },
  labelWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  label: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  text: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    marginLeft: 8,
  },
  textRight: {
    color: colors.gray_G04,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  shadowBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#6D6D6D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 3,
  },
});

export default HospitalScheduleComponent;
