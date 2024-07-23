import {ScrollView, StyleSheet, Text, View} from 'react-native';
import StepComponent from '../../../components/StepComponent';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import colors from '../../../../../constant/color';
import DoctorComponent from '../../../components/DoctorComponent';
import InputComponent from '../../../../../component/input';
import {useState} from 'react';

const Step2 = () => {
  const [advantage, setAdvantage] = useState('');
  const [defect, setDefect] = useState('');
  return (
    <View style={styles.container}>
      <ScrollView>
        <StepComponent text="나의 건강 경영 강/약점 발견" textLeft="Step2" />
        <View style={{marginTop: 24}} />
        <Text style={styles.text}>
          이전에 실시하였던 설문을 바탕으로 발견한 나의 건강 경영 강점과
          약점입니다.
        </Text>
        <View style={{marginTop: 24}}>
          <InputComponent
            value={advantage}
            onChangeText={setAdvantage}
            placeholder="예시) 식사 규칙적으로 하기"
            label="중간목표"
            heightLine={120}
            multiline={true}
          />
          <View style={{marginTop: 20}} />
          <InputComponent
            value={defect}
            onChangeText={setDefect}
            placeholder="예시) 식사 규칙적으로 하기"
            label="1년후 목표"
            heightLine={120}
            multiline={true}
          />
        </View>
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
    fontWeight: '700',
    fontSize: 18,
    color: colors.gray_G07,
    lineHeight: 28,
    paddingHorizontal: 25,
  },
});
export default Step2;
