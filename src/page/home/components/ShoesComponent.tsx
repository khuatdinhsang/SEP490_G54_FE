import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from 'react-native-progress';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexRow, flexRowSpaceBetween } from '../../../styles/flex';
import { paddingHorizontalScreen } from '../../../styles/padding';
import { WidthDevice } from '../../../util/Dimenssion';
import Guide from './GuideDown';
import CounterStepModule from '../../../native-module/counter-step.module';
import { counterStepService } from '../../../services/counterstep';
import { dateNow } from '../../../util';

interface ShoesProps {
  progressBar: number;
  guide: boolean;
  counterStep: number,
  planCounterStep: number
}
const widthProgressBar = WidthDevice - 2 * paddingHorizontalScreen - 50;

const ShoesComponent = ({ progressBar, guide, counterStep, planCounterStep }: ShoesProps) => {

  const [dateTime, setDateTime] = useState<string>(dateNow(new Date()))
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(dateNow(new Date()))
    }, 60 * 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <View style={[guide ? styles.guideSpecial : {}, styles.container]}>
      {guide && (
        <Guide
          title={'오늘의 기록'}
          description={'오늘의 걸음수와 칼로리 소모 내역을 보여줍니다.'}
        />
      )}
      <View style={flexRow}>
        <Image source={IMAGE.HOME.SHOE} style={styles.unitIcon} />
        <Text style={styles.unitTitle}>오늘의 기록</Text>
      </View>
      <View style={[styles.shoeUnit]}>
        <View style={flexRowSpaceBetween}>
          <Text style={styles.shoeTextLeft}>
            <Text style={{ color: colors.black, fontWeight: '700', fontSize: 18 }}>
              {counterStep}
            </Text>
            <Text style={{ fontSize: 18 }}>/{planCounterStep} 걸음</Text>
          </Text>
          <Text style={styles.shoeTextRight}>{dateTime} 기준</Text>
        </View>
        {/* <View style={[flexRow, styles.shoeContainerKcal]}>
          <Text style={styles.shoeTextKcal}>
            <Text style={{ fontWeight: '700' }}>123</Text>kcal 소모
          </Text>
          <Image source={IMAGE.HOME.SHOE} />
        </View> */}
        <View style={{ marginTop: 20 }}>
          <Progress.Bar
            progress={progressBar}
            width={widthProgressBar}
            color={colors.primary}
            unfilledColor={colors.gray}
            borderWidth={0}
            borderRadius={8}
            height={8}
          />
          <Text style={[styles.progressBarTextLeft]}> 0 </Text>
          <Text style={[styles.progressBarTextRight]}>{planCounterStep} </Text>
          <Text
            style={[
              styles.progressBarTextCenter,
              {
                left: progressBar > 0.8 ? widthProgressBar * progressBar - 40 : widthProgressBar * progressBar,
              },
            ]}>
            {counterStep}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 10, paddingVertical: 10 },
  unitTitle: {
    marginLeft: 2,
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  unitIcon: {
    width: 20,
    height: 20,
  },
  progressBarTextLeft: {
    position: 'absolute',
    top: 10,
  },
  progressBarTextRight: {
    position: 'absolute',
    top: 10,
    right: 0,
  },
  progressBarTextCenter: {
    position: 'absolute',
    top: -20,
    color: colors.primary,
  },
  shoeUnit: {
    marginTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 35,
    paddingTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray_G02,
    zIndex: 0,
  },
  shoeContainerKcal: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.orange_01,
    borderRadius: 100,
    marginTop: 25,
    marginBottom: 15,
    alignSelf: 'flex-start',
    marginLeft: 25,
  },
  shoeTextLeft: {
    fontSize: 20,
    lineHeight: 28,
  },
  shoeTextRight: {
    fontSize: 14,
    lineHeight: 20,
    right: 0,
  },
  shoeTextKcal: {
    color: colors.primary,
  },
  guideSpecial: {
    backgroundColor: colors.white,
    opacity: 1,
    borderRadius: 20,
    zIndex: 10,
  },
});

export default ShoesComponent;
