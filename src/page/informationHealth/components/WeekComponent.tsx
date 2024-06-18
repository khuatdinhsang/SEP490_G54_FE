import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../../../constant/color';
import {flexRowCenter} from '../../../styles/flex';
import {IMAGE} from '../../../constant/image';

const WeekComponent = () => {
  return (
    <View style={[styles.container, flexRowCenter]}>
      <Pressable>
        <Image source={IMAGE.ICON_ARROW_LEFT_BLACK} />
      </Pressable>
      <Text style={styles.text}>1주차</Text>
      <Pressable>
        <Image source={IMAGE.ICON_ARROW_RIGHT_GRAY} />
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_G01,
    paddingVertical: 16,
    borderColor: colors.gray_G02,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: colors.primary,
    marginHorizontal: 40,
  },
});
export default WeekComponent;
