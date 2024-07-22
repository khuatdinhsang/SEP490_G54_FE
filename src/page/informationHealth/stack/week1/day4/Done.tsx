import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../../../../../constant/color';
import {IMAGE} from '../../../../../constant/image';
import {flexCenter, flexRowCenter} from '../../../../../styles/flex';
import {paddingHorizontalScreen} from '../../../../../styles/padding';

const Done = () => {
  return (
    <View style={[flexRowCenter, styles.container]}>
      <View style={flexCenter}>
        <Image source={IMAGE.INFORMATION_HEALTH.CATEGORY} />
        <Text style={styles.textFirst}>
          <Text style={{color: colors.primary}}>1주차 4일차</Text>를
          학습했습니다!
        </Text>
        <Text style={styles.text}>
          {'건강정보를 학습하시느라 수고하셨어요:)'}
        </Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
    flex: 1,
  },
  textFirst: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.gray_G07,
    lineHeight: 28,
    paddingHorizontal: 25,
  },
  text: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.gray_G06,
    marginTop: 8,
  },
});
export default Done;
