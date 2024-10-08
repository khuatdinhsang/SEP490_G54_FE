import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { paddingHorizontalScreen } from '../../../styles/padding';
import { WidthDevice } from '../../../util/Dimenssion';
import { useTranslation } from 'react-i18next';

interface GuideProps {
  title?: string;
  description?: string;
}

const GuideTop = ({ title, description }: GuideProps) => {
  const { t } = useTranslation()
  return (
    <View style={guideStyles.container}>
      <Image source={IMAGE.HOME.GUIDE.GUIDE1} style={guideStyles.polygon} />
      <View style={[guideStyles.containerContent]}>
        <View>
          <Text style={guideStyles.textFirst}>{t("home.fullMenu")}</Text>
          <Text style={guideStyles.textSecond}>
            {t("home.showAllMenu")}
          </Text>
        </View>
      </View>
    </View>
  );
};

const width = WidthDevice - paddingHorizontalScreen * 6;
const guideStyles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    top: 70,
    left: 20,
    width,
  },
  containerContent: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
    flex: 1,
  },
  textFirst: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
  },
  textSecond: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
  },
  polygon: {},
});

export default GuideTop;
