import {Dispatch, SetStateAction, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import InputComponent from '../../../../../component/input';
import colors from '../../../../../constant/color';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import DialogSingleComponent from '../../../../../component/dialog-single';
import {IMAGE} from '../../../../../constant/image';

interface Step2Props {}
const Step2 = (props: Step2Props) => {
  const [midTermGoal, setMidTermGoal] = useState('');
  const [oneYearGoal, setOneYearGoal] = useState('');

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <StepComponent textLeft="Step2" text="1년후 목표 및 중간 목표 세우기" />
        <View style={{marginTop: 32}} />
        <DoctorComponent
          height={85}
          content="미래의 모습을 위해 계획을 세워봅시다."
        />
        <View style={{marginTop: 20}} />
        <InputComponent
          value={midTermGoal}
          onChangeText={setMidTermGoal}
          placeholder="예시) 식사 규칙적으로 하기"
          label="중간목표"
          heightLine={120}
          multiline={true}
        />
        <View style={{marginTop: 20}} />
        <InputComponent
          value={oneYearGoal}
          onChangeText={setOneYearGoal}
          placeholder="예시) 식사 규칙적으로 하기"
          label="1년후 목표"
          heightLine={120}
          multiline={true}
        />
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
    lineHeight: 28,
    color: colors.gray_G07,
  },
});
export default Step2;
