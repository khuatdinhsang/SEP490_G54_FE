import React from "react";
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

type MissionStatementRouteParams = {
  lesson7?: boolean;
};

const MissionStatement = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t, i18n } = useTranslation();
  const route = useRoute<RouteProp<{ params: MissionStatementRouteParams }, 'params'>>();
  const lesson7 = route.params?.lesson7 ?? false;

  const goBackPreviousPage = () => {
    navigation.goBack();
  };

  const backToMain = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.MAIN);
  };

  return (
    <SafeAreaView style={styles.container}>
      {lesson7 && (
        <Image style={styles.stamp} source={IMAGE.PROFILE.STAMP} />
      )}
      <View style={styles.header}>
        <HeaderNavigatorComponent
          isIconLeft={true}
          text={"나의 건강사명서"}
          handleClickArrowLeft={goBackPreviousPage}
        />
      </View>
      {lesson7 ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <View style={styles.topMargin} />
          <ImageBackground
            source={IMAGE.INFORMATION_HEALTH.SUBTRACT}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.imagePadding} />
            <Text style={styles.mailTitle}>“건강 사명서”</Text>
            <View style={styles.titlePadding} />
            <Text style={styles.mailContent}>
              나의 인생 목표는
              <Text style={styles.mailContentBold}>질병 극복</Text>입니다. 현재
              나의 삶의 위기는
              <Text style={styles.mailContentBold}>정서적 어려움</Text> 입니다.
              나에게 건강은 행복한
              <Text style={styles.mailContentBold}>삶을 위한 준비물</Text>입니다.
            </Text>
            <View style={styles.contentPadding} />
            <Text style={[styles.mailContent, { paddingHorizontal: 60 }]}>
              건강 실천을 위한 다짐으로
              <Text style={styles.mailContentBold}>일주일에 세번 걷기</Text>, 균
              <Text style={styles.mailContentBold}>형잡힌 식사를 하기</Text>,
              하루에 10분씩 명상하기, 시간에 맞추어 약물 복용하기 입니다.
            </Text>
            <View style={styles.contentPadding} />
            <Text style={styles.mailContent}>
              실천을 어렵게 하는 요인으로는 의지 및 끈기 부족이 있지만 극복
              방법으로
              <Text style={styles.mailContentBold}>가족에게 도움 구하기</Text>를
              할 것입니다.
            </Text>
          </ImageBackground>
          <Pressable onPress={backToMain} style={styles.button}>
            <Text style={styles.textButton}>홈페이지</Text>
          </Pressable>
        </ScrollView>
      ) : (
        <View style={[styles.centeredView, { marginTop: -100 }]}>
          <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
          <Text style={styles.textTitle}>건강사명서를 작성하지 않았어요</Text>
          <Text style={styles.textDesc}>건강학습에서 진행될 예정이에요</Text>
        </View>
      )}
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
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: paddingHorizontalScreen * 2,
  },
  topMargin: {
    marginTop: 20,
  },
  imagePadding: {
    paddingTop: 35,
  },
  titlePadding: {
    paddingTop: 28,
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
    height: ((WidthDevice - paddingHorizontalScreen * 4) * 599) / 366,
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
