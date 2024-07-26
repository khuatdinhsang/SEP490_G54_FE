import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';

const Step1 = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text="인생목표 설정하기" textLeft="Step1" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content="여러분의 인생의 목표는 무엇인가요?"
        />
        <View style={{ marginTop: 20 }} />
        <Text
          style={
            styles.text
          }>{`인생목표를 갖고 계신가요? 아직 갖고 있지 않다면, 여러분 자신만의 고유하고 매력적인 인생목표를 설정해보세요. 어떻게 설정해야 할 지 막막하시다면, 다음과 같은 질문에 대답을 생각해보세요.`}</Text>
        <View style={{ marginTop: 32 }} />
        <View style={styles.noteWrap}>
          <Text
            style={
              styles.note
            }>{`1) 가족, 친구들에게 나는 어떤 사람으로 기억되고 싶은가요? `}</Text>
          <Text
            style={
              styles.note
            }>{`2) 치료를 시작한 지 5년 후 어떤 목표를 이루고 싶으신가요?`}</Text>
          <Text
            style={
              styles.note
            }>{`3) 1년 뒤에 달성하고자 하는 건강목표는 무엇인가요?`}</Text>
          <Text
            style={
              styles.note
            }>{`4) 목표를 달성하기 위해 활용할 수 있는 나의 강점은 무엇인가요?`}</Text>
        </View>
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
