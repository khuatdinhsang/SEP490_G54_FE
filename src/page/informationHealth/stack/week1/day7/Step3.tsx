import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputComponent from '../../../../../component/input';
import { lessonService } from '../../../../../services/lesson';

interface Step2Props {
  onSubmit: (value: string) => void;
  setIsDisabled: (value: boolean) => void;
  setIsLoading: (value: boolean) => void
}
const Step3 = (props: Step2Props) => {
  const { onSubmit, setIsDisabled, setIsLoading } = props;
  const [text, setText] = useState('');
  const [messageError, setMessageError] = useState<string>("")
  useEffect(() => {
    onSubmit(text)
    if (text?.trim().length > 0) {
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
    }
  }, [text])
  useEffect(() => {
    const getDataLesson1 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson7()
        if (res.code === 200) {
          setMessageError("");
          setIsLoading(false)
          setText(res.result.diary ?? "")
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

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step3" text="감사일기 작성하기" />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content="이번주의 감사했던 일들을 작성해봅시다."
        />
        <View style={{ marginTop: 20 }} />
        <InputComponent
          value={text}
          onChangeText={(value) => {
            if (value?.trim().length === 0) {
              setText("")
            }
            setText(value)
          }}
          placeholder="예시) 건강을 중요하게 생각"
          label="변화하고자 하는 가치관"
          heightLine={120}
          multiline={true}
        />
      </ScrollView>
      {messageError && <Text style={styles.textError}>{messageError}</Text>}
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
    color: colors.red,
    fontSize: 14
  }
});
export default Step3;
