import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InputComponent from '../../../../../component/input';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import TickComponent from './component/TickComponent';
import GreenComponent from '../../../components/GreenComponent';

interface Step2Props {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
const Step3 = (props: Step2Props) => {
  const { isDisabled, setIsDisabled } = props;

  useEffect(() => {
    setIsDisabled(false);
  }, []);

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <StepComponent textLeft="Step3" text="희망의 우편엽서" />
          <View style={{ marginTop: 32 }} />
          <DoctorComponent
            height={85}
            content="자신의 인생목표가 담긴 우편엽서를 지인들에게 공유해보아요."
          />
          <View style={{ marginTop: 20 }} />
          <Text style={styles.text}>
            처음에 실시했던 설문조사 결과 내용을 바탕으로 작성된 인생목표가 담긴
            우편엽서를 읽어보고 지인들에게 공유해보세요
          </Text>
          <View style={{ marginTop: 20 }} />
          <GreenComponent />
          <Text style={styles.mailTitle}>“우편엽서”</Text>
          <Text style={styles.mailContent}>
            나는
            <Text
              style={styles.mailContentBold}
              onPress={() => {
                console.log('Click Text');
              }}>
              질병 극복을
            </Text>
            위해 꼭 해야{' '}
            <Text style={styles.mailContentBold}>하는 일을 미루지 않으며</Text>{' '}
            의지를 키워나갈 것입니다.
          </Text>
          <View style={{ paddingBottom: 20 }} />
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
export default Step3;
