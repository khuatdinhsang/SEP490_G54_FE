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
import { GuideStep, SCROLL_VALUE } from './const';
import PermissionRequest from '../../util/Permission';
import TimerModule, { TimerItem } from '../../native-module/timer.module';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setScreen } from '../../store/screen.slice';
import { counterStepService } from '../../services/counterstep';
import { SCREENS_NAME } from '../../navigator/const';

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
  const user = useAppSelector(state => state.user);
  // dispatch(initUser({id: '1', counterStep: []}));

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
          <ClockComponent guide={guide === GuideStep.GUIDE_CLOCK} />
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
              <Text style={sidebarStyles.sidebarTopTextFirst}>김세현</Text>
              <Text style={sidebarStyles.sidebarTopTextSecond}>
                김세현님, 안녕하세요
              </Text>
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
              <Text style={sidebarStyles.textIcon}>실천관리 계획</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.MAIN)}
            >
              <Text style={sidebarStyles.textContent}>실천 계획 관리</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_RECORD} />
              <Text style={sidebarStyles.textIcon}>기록하기</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD)}
            >
              <Text style={sidebarStyles.textContent}>
                당화혈색소/콜레스테롤/혈당
              </Text>
            </Pressable>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_BLOOD_PRESSURE)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  혈압
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WEIGHT)}
              >
                <Text style={sidebarStyles.textContent}>체중</Text>
              </Pressable>
            </View>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_POSITIVE_MIND)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  긍정적인 마음
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WORK_OUT)}
              >
                <Text style={sidebarStyles.textContent}>운동</Text>
              </Pressable>
            </View>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_FOOD_INTAKE)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  식이
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_MEDICATION)}
              >
                <Text style={sidebarStyles.textContent}>약물 복용</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMBER_STEPS_CHART)}>
              <Text style={sidebarStyles.textContent}>걸음 수</Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.WEEKLY)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_REPORT} />
              <Text style={sidebarStyles.textIcon}>평가 및 결과보기</Text>
            </Pressable>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.WEEKLY)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  주간 실천 평가
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.MONTHLY)}
              >
                <Text style={sidebarStyles.textContent}>월간 실천 평가</Text>
              </Pressable>
            </View>
            <Pressable
              style={[flexRow, { marginTop: 22 }]}
              onPress={() => navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.MAIN)}
            >
              <Image source={IMAGE.HOME.SIDEBAR.ICON_STUDY} />
              <Text style={sidebarStyles.textIcon}>건강 정보 학습</Text>
            </Pressable>
            <View >
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.MAIN)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  학습하기
                </Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.QUESTION.MAIN)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_MESSAGE} />
              <Text style={sidebarStyles.textIcon}>문의하기</Text>
            </Pressable>
            <View style={flexRow}>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.QUESTION.ADD)}
              >
                <Text style={[sidebarStyles.textContent, { width: 170 }]}>
                  학습하기
                </Text>
              </Pressable>
              <Pressable
                onPress={() => navigation.navigate(SCREENS_NAME.QUESTION.MAIN)}
              >
                <Text style={sidebarStyles.textContent}>문의하기</Text>
              </Pressable>

            </View>
            <Pressable
              onPress={() => navigation.navigate(SCREENS_NAME.SETTING.MAIN)}
              style={[flexRow, { marginTop: 22 }]}>
              <Image source={IMAGE.HOME.SIDEBAR.ICON_SETTING} />
              <Text style={sidebarStyles.textIcon}>설정하기</Text>
            </Pressable>
            <View style={{ paddingBottom: 20 }} />
          </View>
        </ScrollView>
      </Animated.View>
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
