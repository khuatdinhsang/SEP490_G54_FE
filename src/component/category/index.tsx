import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import { flexRow } from '../../styles/flex';

interface CategoryComponentProps {
  text: string;
  handleOnPress: () => void;
}

const CategoryComponent = (props: CategoryComponentProps) => {
  const { text, handleOnPress } = props;
  const handleOnPressInner = () => {
    handleOnPress();
  };

  return (
    <Pressable onPress={handleOnPressInner} style={[styles.container, flexRow]}>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.iconRight} >
        <Image source={IMAGE.ICON_ARROW_RIGHT_GRAY} style={styles.icon} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 18,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CategoryComponent;
