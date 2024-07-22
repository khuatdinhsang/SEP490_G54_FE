import {useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import colors from '../../../../../constant/color';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputChart from './components/InputChart';
import LineChart from './components/LineChart';

interface Step2Props {}
const Step2 = (props: Step2Props) => {
  const [data, setData] = useState<
    Array<{x: string; y: number; label?: string}>
  >([
    {x: '10대', y: 0},
    {x: '20대', y: 0},
    {x: '30대', y: 0},
    {x: '40대', y: 0},
    {x: '50대', y: 0},
  ]);

  return (
    <View style={[styles.container]}>
      <ScrollView>
        <StepComponent textLeft="Step2" text="인생 곡선 그리기" />
        <View style={{marginTop: 32}} />
        <DoctorComponent
          height={85}
          content="아래의 그래프에 각 연령대 별 점수를 설정해 보도록 합시다."
        />
        <LineChart domainY={[0, 100]} data={data} />
        <InputChart data={data} setData={setData} />
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
