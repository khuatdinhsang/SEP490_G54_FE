import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../../../../component/button';
import HeaderNavigatorComponent from '../../../../../component/header-navigator';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import GreetingComponent from '../../../../informationHealth/components/GreetingComponent';
import Done from './Done';
import Step1 from './Step1';
import Step2 from './Step2';
import Step2_2 from './Step2_2';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import Step3_1 from './Step3_1';
import Step3_2 from './Step3_2';
import { lessonService } from '../../../../../services/lesson';
import LoadingScreen from '../../../../../component/loading';

const Week1Day3 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [user, setUser] = useState<number>(1)
  const closePerson1EvaluationRedux = useSelector((state: RootState) => state.closePerson.closePerson1Evaluation);
  const closePerson2EvaluationRedux = useSelector((state: RootState) => state.closePerson.closePerson2Evaluation);
  const closePerson1MessageRedux = useSelector((state: RootState) => state.closePerson.closePerson1Message);
  const closePerson2MessageRedux = useSelector((state: RootState) => state.closePerson.closePerson2Message);
  const closePerson1Redux = useSelector((state: RootState) => state.closePerson.closePerson1)
  const closePerson2Redux = useSelector((state: RootState) => state.closePerson.closePerson2);
  const [closePerson1Evaluation, setClosePerson1Evaluation] = useState<string>(closePerson1EvaluationRedux)
  const [closePerson2Evaluation, setClosePerson2Evaluation] = useState<string>(closePerson2EvaluationRedux)
  const [closePerson1Message, setClosePerson1Message] = useState<string>(closePerson1MessageRedux)
  const [closePerson2Message, setClosePerson2Message] = useState<string>(closePerson2MessageRedux)
  const [prefrerredEnvironment, setPrefrerredEnvironment] = useState<string>("")
  const [prefrerredTime, setPrefrerredTime] = useState<string>("")
  const [notPreferredLocation, setNotPreferredLocation] = useState<string>("")
  const [notPreferredTime, setNotPreferredTime] = useState<string>("")
  const [messageError, setMessageError] = useState<string>("")
  const handleClickNext = async (): Promise<void> => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3.1);
    } else if (step === 2.2) {
      setStep(2);
    } else if (step === 3.1) {
      setStep(3.2);
    } else if (step === 3.2) {
      setIsLoading(true)
      try {
        const data = {
          closePerson1: closePerson1Redux,
          closePerson2: closePerson2Redux,
          closePerson1Message: closePerson1Message,
          closePerson2Message: closePerson2Message,
          prefrerredEnvironment: prefrerredEnvironment,
          prefrerredTime: prefrerredTime,
          notPreferredLocation: notPreferredLocation,
          notPreferredTime: notPreferredTime,
          closePerson1Evaluation: closePerson1Evaluation,
          closePerson2Evaluation: closePerson2Evaluation
        }
        const res = await lessonService.putLesson3(data)
        if (res.code === 201) {
          setIsLoading(false)
          setStep(0);
        }
      } catch (error: any) {
        if (error?.response?.status === 400) {
          setMessageError(error.response.data.message);
        } else {
          setMessageError("Unexpected error occurred.");
        }
      }
      finally {
        setIsLoading(false)
      }
    }
  };
  const handleClickDone = () => {
    navigation.goBack();
  };
  const handleSubmitStep3 = (value: any) => {
    setPrefrerredEnvironment(value.address)
    setPrefrerredTime(value.time)
  }
  const handleSubmitStep3_2 = (value: any) => {
    setNotPreferredLocation(value.address)
    setNotPreferredTime(value.time)
  }
  console.log("95", isDisabled)
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
          setUser={setUser}
          setIsLoading={setIsLoading}
          closePerson2EvaluationRedux={closePerson2Evaluation}
          closePerson1EvaluationRedux={closePerson1Evaluation}
          closePerson1MessageRedux={closePerson1Message}
          closePerson2MessageRedux={closePerson1Message}
        />}
        {step === 3.1 && <Step3_1
          onSubmit={handleSubmitStep3}
          setIsDisabled={setIsDisabled}
          setIsLoading={setIsLoading}
        />}
        {step === 3.2 && <Step3_2
          setIsDisabled={setIsDisabled}
          onSubmit={handleSubmitStep3_2}
          setIsLoading={setIsLoading}
        />}
        {step === 0 && <Done />}
        {step === 2.2 && <Step2_2
          closePersonEvaluation={user === 1 ? closePerson1Evaluation : closePerson2Evaluation}
          closePersonMessage={user === 1 ? closePerson1Message : closePerson2Message}
          setClosePersonEvaluation={user === 1 ? setClosePerson1Evaluation : setClosePerson2Evaluation}
          setClosePersonMessage={user === 1 ? setClosePerson1Message : setClosePerson2Message}
          setIsDisabled={setIsDisabled}
          user={user}
          setIsLoading={setIsLoading}
        />}
      </View>
      {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
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
      {isLoading && <LoadingScreen />}
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
  textError: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.red
  }
});
export default Week1Day3;
