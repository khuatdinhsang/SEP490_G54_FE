import React, { useState } from 'react';
import { Image, KeyboardTypeOptions, Pressable, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import { flexRow } from '../../styles/flex';

interface InputComponentProps {
  placeholder?: string;
  secureTextEntry?: boolean;
  onPressIconRight?: () => void;
  isIconRight?: boolean;
  value: string | undefined;
  onChangeText?: (text: string) => void;
  label?: string;
  textError?: string;
  keyboardType?: KeyboardTypeOptions;
  styleInput?: StyleProp<TextStyle>;
  multiline?: boolean
  textAlignVertical?: 'auto' | 'top' | 'bottom' | 'center',
  heightLine?: number
}

const InputComponent = (props: InputComponentProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const {
    placeholder,
    secureTextEntry,
    onPressIconRight,
    isIconRight,
    value,
    onChangeText,
    label,
    textError,
    keyboardType,
    styleInput,
    multiline,
    textAlignVertical,
    heightLine
  } = props;

  return (
    <View>
      {label && (
        <View>
          <Text style={styles.labelText}>{label}</Text>
          <View style={{ marginVertical: 2 }} />
        </View>
      )}
      <View style={flexRow}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.gray_G04}
          style={[styleInput, styles.text, isFocused && styles.textFocused, multiline && { paddingVertical: 10, height: heightLine, textAlignVertical: textAlignVertical || 'top' }]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          multiline={multiline}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
        />
        {isIconRight && value && (
          <Pressable style={styles.iconRight} onPress={onPressIconRight}>
            <Image source={IMAGE.ICON_X_BG_GRAY} />
          </Pressable>
        )}
      </View>
      {textError && isFocused && (
        <Text style={styles.textError}>{textError}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  labelText: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
  },
  text: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.gray_G03,
    width: '100%',
  },
  textFocused: {
    borderColor: colors.primary,
  },
  iconRight: {
    position: 'absolute',
    right: 12,
  },
  textError: {
    color: colors.red,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
  },
});

export default InputComponent;
