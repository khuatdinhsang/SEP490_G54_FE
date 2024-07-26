import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import InputComponent from '../../../../../component/input';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import SelectComponent from './component/SelectComponent';

interface Step2Props { }
const Step2 = (props: Step2Props) => {
  const [indexActive, setIndexActive] = useState(0);
  // Các select component tiêu cực
  const [selectNegative1, setSelectNegative1] = useState(0);
  const [textNegative1, setTextNegative1] = useState('');
  const [selectNegative2, setSelectNegative2] = useState(0);
  const [textNegative2, setTextNegative2] = useState('');

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text="우울감 다스리기 연습" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content="다음 질문을 통해 현재 나의 우울을 다스리는 연습을 해봅시다."
        />
        <View style={{ marginTop: 20 }} />
        <SelectComponent
          label="현재 나의 감정상태"
          textLeft="부정적"
          textRight="긍정적"
          handleOnPressLeft={() => setIndexActive(1)}
          handleOnPressRight={() => setIndexActive(2)}
          indexActive={indexActive}
        />
        {
          // Tiêu cực
          indexActive === 1 && (
            <View style={{ marginTop: 25 }}>
              <SelectComponent
                label="나의 부정적인 생각이 사실과 일치하나요?"
                textLeft="예"
                textRight="아니오"
                handleOnPressLeft={() => {
                  setSelectNegative1(1);
                }}
                handleOnPressRight={() => {
                  setSelectNegative1(2);
                }}
                indexActive={selectNegative1}
              />
              <View style={{ marginTop: 25 }} />
              <InputComponent
                label="부정적인 생각"
                placeholder="부정적인 생각을 적어주세요"
                multiline={true}
                heightLine={120}
                value={textNegative1}
                onChangeText={setTextNegative1}
              />
              <View style={{ marginTop: 25 }} />
              <SelectComponent
                label="이러한 생각을 하면 기분이 좋아지나요?"
                textLeft="예"
                textRight="아니오"
                handleOnPressLeft={() => {
                  setSelectNegative1(1);
                }}
                handleOnPressRight={() => {
                  setSelectNegative1(2);
                }}
                indexActive={selectNegative1}
              />
              <View style={{ marginTop: 25 }} />
              <InputComponent
                label="아니라면 어떤 생각을 해야할까요?"
                placeholder="내용을 입력해주세요"
                multiline={true}
                heightLine={120}
                value={textNegative2}
                onChangeText={setTextNegative2}
              />
            </View>
          )
        }
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
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G07,
  },
});
export default Step2;
