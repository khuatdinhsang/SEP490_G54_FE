import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';

const Step1 = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text="건강 서명서 작성하기" textLeft="Step1" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content="학습을 시작하기 전, 건강사명서를 작성해봅시다."
        />
        <View style={{ marginTop: 20 }} />
        <Text
          style={
            styles.text
          }>{`인생목표를 확립하고 행동하는 가장 좋은 방법은 비전 선언문을 작성하는 것입니다. 자신의 철학과 신념을 바탕으로 작성한 선언문은 인생의 모든 결정을 내릴 때 기준점이 되어 줄 수도 있습니다.`}</Text>
        <View style={{ marginTop: 15 }} />
        <Text
          style={
            styles.text
          }>{`건강사명서는 여러분이 세운 인생 목표와 건강에 대한 가치를 실현해 가는데 도움이 됩니다. 다시 한번 나의 인생목표를 떠올려 보세요. 그리고 이를 선포하는 나만의 건강사명서를 작성해봅시다.`}</Text>
        <View style={{ paddingBottom: 20 }} />
      </ScrollView>
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
  note: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: colors.primary,
    marginVertical: 7,
  },
  noteWrap: {
    borderRadius: 12,
    paddingVertical: 20,
    paddingLeft: 16,
    backgroundColor: '#FFF5F0',
  },
});
export default Step1;
