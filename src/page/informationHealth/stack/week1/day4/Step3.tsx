import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StepComponent from '../../../components/StepComponent';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import colors from '../../../../../constant/color';
import DoctorComponent from '../../../components/DoctorComponent';
import InputComponent from '../../../../../component/input';
import { useState } from 'react';
interface Step3Props {
  inputText1: string,
  inputText2: string,
  inputText3: string,
  inputText4: string,
  setInputText1: (value: string) => void,
  setInputText2: (value: string) => void,
  setInputText3: (value: string) => void,
  setInputText4: (value: string) => void,
}
const Step3 = ({
  inputText1,
  inputText2,
  inputText3,
  inputText4,
  setInputText1,
  setInputText2,
  setInputText3,
  setInputText4,
}: Step3Props) => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent text="가치관 점검하기" textLeft="Step3" />
        <View style={{ marginTop: 24 }} />
        <DoctorComponent
          content="인생곡선을 그리며 살아온 인생을 돌아봤나요? 사람은 누구나 삶의 의미와 가치를 중요하게 생각하고 그것을 찾기 위해 노력합니다. 인생을 돌아보며 발견한 여러분의 가치관은 무엇인가요? 삶의 가치관을 점검해보는 시간을 가져봅시다."
          height={225}
        />
        <View style={{ marginTop: 24 }}>
          <InputComponent
            value={inputText1}
            onChangeText={setInputText1}
            placeholder="예시) 사회적 성공을 중요하게 생각"
            label="지금까지 나의 가치관"
            heightLine={120}
            multiline={true}
          />
          <View style={{ marginTop: 20 }} />
          <InputComponent
            value={inputText2}
            onChangeText={setInputText2}
            placeholder="예시) 식사 규칙적으로 하기"
            label="가치관이 건강에 미친 영향"
            heightLine={120}
            multiline={true}
          />
          <View style={{ marginTop: 20 }} />
          <InputComponent
            value={inputText3}
            onChangeText={setInputText3}
            placeholder="예시) 건강을 중요하게 생각"
            label="변화하고자 하는 가치관"
            heightLine={120}
            multiline={true}
          />
          <View style={{ marginTop: 20 }} />
          <InputComponent
            value={inputText4}
            onChangeText={setInputText4}
            placeholder="예시) 지인들과 행복하게 오래 함께 하고 싶음"
            label="변화하고자 하는 이유"
            heightLine={120}
            multiline={true}
          />
        </View>
        <View style={{ paddingBottom: 30 }} />
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
    fontWeight: '700',
    fontSize: 18,
    color: colors.gray_G07,
    lineHeight: 28,
    paddingHorizontal: 25,
  },
});
export default Step3;
