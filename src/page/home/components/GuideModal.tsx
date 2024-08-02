import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexRow, flexRowCenter } from '../../../styles/flex';
import { paddingHorizontalScreen } from '../../../styles/padding';
import { WidthDevice } from '../../../util/Dimenssion';
import { GuideStep } from '../const';
import { useTranslation } from 'react-i18next';

interface GuideModalProps {
  setGuide: (value: number) => void;
  setOverlay: (value: boolean) => void;
}

const GuideModal = (props: GuideModalProps) => {
  const { setGuide, setOverlay } = props;
  const handleClickSkip = () => {
    setOverlay(false);
    setGuide(GuideStep.GUIDE_SKIP);
  };

  const handleClickConfirm = () => {
    setGuide(GuideStep.GUIDE_TOP);
  };
  const { t } = useTranslation()
  return (
    <View style={[styles.container, flexRowCenter]}>
      <View style={styles.body}>
        <View style={flexRowCenter}>
          <Image source={IMAGE.HOME.GUIDE.ICON_DOCTOR} />
        </View>
        <View style={{ marginTop: 10 }} />
        <Text style={styles.text}>
          {t("home.hello")}
        </Text>
        <View style={{ marginBottom: 25 }} />
        <View style={flexRow}>
          <Pressable style={styles.buttonLeft} onPress={handleClickSkip}>
            <Text style={[styles.text, styles.buttonLeftText]}>{t("home.skip")}</Text>
          </Pressable>
          <Pressable style={styles.buttonRight} onPress={handleClickConfirm}>
            <Text style={[styles.text, styles.buttonRightText]}>{t("home.check")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const width = WidthDevice - paddingHorizontalScreen * 2 * 2;
const widthButton = (width - 60) / 2;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    width: WidthDevice,
    height: '100%',
  },
  body: {
    width,
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 24,
    paddingHorizontal: 10,
  },
  text: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
  buttonLeft: {
    backgroundColor: colors.gray_G02,
    paddingVertical: 17,
    paddingHorizontal: 0,
    width: widthButton,
    borderRadius: 8,
    marginRight: 30,
  },
  buttonRight: {
    backgroundColor: colors.primary,
    paddingVertical: 17,
    paddingHorizontal: 0,
    borderRadius: 8,
    width: widthButton,
    position: 'absolute',
    right: 0,
  },
  buttonLeftText: {
    color: colors.black,
    textAlign: 'center',
  },
  buttonRightText: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default GuideModal;
