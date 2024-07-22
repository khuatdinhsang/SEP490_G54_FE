import {ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../../../../constant/color';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputShareComponent from '../../../components/InputShareComponent';

interface Step2Props {}
const Step2 = (props: Step2Props) => {
  return (
    <View style={[styles.container]}>
      <ScrollView>
        <StepComponent textLeft="Step2" text="사랑하는 사람 작성해보기" />
        <View style={{marginTop: 32}} />
        <DoctorComponent
          height={85}
          content="사랑하는 사람 3명을 작성해봅시다."
        />
        <View style={{marginTop: 20}} />
        <Text style={styles.text}>
          나에 대한 평가와 긍정적인 메시지도 받아 봅시다. 이름 작성 후
          공유하기를 눌러 카카오톡이나 메시지로 전송해서 작성을 부탁해보세요.
          이름을 누르면 지인의 작성 내용을 확인할 수 있습니다.
        </Text>
        <View style={{marginTop: 32}} />
        <InputShareComponent
          text="1."
          textButton="공유하기"
          placeholder="이름"
        />
        <InputShareComponent
          text="2."
          textButton="공유하기"
          placeholder="이름"
        />
        <View style={{paddingBottom: 40}} />
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
export default Step2;
