import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
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
import LoadingScreen from '../../../../../component/loading';
import { lessonService } from '../../../../../services/lesson';
import { SCREENS_NAME } from '../../../../../navigator/const';

const Week1Day1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [step, setStep] = useState(1);
  const [isDialog, setIsDialog] = useState(false);
  const [midTermGoal, setMidTermGoal] = useState('');
  const [errMidTermGoal, setErrMidTermGoal] = useState('')
  const [oneYearGoal, setOneYearGoal] = useState('');
  const [errOneYearGoal, setErrOneYearGoal] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageError, setMessageError] = useState<string>('')
  useEffect(() => {
    const getDataLesson1 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson1()
        if (res.code === 200) {
          setMessageError("");
          setMidTermGoal(res.result.intermediateGoal ?? "")
          setOneYearGoal(res.result.endOfYearGoal ?? "")
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
    getDataLesson1()
  }, [])
  const handleClickNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsDialog(true);
    }
  };
  const handleClickDone = () => {
    navigation.goBack();
  };

  const handleClickButtonCancelStep2 = () => {
    setIsDialog(false);
  };
  const handleClickButtonConfirmStep2 = async (): Promise<void> => {
    setIsLoading(true)
    setIsDialog(false);
    try {
      const data = {
        endOfYearGoal: oneYearGoal?.trim(),
        intermediateGoal: midTermGoal?.trim()
      }
      const res = await lessonService.putLesson1(data)
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
  };
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
          oneYearGoal={oneYearGoal}
          midTermGoal={midTermGoal}
          errMidTermGoal={errMidTermGoal}
          errOneYearGoal={errOneYearGoal}
          setErrOneYearGoal={setErrOneYearGoal}
          setOneYearGoal={setOneYearGoal}
          setMidTermGoal={setMidTermGoal}
          setErrMidTermGoal={setErrMidTermGoal}
        />}
        {step === 0 && <Done />}
      </View>
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 20,
        }}>
        <ButtonComponent
          isDisable={((midTermGoal?.trim().length > 0 && oneYearGoal?.trim().length > 0) || step !== 2) ? false : true}
          text={step ? '다음' : '홈으로 돌아가기'}
          textColor={colors.white}
          handleClick={step ? handleClickNext : handleClickDone}
        />
      </View>
      {isDialog && (
        <DialogSingleComponent
          isOverlay={true}
          isActive={true}
          imageSource={IMAGE.INFORMATION_HEALTH.ICON_WARNING}
          title="정말 뒤로가시겠습니까?"
          content="입력하신 내용은 자동으로 저장됩니다."
          textButtonCancel="취소"
          textButtonConfirm="네"
          handleClickButtonCancel={handleClickButtonCancelStep2}
          handleClickButtonConfirm={handleClickButtonConfirmStep2}
          btnDelete={true}
          itemSelected={1}
        />
      )}
      {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
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
export default Week1Day1;
