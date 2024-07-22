import {StyleSheet, Text, View} from 'react-native';
import colors from '../../../../../constant/color';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';

const text = `반갑습니다!\n\n오늘부터 여러분과 함께 12주간 ‘건강 경영'의 길을 걷게 되어 매우 기쁩니다.\n\n여러분은 만성질환의 위기를 극복하고 건강한 몸과 마음을 유지하기 위한 효과적인 전략을 가지고 있어야 합니다. 당장의 건강 경영을 위한 전략이 없더라도, 전략이 필요하다는 인식이 있어야만 위기에 맞설 수 있습니다.`;
const Step1 = () => {
  return (
    <View style={styles.container}>
      <StepComponent text="건강경영과 효과적인 전략" textLeft="Step1" />
      <View style={{marginTop: 32}} />
      <Text style={styles.text}>{text}</Text>
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
