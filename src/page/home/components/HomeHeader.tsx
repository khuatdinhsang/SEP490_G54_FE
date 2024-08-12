import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import Overlay from '../../../component/overlay';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexCenter, flexRow, flexRowCenter } from '../../../styles/flex';
import { paddingHorizontalScreen } from '../../../styles/padding';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SCREENS_NAME } from '../../../navigator/const';
import { useTranslation } from 'react-i18next';

interface HomeHeaderProps {
  guide: boolean;
  visible: boolean;
  handleShowSidebar: () => void;
  name: string
}

const HomeHeader = ({ guide, visible, handleShowSidebar, name }: HomeHeaderProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handlePressSetting = () => {
    navigation.navigate(SCREENS_NAME.SETTING.MAIN);
  };

  const handlePressProfile = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.MAIN);
  };
  const { t } = useTranslation()
  return (
    <View>
      <View style={[styles.header]}>
        <View style={{ paddingTop: 30 }} />
        <Overlay visible={visible} />
        <View style={flexRowCenter}>
          <Pressable
            style={[styles.buttonIconSidebar, { zIndex: guide ? 10 : 1 }]}
            onPress={handleShowSidebar}>
            <Image source={IMAGE.ICON_SIDEBAR} style={styles.iconSidebar} />
          </Pressable>
          <Text style={styles.headerText}>Smart Healthing</Text>
          <View style={[styles.iconsRight]}>
            <Pressable style={flexCenter} onPress={handlePressProfile}>
              <Image source={IMAGE.ICON_INFOR} style={styles.iconInfor} />
              <Text style={styles.headerTextIcon}>{t("home.myInfo")}</Text>
            </Pressable>
            <View style={{ marginHorizontal: 5 }} />
            <Pressable style={flexCenter} onPress={handlePressSetting}>
              <Image source={IMAGE.ICON_SETTING} style={styles.iconSetting} />
              <Text style={styles.headerTextIcon}>{t("home.setting")}</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTextTop}>{t("home.wordsEncouragement")}</Text>
          <Text style={styles.sectionTextBottom}>
            {name},{'\n'}{t("home.today")}{' '}
            <Text style={{ color: colors.primary }}>{t("home.forHealthCare")}</Text>
            {t("home.tryYourBest")} 💪
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  header: {
    backgroundColor: colors.primary,
    height: 175,
    paddingHorizontal: paddingHorizontalScreen * 2,
  },
  headerText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
  },
  headerTextIcon: {
    color: colors.black,
    fontWeight: '400',
    lineHeight: 20,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: colors.white,
    borderRadius: 16,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    transform: [{ translateY: 40 }],
    shadowColor: '#16182B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 5,
    marginLeft: 20,
  },
  sectionTextTop: {
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  sectionTextBottom: {
    color: colors.black,
    fontWeight: '500',
    lineHeight: 28,
    fontSize: 20,
  },
  buttonIconSidebar: {
    position: 'absolute',
    left: -15,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 100,
  },
  iconSidebar: {
    width: 24,
    height: 24,
  },
  iconsRight: {
    paddingTop: 20,
    position: 'absolute',
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconInfor: {
    width: 24,
    height: 24,
  },
  iconSetting: {
    width: 24,
    height: 24,
  },
});

export default HomeHeader;
