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
import Step3, { valuesStep3 } from './Step3';
import LoadingScreen from '../../../../../component/loading';
import { lessonService } from '../../../../../services/lesson';
import { useTranslation } from 'react-i18next';

const Week1Day4 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t } = useTranslation()
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState<boolean>(false)
  const [messageError, setMessageError] = useState<string>('')
  const [valueStep2, setValueStep2] = useState<{ x: string, y: number }[] | any>()
  const [valueStep3, setValueStep3] = useState<valuesStep3 | any>()
  const handleClickNext = async () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      const dataSubmit = {
        score10: valueStep2[0].y,
        score20: valueStep2[1].y,
        score30: valueStep2[2].y,
        score40: valueStep2[3].y,
        score50: valueStep2[4].y,
        recentValues: valueStep3?.recentValues,
        influenceOnLife: valueStep3?.influenceOnLife,
        newValues: valueStep3?.newValues,
        reasonForChanging: valueStep3?.reasonForChanging
      }
      setIsLoading(true)
      try {
        const res = await lessonService.putLesson4(dataSubmit)
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
  const handleGetValueStep2 = (value: { x: string, y: number }[]) => {
    setValueStep2(value)
  }
  const handleGetValueStep3 = (value: valuesStep3) => {
    setValueStep3(value)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: paddingHorizontalScreen * 2 }}>
        <HeaderNavigatorComponent
          isIconLeft={true}
          text={t("lesson.learn")}
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <GreetingComponent text={t("lesson.greetings")} />
      <View style={{ flex: 1 }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2
          step={step}
          setIsDisabled={setIsDisabled}
          onSubmit={handleGetValueStep2}
          setIsLoading={setIsLoading}
        />}
        {step === 3 && <Step3
          setIsDisabled={setIsDisabled}
          onSubmit={handleGetValueStep3}
          setIsLoading={setIsLoading}
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
          isDisable={isDisabled}
          text={step ? t("common.text.next") : t("planManagement.text.gotoHome")}
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
