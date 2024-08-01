import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import colors from '../../../../../constant/color';
import { IMAGE } from '../../../../../constant/image';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import { WidthDevice } from '../../../../../util/Dimenssion';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import { flexRow, flexRowCenter } from '../../../../../styles/flex';
import { putLesson7 } from '../../../../../constant/type/lesson';
import { useEffect, useState } from 'react';
import { lessonService } from '../../../../../services/lesson';
import { useTranslation } from 'react-i18next';

interface Step2Props {
  valuesSubmit: putLesson7
  setIsLoading: (value: boolean) => void
}
const Step2 = (props: Step2Props) => {
  const { t } = useTranslation()
  const { setIsLoading } = props
  const [messageError, setMessageError] = useState<string>("");
  const [lesson1, setLesson1] = useState<string>("")
  const getLesson1 = async () => {
    setIsLoading(true);
    try {
      const res = await lessonService.getLesson1();
      if (res.code === 200) {
        setLesson1(res.result.endOfYearGoal ?? "");
        setMessageError("");
      } else {
        setMessageError("Unexpected error occurred.");
      }
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setMessageError(error.response.data.message);
      } else {
        setMessageError("Unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getLesson1()
  }, [])
  return (
    <View style={[styles.container]}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Image style={styles.stamp} source={IMAGE.PROFILE.STAMP} />
        <StepComponent textLeft="Step2" text={t("lesson.writeHealthMission")} />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.beforeLearning")}
        />
        <View style={{ marginTop: 20 }} />
        <ImageBackground
          source={IMAGE.INFORMATION_HEALTH.SUBTRACT}
          style={styles.backgroundImage}
          resizeMode="contain">
          <Text style={styles.mailTitle}>{t("lesson.healthMission")}</Text>
          <View style={{ paddingTop: 20 }} />
          <Text style={styles.mailContent}>
            {t("lesson.myLifeGoal")}
            <Text style={styles.mailContentBold}>{lesson1}</Text>{t("lesson.noSee")}. {t("lesson.crisisMyLife")}
            <Text style={styles.mailContentBold}>{props.valuesSubmit.whatIsHealth}</Text>{t("lesson.noSee")}.
            {t("lesson.healthHappiness")}
            <Text style={styles.mailContentBold}>{props.valuesSubmit.activityCommitment}</Text>{t("lesson.noSee")}.
          </Text>
          <View style={[flexRow, { paddingTop: 25 }]} />
          <Text style={[styles.mailContent]}>
            {t("lesson.pledgePractice")}
          </Text>
          <Text style={styles.mailContent}>
            <Text style={styles.mailContentBold}>{props.valuesSubmit.dietCommitment},</Text>
            <Text style={styles.mailContentBold}>{props.valuesSubmit.mentalCommitment},</Text>
            <Text style={styles.mailContentBold}>{props.valuesSubmit.medicineCommitment},</Text>
            <View style={flexRow}>
              <Text style={styles.mailContentBold}>{props.valuesSubmit.roadBlock}</Text>
              <Text style={[styles.mailContent, { paddingHorizontal: 0 }]}>{t("lesson.noSee")}.</Text>
            </View>
          </Text>
          <View style={{ paddingTop: 25 }} />
          <Text style={styles.mailContent}>
            {t("lesson.factorsMakePractice")}
            <Text style={styles.mailContentBold}>{props.valuesSubmit.solution}</Text>
            {t("lesson.overCome")}
            <Text style={styles.mailContentBold}>{props.valuesSubmit.commitment}</Text>
            {t("lesson.willDo")}
          </Text>
        </ImageBackground>
      </ScrollView>
      {messageError && <Text style={[styles.textLesson, { color: colors.red }]}>{messageError}</Text>}
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
  backgroundImage: {
    width: WidthDevice - paddingHorizontalScreen * 4,
    // height: ((WidthDevice - paddingHorizontalScreen * 4) * 599) / 366,
    alignItems: 'center',
    aspectRatio: 366 / 599,
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  mailTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.gray_G09,
    lineHeight: 28,
    textAlign: 'center',
  },
  mailContent: {
    fontWeight: '400',
    fontSize: 18,
    color: colors.gray_G07,
    lineHeight: 28,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  mailContentBold: {
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
    fontSize: 18
  },
  stamp: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    zIndex: 20,
  },
  textLesson: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 14,
  },
});
export default Step2;
