import React, { useEffect } from 'react';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { paddingHorizontalScreen } from '../../styles/padding';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import { IMAGE } from '../../constant/image';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const PlanManagement = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { t, i18n } = useTranslation();
  const currentScreen = useSelector((state: RootState) => state.screen.currentScreen);
  console.log("21", currentScreen)
  const goBackPreviousPage = () => {
    navigation.goBack();
  }
  const navigateScreen = (screen: number): void => {
    switch (screen) {
      case 2:
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.WORK_OUT);
        break;
      case 3:
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.FOOD_INTAKE);
        break;
      case 4:
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.REGISTER_MEDICATION);
        break;
      case 5:
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.NUMBER_STEPS);
        break;
      case 6:
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.SUCCESS);
        break;
      default:
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.MAIN);
        break;
    }
  }
  useEffect(() => {
    navigateScreen(currentScreen);
  }, [])
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <HeaderNavigatorComponent
          isIconLeft={true}
          text={t("planManagement.text.positiveMind")}
          handleClickArrowLeft={goBackPreviousPage}
        />
        <View style={styles.content}>
          <View style={[flexRowCenter]}>
            <Text style={styles.textPlan}>
              {t('planManagement.text.under')}
              <Text style={styles.highlight}>
                {t('planManagement.text.5Items')}{' '}
              </Text>
              {t('planManagement.text.descPlan')}
            </Text>
          </View>
          <View style={[styles.board]}>
            <View style={[flexRow, { marginBottom: 10 }]}>
              <Text style={styles.textBoard}>
                {t('planManagement.text.positiveMind')}
              </Text>
              <Image source={IMAGE.PLAN_MANAGEMENT.HEART} />
            </View>
            <View style={[flexRow, { marginBottom: 10 }]}>
              <Text style={styles.textBoard}>
                {t('planManagement.text.workout')}
              </Text>
              <Image source={IMAGE.PLAN_MANAGEMENT.HUMAN} />
            </View>
            <View style={[flexRow, { marginBottom: 10 }]}>
              <Text style={styles.textBoard}>
                {t('planManagement.text.foodIntake')}
              </Text>
              <Image source={IMAGE.PLAN_MANAGEMENT.VEGETABLE} />
            </View>
            <View style={[flexRow, { marginBottom: 10 }]}>
              <Text style={styles.textBoard}>
                {t('planManagement.text.takingMedication')}
              </Text>
              <Image source={IMAGE.PLAN_MANAGEMENT.MEDICATION} />
            </View>
            <View style={flexRow}>
              <Text style={styles.textBoard}>
                {t('planManagement.text.numberSteps')}
              </Text>
              <Image source={IMAGE.PLAN_MANAGEMENT.SHOES} />
            </View>
          </View>
        </View>
        <View style={styles.buttonAbsolute}>
          <View style={styles.guide}>
            <Text style={styles.textGuide}>
              {t('planManagement.text.clickToStart')}
            </Text>
          </View>
          <View style={styles.bridge}>
            <View style={styles.diamond} />
          </View>
          <View style={{ paddingHorizontal: 20, width: WidthDevice }}>
            <Pressable onPress={() => navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.POSITIVE_MIND)} style={styles.button}>
              <Text style={styles.buttonText}>{t('common.text.start')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen,
    height: HeightDevice,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.gray_G10,
  },
  arrow: {
    position: 'absolute',
    left: 0,
    zIndex: 100,
  },
  content: {
    marginTop: 100,
    paddingHorizontal: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textPlan: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.gray_G07,
    textAlign: 'center',
  },
  highlight: {
    color: colors.primary,
  },
  board: {
    backgroundColor: colors.gray_G01,
    borderRadius: 12,
    paddingTop: 20,
    paddingRight: 60,
    paddingBottom: 20,
    paddingLeft: 20,
    marginTop: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '70%',
  },
  buttonAbsolute: {
    position: 'absolute',
    bottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
  textBoard: {
    fontWeight: '500',
    fontSize: 18,
    color: colors.gray_G06,
    marginRight: 10,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 17,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 18,
    color: colors.white,
    textAlign: 'center',
  },
  guide: {
    backgroundColor: colors.green,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    flexShrink: 1,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    top: '-110%',
  },
  textGuide: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.white,
  },
  bridge: {
    position: 'absolute',
    top: '-50%',
    transform: [{ translateX: 7.5 }]
  },
  diamond: {
    width: 15,
    height: 15,
    backgroundColor: colors.green,
    transform: [{ rotate: '45deg' }],
  },
});

export default PlanManagement;
