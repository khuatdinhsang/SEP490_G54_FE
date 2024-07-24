import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import ButtonComponent from '../../../../../component/button';
import HeaderNavigatorComponent from '../../../../../component/header-navigator';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import GreetingComponent from '../../../../informationHealth/components/GreetingComponent';
import Done from './Done';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step2_2 from './Step2_2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';

const Week1Day3 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [step, setStep] = useState(1);
  const [isDialog, setIsDialog] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<number>(1)
  const closePerson1EvaluationRedux = useSelector((state: RootState) => state.closePerson.closePerson1Evaluation);
  const closePerson2EvaluationRedux = useSelector((state: RootState) => state.closePerson.closePerson2Evaluation);
  const closePerson1MessageRedux = useSelector((state: RootState) => state.closePerson.closePerson1Message);
  const closePerson2MessageRedux = useSelector((state: RootState) => state.closePerson.closePerson2Message);

  const [closePerson1Evaluation, setClosePerson1Evaluation] = useState<string>(closePerson1EvaluationRedux)
  const [closePerson2Evaluation, setClosePerson2Evaluation] = useState<string>(closePerson2EvaluationRedux)
  const [closePerson1Message, setClosePerson1Message] = useState<string>(closePerson1MessageRedux)
  const [closePerson2Message, setClosePerson2Message] = useState<string>(closePerson2MessageRedux)

  const handleClickNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 2.2) {
      setStep(2);
    } else if (step === 3) {
      setStep(0);
    }
  };
  const handleClickDone = () => {
    navigation.goBack();
  };
  const handleSubmit = (value: any) => {
    console.log(value);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: paddingHorizontalScreen * 2 }}>
        <HeaderNavigatorComponent
          isIconLeft={true}
          text="학습하기"
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <GreetingComponent text={step === 2.2 ? "지인을 위한 하마디 작성" : "인사말"} />
      <View style={{ flex: 1 }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2
          step={step}
          setStep={setStep}
          setIsDisabled={setIsDisabled}
          isDisabled={isDisabled}
          setUser={setUser}

        />}
        {step === 3 && <Step3
          onSubmit={handleSubmit}
          setIsDisabled={setIsDisabled}
        />}
        {step === 0 && <Done />}
        {step === 2.2 && <Step2_2
          closePersonEvaluation={user === 1 ? closePerson1Evaluation : closePerson2Evaluation}
          closePersonMessage={user === 1 ? closePerson1Message : closePerson2Message}
          setClosePersonEvaluation={user === 1 ? setClosePerson1Evaluation : setClosePerson2Evaluation}
          setClosePersonMessage={user === 1 ? setClosePerson1Message : setClosePerson2Message}
          setIsDisabled={setIsDisabled}
          user={user}
        />}
      </View>
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 20,
        }}>
        <ButtonComponent
          isDisable={isDisabled}
          text={step ? '다음' : '홈으로 돌아가기'}
          textColor={colors.white}
          handleClick={step ? handleClickNext : handleClickDone}
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
export default Week1Day3;
