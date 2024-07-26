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
import LoadingScreen from '../../../../../component/loading';
import { putLesson5 } from '../../../../../constant/type/lesson';
import { lessonService } from '../../../../../services/lesson';

const Week1Day5 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>("")
  const [disabled, setDisabled] = useState<boolean>(false)
  const [valueSubmit, setValueSubmit] = useState<putLesson5 | any>()
  const handleClickNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsLoading(true)
      try {
        const res = await lessonService.putLesson5(valueSubmit)
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
  console.log("30", valueSubmit)
  const handleClickDone = () => {
    navigation.goBack();
  };
  const getValuesSubmit = (values: putLesson5) => {
    setValueSubmit(values)
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
      <GreetingComponent text="인사말" />
      <View style={{ flex: 1 }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2
          setIsLoading={setIsLoading}
          setDisabled={setDisabled}
          onSubmit={getValuesSubmit}
        />}
        {step === 0 && <Done />}
      </View>
      {messageError && <Text style={styles.textError}>{messageError}</Text>}
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 20,
        }}>
        <ButtonComponent
          isDisable={disabled}
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
export default Week1Day5;
