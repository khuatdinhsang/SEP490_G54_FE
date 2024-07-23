import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import HeaderNavigatorComponent from '../../../../../component/header-navigator';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {HeightDevice} from '../../../../../util/Dimenssion';
import colors from '../../../../../constant/color';
import GreetingComponent from '../../../../informationHealth/components/GreetingComponent';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import Step1 from './Step1';
import ButtonComponent from '../../../../../component/button';
import {useState} from 'react';

const Week1Day1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [step, setStep] = useState(1);
  const handleClickNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: paddingHorizontalScreen * 2}}>
        <HeaderNavigatorComponent
          isIconLeft={true}
          text="학습하기"
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <GreetingComponent text="인사말" />
      <View style={{flex: 1}}>{step === 1 && <Step1 />}</View>
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 35,
        }}>
        <ButtonComponent
          text="다음"
          textColor={colors.white}
          handleClick={handleClickNext}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
  },
});
export default Week1Day1;
