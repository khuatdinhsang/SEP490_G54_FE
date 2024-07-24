import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';

const text = `반갑습니다!\n\n오늘부터 여러분과 함께 12주간 ‘건강 경영'의 길을 걷게 되어 매우 기쁩니다.\n\n여러분은 만성질환의 위기를 극복하고 건강한 몸과 마음을 유지하기 위한 효과적인 전략을 가지고 있어야 합니다. 당장의 건강 경영을 위한 전략이 없더라도, 전략이 필요하다는 인식이 있어야만 위기에 맞설 수 있습니다.`;
const Step1 = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text="360도 평가 실시" textLeft="Step1" />
        <View style={{ marginTop: 25 }} />
        <DoctorComponent content="360도 평가를 실시해봅시다." height={65} />
        <View style={{ marginTop: 10 }}>
          <Text style={styles.text}>
            {
              '1) 나를 가장 잘 알고 있는 사람들을 4명 선정합니다. 가족, 친구 멘토, 의료진 등 누구든 상관 없습니다.'
            }
          </Text>
          <Text style={styles.text}>
            {'2)이들에게 나에 대해 평가해줄 것을 요청해주세요.'}
          </Text>
          <Text style={styles.text}>
            {
              '3)4명에게서 긍정의 예언 (나에게 긍정적인 힘을 주는 표현) 및 긍정의 메시지를 3가지씩 받도록 합니다.'
            }
          </Text>
          <Text style={styles.text}>
            {'4)평가를 해 준 사람에게 감사의 표현을 하세요.'}
          </Text>
        </View>
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
    marginVertical: 10,
  },
});
export default Step1;
