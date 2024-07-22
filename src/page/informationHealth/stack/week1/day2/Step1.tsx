import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../../../../constant/color';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import DoctorComponent from '../../../components/DoctorComponent';
import StepComponent from '../../../components/StepComponent';

const Step1 = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <StepComponent text="건강경영과 효과적인 전략" textLeft="Step1" />
        <View style={{marginTop: 24}} />
        <DoctorComponent
          height={85}
          content="앞으로 우리가 함께 공부할 건강습관 12대 수칙에 대해 알아봅시다."
        />
        <View>
          <Text style={styles.text}>{'1) 긍정적인 마음 갖기'}</Text>
          <Text style={styles.text}>{'2) 규칙적인 운동 실천하기'}</Text>
          <Text style={styles.text}>{'3) 건강한 음식 바르게 먹기'}</Text>
          <Text style={styles.text}>{'4) 약물 복용하기'}</Text>
          <Text style={styles.text}>{'5) 적극적인 삶 살기'}</Text>
          <Text style={styles.text}>{'6) 정기적으로 건강검진 받기'}</Text>
          <Text style={styles.text}>{'7) 남을 도울 수 있는 시간 가지기'}</Text>
          <Text style={styles.text}>{'8) 신앙과 종교생활하기'}</Text>
          <Text style={styles.text}>{'9) 금연하기'}</Text>
          <Text style={styles.text}>{'10) 절주하기'}</Text>
          <Text style={styles.text}>
            {'11) 과로는 금물, 일과 삶의 균형 지키기'}
          </Text>
          <Text style={styles.text}>
            {'12) 사랑하는 사람과 함께하는 삶 생각하기'}
          </Text>
        </View>
        <View style={{paddingBottom: 30}} />
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
    color: colors.gray_G07,
    lineHeight: 32,
  },
});
export default Step1;
