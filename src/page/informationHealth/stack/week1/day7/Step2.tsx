import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../../../../constant/color';
import { IMAGE } from '../../../../../constant/image';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import { WidthDevice } from '../../../../../util/Dimenssion';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';

interface Step2Props { }
const Step2 = (props: Step2Props) => {
  return (
    <View style={[styles.container]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text="건강 서명서 작성하기" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content="학습을 시작하기 전, 건강사명서를 작성해봅시다."
        />
        <View style={{ marginTop: 20 }} />
        <ImageBackground
          source={IMAGE.INFORMATION_HEALTH.SUBTRACT}
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={{ paddingTop: 35 }} />
          <Text style={styles.mailTitle}>“건강 사명서”</Text>
          <View style={{ paddingTop: 28 }} />
          <Text style={styles.mailContent}>
            나의 인생 목표는
            <Text style={styles.mailContentBold}>질병 극복</Text>입니다. 현재
            나의 삶의 위기는
            <Text style={styles.mailContentBold}>정서적 어려움</Text> 입니다.
            나에게 건강은 행복한
            <Text style={styles.mailContentBold}>삶을 위한 준비물</Text>입니다.
          </Text>

          <View style={{ paddingTop: 25 }} />
          <Text style={[styles.mailContent, { paddingHorizontal: 60 }]}>
            건강 실천을 위한 다짐으로
            <Text style={styles.mailContentBold}>일주일에 세번 걷기</Text>, 균
            <Text style={styles.mailContentBold}>형잡힌 식사를 하기</Text>,
            하루에 10분씩 명상하기, 시간에 맞추어 약물 복용하기 입니다.
          </Text>

          <View style={{ paddingTop: 25 }} />
          <Text style={styles.mailContent}>
            실천을 어렵게 하는 요인으로는 의지 및 끈기 부족이 있지만 극복
            방법으로
            <Text style={styles.mailContentBold}>가족에게 도움 구하기</Text>를
            할 것입니다.
          </Text>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
    flex: 1,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G07,
  },
  backgroundImage: {
    width: WidthDevice - paddingHorizontalScreen * 4,
    height: ((WidthDevice - paddingHorizontalScreen * 4) * 599) / 366,
  },
  mailTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.gray_G09,
    lineHeight: 28,
    textAlign: 'center',
  },
  mailContent: {
    fontWeight: '400',
    fontSize: 18,
    color: colors.gray_G07,
    lineHeight: 28,
    textAlign: 'center',
    paddingHorizontal: 50,
  },
  mailContentBold: {
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
export default Step2;
