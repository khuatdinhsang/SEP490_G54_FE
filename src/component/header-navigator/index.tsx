import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { IMAGE } from '../../constant/image';
import { flexRowCenter } from '../../styles/flex';
import colors from '../../constant/color';

interface HeaderNavigatorComponentProps {
  isIconXRight?: boolean;
  isIconLeft?: boolean;
  isTextRight?: boolean;
  textRight?: string;
  textRightStyle?: StyleProp<TextStyle>;
  text: string;
  handleClickArrowLeft?: () => void;
  handleClickIconRight?: () => void;
  disabledRight?: boolean,
  disabledLeft?: boolean;
}

const HeaderNavigatorComponent = ({
  isIconXRight,
  isTextRight,
  textRight,
  textRightStyle,
  text,
  isIconLeft,
  disabledRight,
  disabledLeft,
  handleClickArrowLeft,
  handleClickIconRight,
}: HeaderNavigatorComponentProps) => {
  const handleClickArrowLeftInternal = () => {
    if (handleClickArrowLeft) {
      handleClickArrowLeft();
    }
  };

  const handleClickIconRightInternal = () => {
    if (handleClickIconRight) {
      handleClickIconRight();
    }
  };

  return (
    <View style={[flexRowCenter, styles.container]}>
      {isIconLeft && <Pressable
        disabled={disabledLeft ?? false}
        onPress={handleClickArrowLeftInternal} style={styles.left}>
        <Image source={IMAGE.ICON_ARROW_LEFT_BLACK} style={styles.iconLeft} />
      </Pressable>}
      <Text style={styles.text}>{text}</Text>
      {isIconXRight && (
        <Pressable
          disabled={disabledRight ?? false}
          onPress={handleClickIconRightInternal} style={styles.right}>
          <Image source={IMAGE.ICON_X} style={styles.iconRight} />
        </Pressable>
      )}
      {isTextRight && (
        <Pressable
          disabled={disabledRight ?? false}
          onPress={handleClickIconRightInternal} style={styles.right}>
          <Text style={textRightStyle}>{textRight}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    marginTop: 16,
    marginBottom: 22,
  },
  left: {
    position: 'absolute',
    left: 0,
  },
  iconLeft: {
    width: 24,
    height: 24,
  },
  text: {
    fontWeight: '700',
    fontSize: 20,
    color: colors.black,
    lineHeight: 28,
  },
  right: {
    position: 'absolute',
    right: 0,
  },
  iconRight: {
    width: 24,
    height: 24,
  },
});
export default HeaderNavigatorComponent;
