import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexRow } from '../../../styles/flex';
import Guide from './GuideDown';
import { useTranslation } from 'react-i18next';

interface ClockProps {
  guide: boolean;
}

const ClockComponent = ({ guide }: ClockProps) => {
  const { t } = useTranslation("")
  return (
    <View style={[guide ? styles.guideSpecial : {}, styles.container]}>
      {guide && (
        <Guide
          title={'오늘의 해야 할 일'}
          // description={
          //   '스마트 헬싱으로 해야하는 것들을 보여줍니다.바로가기를 누르면 메뉴로 바로 이동합니다.만일 할일을 하나 달성할 경우 할일 완료로 변경되게 됩니다.'
          description={'오늘의 해야 할 일'}
        />
      )}
      <View style={[flexRow, styles.clockUnit]}>
        <Image source={IMAGE.HOME.CLOCK} style={styles.unitIcon} />
        <Text style={styles.unitTitle}>{t("home.thingsTodo")}</Text>
      </View>
      <View style={[flexRow, styles.clockItemRow]}>
        <Image source={IMAGE.ICON_CHECK} style={styles.iconCheck} />
        <Text style={styles.clockItemText}>학습하기 1주차 7일</Text>
        <Text style={styles.clockItemTextRight}>바로가기</Text>
      </View>
      <View style={[flexRow, styles.clockItemRow]}>
        <Image source={IMAGE.ICON_CHECK} style={styles.iconCheck} />
        <Text style={styles.clockItemText}>학습 동영상 시청</Text>
        <Text style={styles.clockItemTextRight}>바로가기</Text>
      </View>
      <View style={[flexRow, styles.clockItemRow]}>
        <Image source={IMAGE.ICON_CHECK} style={styles.iconCheck} />
        <Text style={styles.clockItemText}>일기 작성</Text>
        <Text style={styles.clockItemTextRight}>바로가기</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
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
  clockUnit: {
    marginBottom: 15,
  },
  clockItemRow: {
    backgroundColor: colors.gray_G01,
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
  },
  iconCheck: {
    width: 14,
    height: 10,
  },
  clockItemText: {
    color: colors.black,
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    marginLeft: 10,
  },
  clockItemTextRight: {
    color: colors.primary,
    position: 'absolute',
    right: 15,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  guideSpecial: {
    backgroundColor: colors.white,
    opacity: 1,
    borderRadius: 20,
    zIndex: 10,
  },
});

export default ClockComponent;
