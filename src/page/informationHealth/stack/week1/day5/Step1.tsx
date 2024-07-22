import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../../../../constant/color';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import PatientComponent from '../../../components/PatientComponent';

const Step1 = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <StepComponent text="부정적인 생각 극복하기 1" textLeft="Step1" />
        <View style={{marginTop: 32}} />
        <PatientComponent
          content="질환을 경험한 후로 자꾸만 우울해지고, 나쁜 생각이 들어요."
          height={85}
        />
        <View style={{marginTop: 30}} />
        <Text style={styles.text}>
          {'마음의 감기, 우울감을 이기는 힘은 나 자신에게 있습니다.'}
        </Text>
        <View style={{marginTop: 15}} />
        <Text style={styles.text}>
          {
            '→ 죽어라 공부했지만 취업의 문 앞에 주저앉은 청년, 가족을 책임지느라 허리가 휘는 중년, 이 모든 시기를 겪고 홀로 남겨진 노년까지. 개인이 짊어진 삶의 무게는 제각각이고, 저마다 느끼는 우울의 무게도 다를 수 밖에 없습니다. 다른 사람과 비교하기보다 나의 마음속을 살펴보고 나의 강점을 찾아가는 것, 그것이 우울감을 털어버릴 힘입니다.'
          }
        </Text>
        <View style={{marginTop: 30}} />
        <Text style={styles.text}>{'부정적인 생각은 이제 그만!'}</Text>
        <View style={{marginTop: 15}} />
        <Text style={styles.text}>
          {
            '→ 부정적인 생각이 자꾸 드시나요? 그럴때마다 ‘나의 생각은 사실과 일치하는가’, ‘그 생각을 하면 기분이 좋아지는가’를 스스로에게 질문해보십시오. 어떤가요? 부정적인 생각은 대부분 현실과 다르며, 여러분을 더 부정적인 기분이 들게 합니다. 이제, 그 부정적인 생각을 버리고 싶어지지 않으셨나요? 이러한 생각의 습관을 통하여 부정적인 생각을 버리고, 긍정적인 생각으로 변화시켜 보세요.'
          }
        </Text>
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
});
export default Step1;
