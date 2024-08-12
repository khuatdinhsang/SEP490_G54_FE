import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  Image,
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Overlay from '../../component/overlay';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import CounterStepModule from '../../native-module/counter-step.module';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { flexRow } from '../../styles/flex';
import { paddingHorizontalScreen, paddingScreen } from '../../styles/padding';
import { WidthDevice } from '../../util/Dimenssion';
import CategoryComponent from './components/CategoryComponent';
import ClockComponent from './components/ClockComponent';
import GuideBottomStep from './components/GuideBottomStep';
import GuideModal from './components/GuideModal';
import GuideModalReady from './components/GuideModalReady';
import GuideTop from './components/GuideTop';
import HomeHeader from './components/HomeHeader';
import ShoesComponent from './components/ShoesComponent';
import { GuideStep, LANG, SCROLL_VALUE } from './const';
import PermissionRequest from '../../util/Permission';
import TimerModule, { TimerItem } from '../../native-module/timer.module';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setScreen } from '../../store/screen.slice';
import { counterStepService } from '../../services/counterstep';
import { SCREENS_NAME } from '../../navigator/const';
import { authService } from '../../services/auth';
import LoadingScreen from '../../component/loading';
import { useTranslation } from 'react-i18next';
import LanguageModule from '../../native-module/language';

const widthSidebar = WidthDevice - 20;

