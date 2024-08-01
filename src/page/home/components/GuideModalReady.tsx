import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexRowCenter } from '../../../styles/flex';
import { paddingHorizontalScreen } from '../../../styles/padding';
import { WidthDevice } from '../../../util/Dimenssion';
import { GuideStep } from '../const';
import { useTranslation } from 'react-i18next';

interface GuideModalProps {
  setGuide: (value: number) => void;
  setOverlay: (value: boolean) => void;
}

const GuideModalReady = (props: GuideModalProps) => {
  const { setGuide, setOverlay } = props;

  const handleClickConfirm = () => {
    setOverlay(false);
    setGuide(GuideStep.GUIDE_SKIP);
  };
  const { t } = useTranslation()
  return (
    <View style={[styles.container, flexRowCenter]}>
      <View style={styles.body}>
        <View style={flexRowCenter}>
          <Image source={IMAGE.HOME.GUIDE.ICON_DOCTOR} />
        </View>
        <View style={{ marginTop: 10 }} />
        <Text style={styles.text}>{t("home.start")}</Text>
        <View style={{ marginBottom: 25 }} />
        <View style={flexRowCenter}>
          <Pressable style={styles.button} onPress={handleClickConfirm}>
            <Text style={[styles.text, styles.buttonText]}>{t("home.check")}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const width = WidthDevice - paddingHorizontalScreen * 2 * 2;

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
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 17,
    width: width - 40,
    borderRadius: 8,
  },
  buttonText: {
    color: colors.white,
  },
});

export default GuideModalReady;
