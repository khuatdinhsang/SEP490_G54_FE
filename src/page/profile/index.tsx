import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View, ScrollView } from 'react-native';
import { paddingHorizontalScreen } from '../../styles/padding';
import colors from '../../constant/color';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { IMAGE } from '../../constant/image';
import {
  flexCenter,
  flexRow,
  flexRowSpaceBetween,
} from '../../styles/flex';
import CategoryComponent from '../../component/category';
import { SCREENS_NAME } from '../../navigator/const';
import { authService } from '../../services/auth';
import LoadingScreen from '../../component/loading';
import { lessonService } from '../../services/lesson';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANG } from '../home/const';

const Profile = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [lesson1, setLesson1] = useState<string>("")
  const [lesson2, setLesson2] = useState<{ strength: string, weakness: string }>({ strength: "", weakness: "" })
  const [lesson7, setLesson7] = useState<boolean>(false);
  const [medical, setMedical] = useState<string>("")
  const fetchWeightAndHeight = async () => {
    setIsLoading(true);
    try {
      const langAys = await AsyncStorage.getItem("language")
      const lang = langAys === 'en' ? LANG.EN : LANG.KR
      const res = await authService.getHeightWeight(lang);
      if (res.code === 200) {
        console.log("re", res.result)
        setHeight(res.result.height);
        setWeight(res.result.weight);
        setName(res.result.name);
        setMedical(res.result.medicalUser.name)
        setMessageError("");
      } else {
        setMessageError("Failed to fetch questions.");
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
  const getLesson2 = async () => {
    setIsLoading(true);
    try {
      const res = await lessonService.getLesson2();
      if (res.code === 200) {
        setLesson2({
          strength: res.result.strength ?? "",
          weakness: res.result.weakPoint ?? ""
        });
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
        console.log("d", res.result)
        if (res.result?.activityCommitment?.length > 0) {
          setLesson7(true)
        } else {
          setLesson7(false)
        }
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
    fetchWeightAndHeight();
    getLesson1();
    getLesson2();
    getLesson7();
  }, []);

  const handleClinicalSurvey = () => { };

  const handleMakeHospitalSchedule = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.MAKE_HOSPITAL_SCHEDULE);
  };
  const handleMyHealthMissionStatement = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.MISSION_STATEMENT, { lesson7: lesson7 })
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <HeaderNavigatorComponent
            text={t("hospital.myInfo")}
            isIconLeft={true}
            handleClickArrowLeft={() => navigation.goBack()}
          />
          <View style={{ marginTop: 20 }} />
          <View style={[flexRow]}>
            <Image source={IMAGE.HOME.SIDEBAR.프로필이미지} />
            <Text style={styles.textName}>{name}</Text>
          </View>
          {lesson1 && (
            <View style={[flexRow, styles.lesson1]}>
              <Image source={IMAGE.ICON_LIGHT} style={styles.iconImage} />
              <Text style={styles.textLesson}>{t("hospital.myGoal")}: {lesson1}</Text>
            </View>
          )}
          <Text style={styles.labelSection}>{t("hospital.myBiometricData")}</Text>
          <ScrollView  >
            <View style={[styles.sectionContainer, flexRowSpaceBetween]}>
              <View style={[flexCenter]}>
                <Text style={styles.nameSection}>{t("hospital.high")}</Text>
                <Text style={styles.valueSection}>{height}cm</Text>
              </View>
              <View style={[flexCenter]}>
                <Text style={styles.nameSection}>{t("hospital.weight")}</Text>
                <Text style={styles.valueSection}>{weight}kg</Text>
              </View>
              <View style={[flexCenter]}>
                <Text style={styles.nameSection}>{t("hospital.carcinoma")}</Text>
                <Text style={styles.valueSection}>{t("hospital.colonCancer")}</Text>
              </View>
              <View style={[flexCenter]}>
                <Text style={styles.nameSection}>{t("hospital.chronicDisease")}</Text>
                <Text style={styles.valueSection}>{medical}</Text>
              </View>
            </View>
          </ScrollView>
          {lesson2?.strength?.length > 0 &&
            lesson2?.weakness?.length > 0 &&
            (
              <View>
                <Text style={styles.labelSection}>{t("hospital.healthStrategy")}/{t("hospital.weakness")}</Text>
                <View style={styles.lesson2}>
                  <View style={flexRow}>
                    <Text style={[styles.textLesson, { color: colors.orange_04 }]}>{t("hospital.strength")}</Text>
                    <Text style={[styles.textLesson, { marginLeft: 10, color: colors.gray_G08 }]}>{lesson2.strength}</Text>
                  </View>
                  <View style={[flexRow, { marginTop: 5 }]}>
                    <Text style={[styles.textLesson, { color: colors.blue_01 }]}>{t("hospital.weakness")}</Text>
                    <Text style={[styles.textLesson, { marginLeft: 10, color: colors.gray_G08 }]}>{lesson2.weakness}</Text>
                  </View>
                </View>
              </View>
            )}
          <View style={styles.divide} />
          <View>
            <CategoryComponent
              text={t("hospital.myHeartMission")}
              handleOnPress={handleMyHealthMissionStatement}
            />
            <CategoryComponent
              text={t("hospital.makeAHospital")}
              handleOnPress={handleMakeHospitalSchedule}
            />
          </View>
        </View>
      </ScrollView>
      {messageError && !isLoading && <Text style={[styles.textLesson, { color: colors.red }]}>{messageError}</Text>}
      {isLoading && <LoadingScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen * 2,
    paddingBottom: 20, // Ensure bottom padding for scroll view
  },
  scrollView: {
    flex: 1,
  },
  textName: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginLeft: 12,
  },
  labelSection: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray_G07,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionContainer: {
    backgroundColor: colors.gray_G01,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  nameSection: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: colors.gray_G07,
    marginBottom: 4,
  },
  valueSection: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    textAlign: 'center',
    flexWrap: 'wrap',
    maxWidth: 100
  },
  divide: {
    height: 8,
    backgroundColor: colors.gray_G01,
    marginVertical: 24,
  },
  lesson1: {
    borderRadius: 8,
    paddingVertical: 14,
    backgroundColor: colors.orange_04,
    marginTop: 10,
  },
  textLesson: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 16,
  },
  lesson2: {
    backgroundColor: colors.gray_G01,
    paddingVertical: 20,
    paddingLeft: 20,
    borderRadius: 8,
  },
  iconImage: {
    marginLeft: 15,
    marginRight: 10,
  },
});

export default Profile;
