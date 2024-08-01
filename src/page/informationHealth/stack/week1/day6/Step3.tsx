import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import InputComponent from '../../../../../component/input';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import TickComponent from './component/TickComponent';
import GreenComponent from '../../../components/GreenComponent';
import { useTranslation } from 'react-i18next';

interface Step2Props {
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}
const Step3 = (props: Step2Props) => {
  const { isDisabled, setIsDisabled } = props;
  const { t } = useTranslation()
  useEffect(() => {
    setIsDisabled(false);
  }, []);

  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1 }}>
          <StepComponent textLeft="Step3" text={t("lesson.postCardOfHope")} />
          <View style={{ marginTop: 32 }} />
          <DoctorComponent
            height={85}
            content={t("lesson.shareAPostcard")}
          />
          <View style={{ marginTop: 20 }} />
          <Text style={styles.text}>
            {t("lesson.readPostCard")}
          </Text>
          <View style={{ marginTop: 20 }} />
          <GreenComponent />
          <Text style={styles.mailTitle}>{t("lesson.postCard")}</Text>
          <Text style={styles.mailContent}>
            {t("lesson.iAm")}
            <Text
              style={styles.mailContentBold}
              onPress={() => {
                console.log('Click Text');
              }}>
              {t("lesson.overComingDisease")}
            </Text>
            {t("lesson.mustDoFor")}
            <Text style={styles.mailContentBold}>{t("lesson.dontPutOff")}</Text>{' '}
            {t("lesson.developMyWill")}
          </Text>
          <View style={{ paddingBottom: 20 }} />
        </View>
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
    paddingHorizontal: 50,
  },
  mailContentBold: {
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
});
export default Step3;
