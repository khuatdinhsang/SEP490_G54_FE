import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import colors from '../../constant/color';

interface ButtonComponentProps {
  text?: string;
  handleClick: () => void;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  isDisable?: boolean;
}

const ButtonComponent = (props: ButtonComponentProps) => {
  const { text, handleClick, backgroundColor, textColor, style, isDisable } =
    props;
  const handleClickInternal = () => {
    if (isDisable) return;
    handleClick();
  };

  let backgroundColorInternal = backgroundColor
    ? backgroundColor
    : colors.primary;
  let textColorInternal = textColor ? textColor : colors.white;

  if (isDisable) {
    backgroundColorInternal = colors.gray_G02;
    textColorInternal = colors.gray_G04;
  }

  return (
    <View style={style}>
      <Pressable
        onPress={handleClickInternal}
        style={[styles.button, { backgroundColor: backgroundColorInternal }]}>
        <Text style={[styles.text, { color: textColorInternal }]}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 17,
    borderRadius: 12,
  },
});
export default ButtonComponent;
