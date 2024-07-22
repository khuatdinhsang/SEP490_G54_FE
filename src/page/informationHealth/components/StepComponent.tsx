import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../constant/color';
import {flexRow} from '../../../styles/flex';

interface StepComponentProps {
  textLeft: string;
  text: string;
}
const StepComponent = (props: StepComponentProps) => {
  const {textLeft, text} = props;

  return (
    <View style={[styles.container, flexRow, styles.shadowBox]}>
      <Text style={styles.textLeft}>{textLeft}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 14,
    paddingLeft: 16,
    borderColor: colors.gray_G02,
    borderWidth: 1,
    borderRadius: 8,
  },
  textLeft: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 20,
    color: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: '#FEEFED',
    borderRadius: 999,
    marginRight: 10,
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.primary,
  },
  shadowBox: {
    backgroundColor: 'white',
    shadowColor: '#6D6D6D',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 7,
  },
});
export default StepComponent;
