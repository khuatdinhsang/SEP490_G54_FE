import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexRow } from '../../../styles/flex';
import { paddingHorizontalScreen } from '../../../styles/padding';
import { WidthDevice } from '../../../util/Dimenssion';
import { useTranslation } from 'react-i18next';

interface GuideBottomStepProps {
  guide: number;
  setGuide: (guide: number) => void;
}

const GuideBottomStep = ({ guide, setGuide }: GuideBottomStepProps) => {
  const { t } = useTranslation()
  const handleClickLeft = () => {
    if (guide === 1) return;
    setGuide(guide - 1);
  };

  const handleClickRight = () => {
    setGuide(guide + 1);
  };

  return (
    <View style={[styles.container, flexRow]}>
      <Pressable
        style={[flexRow, { position: 'absolute', left: 20 }]}
        onPress={handleClickLeft}>
        <Image source={IMAGE.ICON_ARROW_LEFT} />
        <Text style={styles.text}>{t("home.before")}</Text>
      </Pressable>
      <Pressable
        style={[flexRow, { position: 'absolute', right: 20 }]}
        onPress={handleClickRight}>
        <Text style={styles.text}>{t("home.next")}</Text>
        <Image source={IMAGE.ICON_ARROW_RIGHT} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WidthDevice,
    position: 'absolute',
    height: 50,
    bottom: 10,
    paddingHorizontal: paddingHorizontalScreen * 2,
  },
  text: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
  },
});

export default GuideBottomStep;