const Home = () => {
  const [progressBar, setProgress] = useState<number>(0.5)
  const [overlay, setOverlay] = useState<boolean>(true);
  const [guide, setGuide] = useState<GuideStep>(GuideStep.GUIDE_MODAL);
  const refScrollHome = React.useRef<ScrollView>(null);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const transformX = useSharedValue(-widthSidebar);
  const [counterStep, setCounterStep] = useState<number>(0);
  const [planCounterStep, setPlanCounterStep] = useState<number>(0)
  // const user = useAppSelector(state => state.user);
  // dispatch(initUser({id: '1', counterStep: []}));
  const { t } = useTranslation()
  const [messageError, setMessageError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [name, setName] = useState<string>("")
  const sidebarAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: transformX.value }],
    };
  }, []);

  const fetchData = async () => {
    try {
      const counterServer = await counterStepService.getCounterStep();
      if (counterServer?.code === 200) {
        const counterClient = CounterStepModule.stepsSinceLastReboot();
        if (counterServer.result.planedValue === 0) {
          setProgress(0);
        } else if (counterServer.result.currentValue + counterClient >= counterServer.result.planedValue) {
          setProgress(1);
        } else {
          setProgress(parseFloat(((counterServer.result.currentValue + counterClient) / counterServer.result.planedValue).toFixed(1)));
        }
        setCounterStep(counterServer.result.currentValue + counterClient);
        setPlanCounterStep(counterServer.result.planedValue);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    switch (guide) {
      case GuideStep.GUIDE_TOP:
        refScrollHome.current?.scrollTo({ y: SCROLL_VALUE.TOP, animated: true });
        break;
      case GuideStep.GUIDE_CATEGORY:
        refScrollHome.current?.scrollTo({
          y: SCROLL_VALUE.CATEGORY,
          animated: true,
        });
        break;
      case GuideStep.GUIDE_SHOES:
        refScrollHome.current?.scrollTo({
          y: SCROLL_VALUE.SHOES,
          animated: true,
        });
        break;
      case GuideStep.GUIDE_CLOCK:
        refScrollHome.current?.scrollTo({
          y: SCROLL_VALUE.CLOCK,
          animated: true,
        });
        break;
      case GuideStep.GUIDE_READY:
        refScrollHome.current?.scrollTo({
          y: SCROLL_VALUE.READY,
          animated: true,
        });
        break;
    }
  }, [guide]);
  useEffect(() => {
    const checkFirstLogin = async () => {
      const isNewUser = await AsyncStorage.getItem('isNewUser');
      if (isNewUser) {
        setGuide(GuideStep.GUIDE_MODAL);
        await AsyncStorage.removeItem('isNewUser');
      } else {
        setOverlay(false);
        setGuide(GuideStep.GUIDE_SKIP);
      }
    };
    checkFirstLogin();
  }, []);

  useEffect(() => {
    const permissionRecognition = async () => {
      try {
        await PermissionRequest();
        CounterStepModule.init();
      } catch (err) {
        console.warn(err);
      }
    };
    permissionRecognition();
  }, []);

  const handleShowSidebar = () => {
    setOverlay(true);
    transformX.value = withTiming(0, { duration: 750 });
  };

  const handleHideSidebar = () => {
    setOverlay(false);
    transformX.value = withTiming(-widthSidebar, { duration: 750 });
  };

  const fetchWeightAndHeight = async () => {
    setIsLoading(true);
    try {
      const langAys = await AsyncStorage.getItem("language")
      const lang = langAys === 'en' ? LANG.EN : LANG.KR
      const res = await authService.getHeightWeight(lang);
      console.log("171")
      // test
      // LanguageModule.getLanguage((language: string) => {
      //   console.log("Current language:", language);
      // });
      // LanguageModule.setLanguage(langAys, (response: string) => {
      //   console.log(response);
      // });
      if (res.code === 200) {
        console.log("re", res.result)
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
  useEffect(() => {
    fetchWeightAndHeight()
  }, [])
  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={refScrollHome}
        style={{ position: 'relative' }}>
        {GuideStep.GUIDE_TOP === guide && <GuideTop />}
        <HomeHeader
          guide={guide === GuideStep.GUIDE_TOP}
          visible={overlay}
          handleShowSidebar={handleShowSidebar}
          name={name}
        />
        <View style={[{ height: 65 }]}>
          <Overlay visible={overlay} />
        </View>
        <View style={[paddingScreen]}>
          <Overlay visible={overlay} />
          <CategoryComponent guide={guide === GuideStep.GUIDE_CATEGORY} />
          <View style={{ marginTop: 40 }} />
          <ShoesComponent
            progressBar={progressBar}
            guide={guide === GuideStep.GUIDE_SHOES}
            counterStep={counterStep}
            planCounterStep={planCounterStep}
          />
          <View style={{ marginTop: 40 }} />
          {/* <ClockComponent guide={guide === GuideStep.GUIDE_CLOCK} /> */}
          <View style={{ paddingBottom: 70 }} />
        </View>
      </ScrollView>
      {guide > 0 && guide !== GuideStep.GUIDE_READY && (
        <GuideBottomStep guide={guide} setGuide={setGuide} />
      )}
      {guide == 0 && <GuideModal setGuide={setGuide} setOverlay={setOverlay} />}
      {guide === GuideStep.GUIDE_READY && (
        <GuideModalReady setGuide={setGuide} setOverlay={setOverlay} />
      )}
      <Animated.View style={[sidebarStyles.container, sidebarAnimatedStyles]}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={[sidebarStyles.sidebarTop, flexRow]}>
            <Image source={IMAGE.HOME.SIDEBAR.프로필이미지} />
            <View>
              <Text style={sidebarStyles.sidebarTopTextFirst}>{name}</Text>
              <Pressable
                style={flexRow}
                onPress={() => navigation.navigate(SCREENS_NAME.PROFILE.MAIN)}>
                <Text style={sidebarStyles.sidebarTopTextSecond}>
                  {t("home.moveInfor")}
                </Text>
                <Image source={IMAGE.ICON_ARROW_RIGHT} tintColor={colors.gray_G07} />
              </Pressable>
            </View>
            <TouchableOpacity
              style={sidebarStyles.button}
              onPress={handleHideSidebar}>
              <Image source={IMAGE.ICON_X} />
            </TouchableOpacity>
          </View>
          <View style={sidebarStyles.bodyContainer}>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.MAIN)}
              style={flexRow}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_PLAN} />
              <Text style={sidebarStyles.textIcon}>{t("home.practiceManagement")}</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.MAIN)}
            >
              <Text style={sidebarStyles.textContent}>{t("home.actionPlanManagement")}</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_RECORD} />
              <Text style={sidebarStyles.textIcon}>{t("home.record")}</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD)}
            >
              <Text style={sidebarStyles.textContent}>
                {t("recordHealthData.glycatedHemoglobin")}/{t("recordHealthData.cholesterol")}/{t("recordHealthData.bloodSugar")}
              </Text>
            </Pressable>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_BLOOD_PRESSURE)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  {t("recordHealthData.bloodPressure")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WEIGHT)}
              >
                <Text style={sidebarStyles.textContent}>{t("recordHealthData.weight")}</Text>
              </Pressable>
            </View>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_POSITIVE_MIND)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  {t("planManagement.text.positiveMind")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WORK_OUT)}
              >
                <Text style={sidebarStyles.textContent}>{t("planManagement.text.workout")}</Text>
              </Pressable>
            </View>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_FOOD_INTAKE)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  {t("recordHealthData.diet")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_MEDICATION)}
              >
                <Text style={sidebarStyles.textContent}>{t("planManagement.text.takingMedication")}</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMBER_STEPS_CHART)}>
              <Text style={sidebarStyles.textContent}>{t("planManagement.text.numberSteps")}</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.WEEKLY)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_REPORT} />
              <Text style={sidebarStyles.textIcon}>{t("evaluate.view")}</Text>
            </Pressable>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.WEEKLY)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  {t("evaluate.week")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.MONTHLY)}
              >
                <Text style={sidebarStyles.textContent}>{t("evaluate.month")}</Text>
              </Pressable>
            </View>
            <Pressable
              style={[flexRow, { marginTop: 22 }]}
              onPress={() => navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.MAIN)}
            >
              <Image source={IMAGE.HOME.SIDEBAR.ICON_STUDY} />
              <Text style={sidebarStyles.textIcon}>{t("lesson.healthInfor")}</Text>
            </Pressable>
            <View >
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.MAIN)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  {t("lesson.learn")}
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.QUESTION.MAIN)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_MESSAGE} />
              <Text style={sidebarStyles.textIcon}>{t("lesson.contactUs")}</Text>
            </Pressable>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.QUESTION.ADD)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  {t("lesson.learn")}
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.QUESTION.MAIN)}
              >
                <Text style={sidebarStyles.textContent}>{t("lesson.contactUs")}</Text>
              </Pressable>

            </View>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.SETTING.MAIN)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_SETTING} />
              <Text style={sidebarStyles.textIcon}>{t("lesson.setting")}</Text>
            </Pressable>
            <View style={{ paddingBottom: 20 }} />
          </View>
        </ScrollView>
      </Animated.View>
      {isLoading && <LoadingScreen />}
    </SafeAreaView>
  );
};

const sidebarStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: colors.white,
    width: widthSidebar,
    height: '100%',
    left: 0,
  },
  button: {
    position: 'absolute',
    right: 25,
  },
  sidebarTop: {
    backgroundColor: colors.primary,
    height: 150,
    paddingHorizontal: paddingHorizontalScreen,
    paddingTop: 30,
  },
  sidebarTopTextFirst: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginLeft: 12,
  },
  sidebarTopTextSecond: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 12,
  },
  bodyContainer: {
    paddingHorizontal: paddingHorizontalScreen,
    paddingTop: 30,
  },
  textIcon: {
    marginLeft: 10,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G07
  },
  textContent: {
    marginTop: 14,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray_G06
  },
});

export default Home;
