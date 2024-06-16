import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { IMAGE } from '../../../constant/image';
import { flexRow, flexRowCenter } from '../../../styles/flex';
import colors from '../../../constant/color';

interface HospitalScheduleInputComponentProps {
  note: string;
  state: string;
  changeText: (text: string) => void;
}

const HospitalScheduleInputComponent = (
  props: HospitalScheduleInputComponentProps,
) => {
  const { note, changeText, state } = props;

  const color = state ? colors.black : colors.gray_G04;

  return (
    <View style={[styles.container, flexRow]}>
      <TextInput style={styles.input} onChangeText={changeText} />
      <Text style={[styles.text, { color }]}>{note}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderColor: colors.gray_G03,
    borderWidth: 1,
    borderRadius: 8,
    flex: 1,
    paddingVertical: 14,
  },
  input: {
    padding: 0,
    width: '100%',
    textAlign: 'center'
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    position: 'absolute',
    right: 12,
  },
});

export default HospitalScheduleInputComponent;
