import { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import InputComponent from '../../../../../component/input';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import MultiTextInputComponent from './component/MultiTextInputComponent';
import { IMAGE } from '../../../../../constant/image';
import { WidthDevice } from '../../../../../util/Dimenssion';
import { putLesson7 } from '../../../../../constant/type/lesson';
import LoadingScreen from '../../../../../component/loading';
import { lessonService } from '../../../../../services/lesson';
import { useTranslation } from 'react-i18next';

interface Step2FilledProps {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: (values: putLesson7) => void;
  setIsLoading: (value: boolean) => void;
}
const Step2Filled = (props: Step2FilledProps) => {
  const { isDisabled, setIsDisabled, onSubmit, setIsLoading } = props;
  const { t } = useTranslation()
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');
  const [messageError, setMessageError] = useState("")
  const [multiText, setMultiText] = useState({
    text1: '',
    text2: '',
    text3: '',
    text4: '',
  });

  useEffect(() => {
    const getDataLesson1 = async () => {
      setIsLoading(true)
      try {
        const res = await lessonService.getLesson7()
        if (res.code === 200) {
          setMessageError("");
          setText1(res.result.whatIsHealth ?? "")
          setText2(res.result.roadBlock ?? "")
          setText3(res.result.solution ?? "")
          setText4(res.result.commitment ?? "")
          setMultiText({
            text1: res.result.activityCommitment ?? "",
            text2: res.result.dietCommitment ?? "",
            text3: res.result.mentalCommitment ?? "",
            text4: res.result.medicineCommitment ?? ""
          })
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
  useEffect(() => {
    onSubmit({
      whatIsHealth: text1,
      activityCommitment: multiText.text1,
      dietCommitment: multiText.text2,
      mentalCommitment: multiText.text3,
      medicineCommitment: multiText.text4,
      roadBlock: text2,
      solution: text3,
      commitment: text4,
      diary: ""
    })
    if (
      text1?.trim()?.length > 0 &&
      text2?.trim()?.length &&
      text3?.trim()?.length &&
      text4?.trim()?.length &&
      multiText.text1?.trim()?.length &&
      multiText.text2?.trim()?.length &&
      multiText.text3?.trim()?.length &&
      multiText.text4?.trim()?.length
    ) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [text1, text2, text3, text4, multiText]);

  return (
    <View style={[styles.container]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text={t("lesson.writeHealthMission")} />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.beforeLearning")}
        />
        <View style={{ marginTop: 20 }} />
        <InputComponent
          placeholder={t("lesson.example15")}
          label={t("lesson.healthMeansToMe")}
          value={text1}
          onChangeText={(value) => {
            if (value?.trim()?.length === 0) {
              setText1("")
            }
            setText1(value)
          }}
        />
        <View style={{ marginTop: 20 }} />
        <Text style={[styles.text, { marginBottom: 8 }]}>
          {t("lesson.commitmentToHealth")}
        </Text>
        <MultiTextInputComponent
          multiText={multiText}
          setMultiText={setMultiText}
        />
        <View style={{ marginTop: 20 }} />
        <InputComponent
          placeholder={t("lesson.example16")}
          label={t("lesson.makeImplementation")}
          value={text2}
          onChangeText={(value) => {
            if (value?.trim()?.length === 0) {
              setText2("")
            }
            setText2(value)
          }}
        />
        <View style={{ marginTop: 20 }} />
        <InputComponent
          placeholder={t("lesson.example17")}
          label={t("lesson.howToOverCome")}
          value={text3}
          onChangeText={(value) => {
            if (value?.trim()?.length === 0) {
              setText3("")
            }
            setText3(value)
          }}
        />
        <View style={{ marginTop: 20 }} />
        <InputComponent
          placeholder={t("lesson.example18")}
          label={t("lesson.wordOfPledge")}
          value={text4}
          onChangeText={(value) => {
            if (value?.trim()?.length === 0) {
              setText4("")
            }
            setText4(value)
          }}
        />
        <View style={{ paddingBottom: 20 }} />
        {messageError && <Text style={styles.textError}>{messageError}</Text>}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
    flex: 1,
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
export default Step2Filled;
