import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {flexRowCenter} from '../../../styles/flex';
import colors from '../../../constant/color';
import {useState} from 'react';

interface InputShareComponentProps {
  text: string;
  placeholder: string;
  textButton: string;
}
const InputShareComponent = (props: InputShareComponentProps) => {
  const {text, placeholder, textButton} = props;
  const [isFocused, setIsFocused] = useState(false);
  const borderWidth = isFocused ? 1 : 0;
  console.log(borderWidth);

  return (
    <View style={[flexRowCenter, styles.container, {borderWidth}]}>
      <Text style={styles.text}>{text}</Text>
      <View style={{marginLeft: 10}} />
      <TextInput
        placeholder={placeholder}
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <View style={{marginLeft: 15}} />
      <Pressable style={styles.button}>
        <Text>{textButton}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 12,
    borderColor: colors.primary,
  },
  input: {
    paddingLeft: 12,
    borderColor: colors.gray_G03,
    borderBottomWidth: 1,
    flex: 1,
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G07,
  },
  button: {
    paddingVertical: 17,
    paddingHorizontal: 25,
    backgroundColor: colors.gray_G02,
    borderRadius: 8,
  },
});
export default InputShareComponent;
