import React, { useEffect, useState } from "react";
import { ParamListBase, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SCREENS_NAME } from "../../navigator/const";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderNavigatorComponent from "../../component/header-navigator";
import { IMAGE } from "../../constant/image";
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import colors from "../../constant/color";
import { WidthDevice } from "../../util/Dimenssion";
import { paddingHorizontalScreen } from "../../styles/padding";
import LoadingScreen from "../../component/loading";
import { lessonService } from "../../services/lesson";
import { putLesson7 } from "../../constant/type/lesson";
import { flexRow } from "../../styles/flex";

type MissionStatementRouteParams = {
  lesson7?: boolean;
};

const MissionStatement = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");
  const route = useRoute<RouteProp<{ params: MissionStatementRouteParams }, 'params'>>();
  const lesson7 = route.params?.lesson7 ?? false;
  const [lesson1, setLesson1] = useState<string>("")
  const [dataLesson7, setDataLesson7] = useState<putLesson7>()
  const goBackPreviousPage = () => {
    navigation.goBack();
  };

  const backToMain = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.MAIN);
  };
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
  const getLesson7 = async () => {
    setIsLoading(true);
    try {
      const res = await lessonService.getLesson7();
      if (res.code === 200) {
        setDataLesson7(res.result)
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
    getLesson1();
    getLesson7();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {lesson7 && (
        <Image style={styles.stamp} source={IMAGE.PROFILE.STAMP} />
      )}
      <View style={styles.header}>
        <HeaderNavigatorComponent
          isIconLeft={true}
          text={t("hospital.myHeartMission")}
          handleClickArrowLeft={goBackPreviousPage}
        />
      </View>
      {lesson7 ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.topMargin} />
          <ImageBackground
            source={IMAGE.INFORMATION_HEALTH.SUBTRACT}
            style={styles.backgroundImage}
            resizeMode="contain"
          >
            <View style={styles.imagePadding} />
            <Text style={styles.mailTitle}>{t("lesson.healthMission")}</Text>
            <View style={styles.titlePadding} />
            <Text style={styles.mailContent}>
              {t("lesson.myLifeGoal")}
              <Text style={styles.mailContentBold}>{lesson1}</Text>{t("lesson.noSee")}. {t("lesson.crisisMyLife")}
              <Text style={styles.mailContentBold}>{dataLesson7?.whatIsHealth}</Text> {t("lesson.noSee")}.
              {t("lesson.healthHappiness")}
              <Text style={styles.mailContentBold}>{dataLesson7?.activityCommitment}</Text>{t("lesson.noSee")}.
            </Text>
            <View style={styles.contentPadding} />
            <Text style={styles.mailContent}>{t("lesson.pledgePractice")}</Text>
            <Text style={styles.mailContentBold}>{dataLesson7?.dietCommitment},</Text>
            <Text style={styles.mailContentBold}>{dataLesson7?.mentalCommitment},</Text>
            <Text style={styles.mailContentBold}>{dataLesson7?.medicineCommitment},</Text>
            <View style={flexRow}>
              <Text style={styles.mailContentBold}>{dataLesson7?.roadBlock}</Text>
              <Text style={[styles.mailContent, { paddingHorizontal: 0 }]}>{t("lesson.noSee")}.</Text>
            </View>
            <View style={styles.contentPadding} />
            <Text style={styles.mailContent}>
              {t("lesson.factorsMakePractice")}
              <Text style={styles.mailContentBold}>{dataLesson7?.solution}</Text>
              {t("lesson.overCome")}
              <Text style={styles.mailContentBold}>{dataLesson7?.commitment}</Text>를
              {t("lesson.willDo")}
            </Text>
          </ImageBackground>
          <Pressable onPress={backToMain} style={styles.button}>
            <Text style={styles.textButton}>{t("hospital.homePage")}</Text>
          </Pressable>
        </ScrollView>
      ) : (
        <View style={[styles.centeredView, { marginTop: -100 }]}>
          <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
          <Text style={styles.textTitle}>{t("hospital.didntFillOut")}</Text>
          <Text style={styles.textDesc}>{t("hospital.healthLearning")}</Text>
        </View>
      )}
      {isLoading && <LoadingScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    position: 'relative',
  },
  stamp: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    zIndex: 20,
  },
  header: {
    backgroundColor: colors.white,
    paddingHorizontal: 20
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: paddingHorizontalScreen * 2,
  },
  topMargin: {
    marginTop: 20,
  },
  imagePadding: {
    paddingTop: 10,
  },
  titlePadding: {
    paddingTop: 20,
  },
  contentPadding: {
    paddingTop: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.gray_G10,
    textAlign: 'center',
  },
  textDesc: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.gray_G06,
    textAlign: 'center',
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
    paddingHorizontal: 50,
  },
  mailContentBold: {
    fontWeight: '700',
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: colors.orange_04,
    paddingVertical: 17,
    borderRadius: 12,
    marginTop: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  textButton: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.white,
    fontWeight: "500",
  },
});

export default MissionStatement;
