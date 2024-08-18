import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { flexRow, flexRowSpaceBetween } from '../../../styles/flex';
import { TypeMakeHospitalSchedule, TypeStatusMedicalAppointment } from '../const';
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
      ? colors.green_background
      : colors.blue_background;
  let labelStatusAppoint = ""
  let labelStatusAppointWrapper = ""
  switch (appointment.statusMedicalAppointment) {
    case TypeStatusMedicalAppointment.DONE:
      labelStatusAppoint = colors.green;
      labelStatusAppointWrapper = colors.green_background
      break;
    case TypeStatusMedicalAppointment.PENDING:
      labelStatusAppoint = colors.orange_04;
      labelStatusAppointWrapper = colors.orange_01
      break;
    case TypeStatusMedicalAppointment.CONFIRM:
      labelStatusAppoint = colors.blue_01;
      labelStatusAppointWrapper = colors.blue_background
      break;
    default:
      labelStatusAppoint = colors.blue_01;
      labelStatusAppointWrapper = colors.blue_background
  }
  return (
    <View style={[flexRowSpaceBetween, styles.question, styles.shadowBox, { opacity: appointment.statusMedicalAppointment === TypeStatusMedicalAppointment.PENDING ? 0.5 : 1 }]}>
      <View style={{ width: '60%' }}>
        <Text style={styles.textQuestion}>{appointment.date?.split("T")[0]}</Text>
        <Text style={[styles.textQuestion]}>{appointment.hospital}</Text>
        {appointment.statusMedicalAppointment === TypeStatusMedicalAppointment.CONFIRM && <Text style={[styles.textQuestion, { color: colors.gray_G08, fontSize: 14 }]}>{appointment.note}</Text>}
      </View>
      <View style={{ flex: 1 }}>
        <View style={[styles.statusQuestion, styles.centered, { marginBottom: 5, backgroundColor: labelColorWrapper }]}>
          <Text style={[styles.textQuestion, { textAlign: 'center', color: labelColor }]}>{appointment.typeMedicalAppointment?.split("_")[1] ?? appointment.typeMedicalAppointment}</Text>
        </View>
        <View style={[styles.statusQuestion, styles.centered, { backgroundColor: labelStatusAppointWrapper }]}>
          <Text style={[styles.textQuestion, { textAlign: 'center', color: labelStatusAppoint }]}>{appointment.statusMedicalAppointment}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  question: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray_G02,
    paddingVertical: 16,
    paddingHorizontal: 14,
    backgroundColor: colors.white,
    marginBottom: 15
  },
  textQuestion: {
    fontWeight: "500",
    fontSize: 16,
    color: colors.gray_G04,
  },
  statusQuestion: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
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
  centered: {
    justifyContent: 'center',
  },
});

export default HospitalScheduleComponent;
