import { Dispatch, SetStateAction, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import InputComponent from '../../../../../component/input';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import DialogSingleComponent from '../../../../../component/dialog-single';
import { IMAGE } from '../../../../../constant/image';
import { useTranslation } from 'react-i18next';

interface Step2Props {
  errOneYearGoal: string,
  errMidTermGoal: string,
  midTermGoal: string,
  oneYearGoal: string,
  setErrOneYearGoal: (value: string) => void;
  setMidTermGoal: (value: string) => void;
  setErrMidTermGoal: (value: string) => void;
  setOneYearGoal: (value: string) => void;
}
const Step2 = ({ errOneYearGoal,
  errMidTermGoal, midTermGoal, oneYearGoal,
  setErrOneYearGoal, setMidTermGoal, setErrMidTermGoal, setOneYearGoal }: Step2Props) => {
  const { t } = useTranslation();
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent textLeft="Step2" text={t("lesson.goalsOneYear")} />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={85}
          content={t("lesson.makePlans")}
        />
        <View style={{ marginTop: 20 }} />
        <Text style={styles.label}>{t("lesson.intermediateGoal")}</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          value={midTermGoal}
          textAlignVertical='top'
          onChangeText={(text) => {
            setErrMidTermGoal("");
            if (text?.trim()?.length === 0) {
              setErrMidTermGoal(t("placeholder.err.invalidInput"));
              setMidTermGoal("")
            }
            setMidTermGoal(text);
          }}
          placeholder={t("lesson.example1")}
          multiline={true}
          maxLength={200}
        />
        {errMidTermGoal && <Text style={styles.textError}>{errMidTermGoal}</Text>}
        <View style={{ marginTop: 20 }} />
        <Text style={styles.label}>{t("lesson.oneYearLater")}</Text>
        <TextInput
          style={[styles.input, { height: 120 }]}
          value={oneYearGoal}
          textAlignVertical='top'
          onChangeText={(text) => {
            setErrOneYearGoal("");
            if (text?.trim()?.length === 0) {
              setErrOneYearGoal(t("placeholder.err.invalidInput"));
              setOneYearGoal("")
            }
            setOneYearGoal(text);
          }}
          placeholder={t("lesson.example2")}
          multiline={true}
          maxLength={200}
        />
        {errOneYearGoal && <Text style={styles.textError}>{errOneYearGoal}</Text>}
        <View style={{ paddingBottom: 30 }} />
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
  input: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderColor: colors.gray_G03,
    borderWidth: 1,
    borderRadius: 8,
    color: colors.black,
  },
  textError: {
    color: colors.red,
    fontWeight: "500",
    fontSize: 14
  },
  label: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginBottom: 12,
  },
});
export default Step2;
