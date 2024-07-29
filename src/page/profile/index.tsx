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

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<string>("");
  const [height, setHeight] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [lesson, setLesson] = useState<number>(1);

  const fetchWeightAndHeight = async () => {
    setIsLoading(true);
    try {
      const res = await authService.getHeightWeight();
      if (res.code === 200) {
        setHeight(res.result.height);
        setWeight(res.result.weight);
        setName(res.result.name);
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

  const getListLesson = async () => {
    setIsLoading(true);
    try {
      const res = await lessonService.getLessonUnLocked();
      if (res.code === 200) {
        setLesson(res.result.lesson);
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
    getListLesson();
  }, []);

  const handleClinicalSurvey = () => { };

  const handleMakeHospitalSchedule = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.MAKE_HOSPITAL_SCHEDULE);
  };
  const handleMyHealthMissionStatement = () => { }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <HeaderNavigatorComponent
            text="내정보"
            isIconLeft={true}
            handleClickArrowLeft={() => navigation.goBack()}
          />
          <View style={{ marginTop: 20 }} />
          <View style={[flexRow]}>
            <Image source={IMAGE.HOME.SIDEBAR.프로필이미지} />
            <Text style={styles.textName}>{name}</Text>
          </View>
          {lesson >= 1 && (
            <View style={[flexRow, styles.lesson1]}>
              <Image source={IMAGE.ICON_LIGHT} style={styles.iconImage} />
              <Text style={styles.textLesson}>나의 목표: 식단 조절 잘하기</Text>
            </View>
          )}
          <Text style={styles.labelSection}>나의 생체 데이터</Text>
          <View style={[styles.sectionContainer, flexRowSpaceBetween]}>
            <View style={flexCenter}>
              <Text style={styles.nameSection}>키</Text>
              <Text style={styles.valueSection}>{height}cm</Text>
            </View>
            <View style={flexCenter}>
              <Text style={styles.nameSection}>몸무게</Text>
              <Text style={styles.valueSection}>{weight}kg</Text>
            </View>
            <View style={flexCenter}>
              <Text style={styles.nameSection}>암종</Text>
              <Text style={styles.valueSection}>대장암</Text>
            </View>
            <View style={flexCenter}>
              <Text style={styles.nameSection}>만성질환</Text>
              <Text style={styles.valueSection}>고혈압</Text>
            </View>
          </View>
          {lesson >= 2 && (
            <View>
              <Text style={styles.labelSection}>건강전략 강/약점</Text>
              <View style={styles.lesson2}>
                <View style={flexRow}>
                  <Text style={[styles.textLesson, { color: colors.orange_04 }]}>강점</Text>
                  <Text style={[styles.textLesson, { marginLeft: 10, color: colors.gray_G08 }]}>긍정적인 마음 갖기</Text>
                </View>
                <View style={[flexRow, { marginTop: 5 }]}>
                  <Text style={[styles.textLesson, { color: colors.blue_01 }]}>약점</Text>
                  <Text style={[styles.textLesson, { marginLeft: 10, color: colors.gray_G08 }]}>신앙과 종교생활 갖기</Text>
                </View>
              </View>
            </View>
          )}
          <View style={styles.divide} />
          <View>
            <CategoryComponent
              text="나의 건강사명서"
              handleOnPress={handleMyHealthMissionStatement}
            />
            <CategoryComponent
              text="임상설문"
              handleOnPress={handleClinicalSurvey}
            />
            <CategoryComponent
              text="병원일정정하기"
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
