import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ButtonComponent from '../../../../../component/button';
import HeaderNavigatorComponent from '../../../../../component/header-navigator';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import GreetingComponent from '../../../components/GreetingComponent';
import Done from './Done';
import Step1 from './Step1';
import Step2 from './Step2';
import { lessonService } from '../../../../../services/lesson';
import LoadingScreen from '../../../../../component/loading';
import { useTranslation } from 'react-i18next';

const Week1Day2 = () => {
  const { t } = useTranslation()
  const [step, setStep] = useState(1);
  const [advantage, setAdvantage] = useState('');
  const [errAdvantage, setErrAdvantage] = useState('');
  const [defect, setDefect] = useState('');
  const [errDefect, setErrDefect] = useState('');
  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setMessageError] = useState<string>('')
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  useEffect(() => {
    const getDataLesson2 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson2()
        if (res.code === 200) {
          setMessageError("");
          setAdvantage(res.result.strength)
          setDefect(res.result.weakPoint)
          setIsLoading(false)
        } else {
          setMessageError("Unexpected error occurred.");
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
    getDataLesson2()
  }, [])
  const handleClickNext = async () => {
    if (step === 1) {
      setStep(2);
    }
    if (step === 2) {
      setIsLoading(true)
      try {
        const data = {
          strength: advantage?.trim(),
          weakPoint: defect?.trim()
        }
        const res = await lessonService.putLesson2(data)
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
      {step ? <GreetingComponent text={t("lesson.greetings")} /> : <View />}
      <View style={{ flex: 1 }}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2
          advantage={advantage}
          errAdvantage={errAdvantage}
          defect={defect}
          errDefect={errDefect}
          setAdvantage={setAdvantage}
          setErrAdvantage={setErrAdvantage}
          setDefect={setDefect}
          setErrDefect={setErrDefect}
        />}
        {step === 0 && <Done />}
      </View>
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 20,
        }}>
        <ButtonComponent
          isDisable={((advantage && defect) || step !== 2) ? false : true}
          text={step ? t("common.text.next") : t("planManagement.text.gotoHome")}
          textColor={colors.white}
          handleClick={step ? handleClickNext : handleClickDone}
        />
      </View>
      {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
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
export default Week1Day2;
