import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../../../../component/button';
import HeaderNavigatorComponent from '../../../../../component/header-navigator';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import GreetingComponent from '../../../../informationHealth/components/GreetingComponent';
import Step1 from './Step1';
import Step2 from './Step2';
import DialogSingleComponent from '../../../../../component/dialog-single';
import { IMAGE } from '../../../../../constant/image';
import Done from './Done';
import Step3 from './Step3';
import LoadingScreen from '../../../../../component/loading';
import { putLesson6 } from '../../../../../constant/type/lesson';
import { lessonService } from '../../../../../services/lesson';

const Week1Day6 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [step, setStep] = useState(1);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [messageError, setMessageError] = useState<string>("")
  const [valueSubmit, setValueSubmit] = useState<putLesson6 | any>()
  const handleClickNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      setIsLoading(true)
      try {
        const res = await lessonService.putLesson6(valueSubmit)
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
  const getValuesSubmit = (values: putLesson6) => {
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
          isDisabled setIsDisabled={setDisabled}
          onSubmit={getValuesSubmit}
          setIsLoading={setIsLoading}
        />}
        {step === 3 && <Step3 isDisabled setIsDisabled={setDisabled} />}
        {step === 0 && <Done />}
      </View>
      {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 20,
        }}>
        <ButtonComponent
          text={step ? '다음' : '홈으로 돌아가기'}
          textColor={colors.white}
          handleClick={step ? handleClickNext : handleClickDone}
          isDisable={disabled}
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
    color: colors.red,
    fontSize: 14
  }
});
export default Week1Day6;
