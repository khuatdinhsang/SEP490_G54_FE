import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import colors from '../../../../../constant/color';
import {IMAGE} from '../../../../../constant/image';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';

const Step1 = () => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <StepComponent text="인생 곡선 그리기" textLeft="Step1" />
        <View style={{marginTop: 25}} />
        <DoctorComponent content="인생곡선을 그려본 적 있으세요?" height={65} />
        <View style={{marginTop: 20}} />
        <Text style={styles.text}>
          {
            '종이를 한 장 꺼내 인생 곡선을 그려보세요. 타임라인에 나이의 간격을 기입하고, 현재 자신의 나이를 표시합니다. 과거 모습을 화상하며 각 해당 나이에 -100점부터 100점 사이의 점수를 점으로 표시하고, 각 점을 연결하여 인생 곡선을 완성합니다. 완성한 인생 곡선을 통해 지난 삶 동안 자신의 모습을 화상하는 시간을 가져봅시다. 10대부터 최근 모습 까지 그려보면서 지금까지 살아온 인생을 되돌아보고, 명확히 현실을 인식해보도록 합시다.'
          }
        </Text>
        <View style={{marginTop: 20}} />
        <Image source={IMAGE.INFORMATION_HEALTH.IMAGE188} />
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
