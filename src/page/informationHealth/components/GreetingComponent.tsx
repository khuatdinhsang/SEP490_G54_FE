import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../constant/color';
import {flexRowCenter} from '../../../styles/flex';

interface GreetingComponentProps {
  text: string;
}
const GreetingComponent = ({text}: GreetingComponentProps) => {
  return (
    <View style={[styles.container, flexRowCenter]}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_G01,
    paddingVertical: 16,
    borderColor: colors.gray_G02,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: colors.black,
  },
});
export default GreetingComponent;
