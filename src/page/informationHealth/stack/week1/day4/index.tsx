import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../../../../component/button';
import HeaderNavigatorComponent from '../../../../../component/header-navigator';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import GreetingComponent from '../../../../informationHealth/components/GreetingComponent';
import Done from './Done';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import LoadingScreen from '../../../../../component/loading';
export interface TypeErrorDay4 {
  err1?: string,
  err2?: string,
  err3?: string,
  err4?: string,
  err5?: string
}
const Week1Day4 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [step, setStep] = useState(1);
  const [error, setError] = useState<TypeErrorDay4>({})
  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setMessageError] = useState<string>('')
  const [data, setData] = useState<
    Array<{ x: string; y: number; label?: string }>
  >([
    { x: '10대', y: 0 },
    { x: '20대', y: 0 },
    { x: '30대', y: 0 },
    { x: '40대', y: 0 },
    { x: '50대', y: 0 },
  ]);
  const [inputText1, setInputText1] = useState('');
  const [inputText2, setInputText2] = useState('');
  const [inputText3, setInputText3] = useState('');
  const [inputText4, setInputText4] = useState('');
  const handleClickNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {

      const dataSubmit = {
        score10: data[0].y,
        score20: data[1].y,
        score30: data[2].y,
        score40: data[3].y,
        score50: data[4].y,
        inputText1,
        inputText2,
        inputText3,
        inputText4
      }
      console.log("54", dataSubmit)
      // setIsLoading(true)
      // try {
      //   // const dataSubmit = {
      //   //   ...data,
      //   //   inputText1,
      //   //   inputText2,
      //   //   inputText3,
      //   //   inputText4
      //   // }
      //   console.log(dataSubmit);
      //   const res = await lessonService.putLesson("lesson2", data)
      //   if (res.code === 201) {
      //     setIsLoading(false)
      //     setStep(0);

      //   }
      // } catch (error: any) {
      //   if (error?.response?.status === 400) {
      //     setMessageError(error.response.data.message);
      //   } else {
      //     setMessageError("Unexpected error occurred.");
      //   }
      // }
      // finally {
      //   setIsLoading(false)
      // }
    }
  };
  const handleClickDone = () => {
    navigation.goBack();
  };
  const isAllErrorsEmpty = (error: TypeErrorDay4) => {
    return Object.values(error).every(value => value === '');
  };
  const areAllFieldsFilled = (data: Array<{ x: string; y: number; label?: string }>) => {
    return data.every(field => field.y > 0);
  };
  const isDisable = step !== 2 || (areAllFieldsFilled(data) && isAllErrorsEmpty(error));
  console.log("data", data)
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
      <GreetingComponent text="인사말" />
      <View style={{ flex: 1 }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2
          error={error}
          setError={newError => setError(prev => ({ ...prev, ...newError }))}
          data={data}
          setData={setData}
        />}
        {step === 3 && <Step3
          inputText1={inputText1}
          inputText2={inputText2}
          inputText3={inputText3}
          inputText4={inputText4}
          setInputText1={setInputText1}
          setInputText2={setInputText2}
          setInputText3={setInputText3}
          setInputText4={setInputText4}
        />}
        {step === 0 && <Done />}
      </View>
      {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 20,
        }}>
        <ButtonComponent
          isDisable={!isDisable}
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
  textError: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.red
  }
})
export default Week1Day4;
