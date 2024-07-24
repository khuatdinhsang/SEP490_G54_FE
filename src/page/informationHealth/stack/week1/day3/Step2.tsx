import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputShareComponent from '../../../components/InputShareComponent';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { setClosePerson1Redux, setClosePerson2Redux } from '../../../../../store/closePerson.slice';

interface Step2Props {
  isDisabled: boolean,
  setIsDisabled: (value: boolean) => void,
  step: number,
  setStep: (value: number) => void,
  setUser: (value: number) => void,
}
const Step2 = (props: Step2Props) => {
  const {
    isDisabled, setIsDisabled, step, setStep, setUser
  } = props
  const dispatch = useDispatch();

  const closePerson1Redux = useSelector((state: RootState) => state.closePerson.closePerson1);
  const closePerson2Redux = useSelector((state: RootState) => state.closePerson.closePerson2);

  const [closePerson1, setClosePerson1] = useState<string>(closePerson1Redux)
  const [closePerson2, setClosePerson2] = useState<string>(closePerson2Redux)
  dispatch(setClosePerson1Redux(closePerson1.trim()))
  dispatch(setClosePerson2Redux(closePerson2.trim()))
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text="사랑하는 사람 작성해보기" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content="사랑하는 사람 3명을 작성해봅시다."
        />
        <View style={{ marginTop: 20 }} />
        <Text style={styles.text}>
          나에 대한 평가와 긍정적인 메시지도 받아 봅시다. 이름 작성 후
          공유하기를 눌러 카카오톡이나 메시지로 전송해서 작성을 부탁해보세요.
          이름을 누르면 지인의 작성 내용을 확인할 수 있습니다.
        </Text>
        <View style={{ marginTop: 32 }} />
        <InputShareComponent
          text="1."
          textButton="공유하기"
          placeholder="이름"
          closePerson={closePerson1}
          step={step}
          setStep={setStep}
          setClosePerson={setClosePerson1}
          setUser={() => setUser(1)}

        />
        <InputShareComponent
          text="2."
          textButton="공유하기"
          placeholder="이름"
          closePerson={closePerson2}
          step={step}
          setStep={setStep}
          setClosePerson={setClosePerson2}
          setUser={() => setUser(2)}

        />
        <View style={{ paddingBottom: 40 }} />
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
