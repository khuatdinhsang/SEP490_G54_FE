import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { IMAGE } from '../../../../../../constant/image';
import colors from '../../../../../../constant/color';
import { flexRow } from '../../../../../../styles/flex';

interface TickComponentProps {
  isTick: boolean;
  setIsTick: React.Dispatch<React.SetStateAction<boolean>>;
  content: string;
}
const TickComponent = (props: TickComponentProps) => {
  const { isTick, setIsTick, content } = props;
  const backgroundColor = isTick ? '#FFF5F0' : 'transparent';
  const borderColor = isTick ? colors.primary : colors.gray_G02;
  const source = isTick
    ? IMAGE.INFORMATION_HEALTH.CHECK_PRIMARY
    : IMAGE.INFORMATION_HEALTH.CHECK;
  const textColor = isTick ? colors.primary : colors.black;

  return (
    <Pressable
      style={[styles.container, flexRow, { borderColor, backgroundColor }]}
      onPress={() => {
        setIsTick(pre => !pre);
      }}>
      <Text style={{ color: textColor }}>{content}</Text>
      <Image source={source} style={styles.image} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  image: {
    position: 'absolute',
    right: 20,
  },
});
export default TickComponent;
