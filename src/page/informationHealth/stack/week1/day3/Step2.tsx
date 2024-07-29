import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputShareComponent from '../../../components/InputShareComponent';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { setClosePerson1Redux, setClosePerson2Redux } from '../../../../../store/closePerson.slice';
import LoadingScreen from '../../../../../component/loading';
import { lessonService } from '../../../../../services/lesson';

interface Step2Props {
  setIsDisabled: (value: boolean) => void,
  step: number,
  setStep: (value: number) => void,
  setUser: (value: number) => void,
  setIsLoading: (value: boolean) => void,
  closePerson2EvaluationRedux: string,
  closePerson1EvaluationRedux: string,
  closePerson1MessageRedux: string,
  closePerson2MessageRedux: string
}
const Step2 = (props: Step2Props) => {
  const {
    setIsDisabled, step, setStep, setUser, setIsLoading,
    closePerson2EvaluationRedux,
    closePerson1EvaluationRedux,
    closePerson1MessageRedux,
    closePerson2MessageRedux
  } = props
  const dispatch = useDispatch();

  const closePerson1Redux = useSelector((state: RootState) => state.closePerson.closePerson1);
  const closePerson2Redux = useSelector((state: RootState) => state.closePerson.closePerson2);
  const [closePerson1, setClosePerson1] = useState<string>(closePerson1Redux)
  const [closePerson2, setClosePerson2] = useState<string>(closePerson2Redux)
  const [messageError, setMessageError] = useState<string>("")
  useEffect(() => {
    const getDataLesson3 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson3()
        if (res.code === 200) {
          setMessageError("");
          setClosePerson1(res.result.closePerson1)
          setClosePerson2(res.result.closePerson2)
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
    getDataLesson3()
  }, [])

  useEffect(() => {
    dispatch(setClosePerson1Redux(closePerson1.trim()));
    dispatch(setClosePerson2Redux(closePerson2.trim()));
  }, [closePerson1, closePerson2, dispatch]);

  useEffect(() => {
    const isDisable = (closePerson1EvaluationRedux.trim().length === 0 ||
      closePerson2EvaluationRedux.trim().length === 0 ||
      closePerson1MessageRedux.trim().length === 0 ||
      closePerson2MessageRedux.trim().length === 0 ||
      closePerson1.trim().length === 0 || closePerson2.trim().length === 0
    )
    setIsDisabled(isDisable)
  }, [closePerson1, closePerson2, setIsDisabled])



  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text="사랑하는 사람 작성해보기" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content="사랑하는 사람 3명을 작성해봅시다."
        />
        <View style={{ marginTop: 20 }} />
        <Text style={styles.text}>
          나에 대한 평가와 긍정적인 메시지도 받아 봅시다. 이름 작성 후
          공유하기를 눌러 카카오톡이나 메시지로 전송해서 작성을 부탁해보세요.
          이름을 누르면 지인의 작성 내용을 확인할 수 있습니다.
        </Text>
        <View style={{ marginTop: 32 }} />
        <InputShareComponent
          text="1."
          textButton="공유하기"
          placeholder="이름"
          closePerson={closePerson1}
          step={step}
          setStep={setStep}
          setClosePerson={setClosePerson1}
          setUser={() => setUser(1)}
        />
        <InputShareComponent
          text="2."
          textButton="공유하기"
          placeholder="이름"
          closePerson={closePerson2}
          step={step}
          setStep={setStep}
          setClosePerson={setClosePerson2}
          setUser={() => setUser(2)}
        />
        {messageError && <Text style={styles.textError}>{messageError}</Text>}
        <View style={{ paddingBottom: 40 }} />
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
  textError: {
    fontWeight: "500",
    fontSize: 14,
    color: colors.red
  }
});
export default Step2;
