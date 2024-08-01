import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../../../../../../constant/color';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface MultiTextInputProps {
  text1: string;
  text2: string;
  text3: string;
  text4: string;
}
interface MultiTextInputComponentProps {
  multiText: MultiTextInputProps;
  setMultiText: React.Dispatch<React.SetStateAction<MultiTextInputProps>>;
}

const MultiTextInputComponent = (props: MultiTextInputComponentProps) => {
  const [isForced, setIsForced] = useState(false);
  const borderColor = isForced ? colors.primary : colors.gray_G03;
  const { multiText } = props
  const handleChangeText = (text: string, key: string) => {
    props.setMultiText(prev => ({ ...prev, [key]: text }));
  };
  const { t } = useTranslation()
  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={styles.textWrap}>
        <Text style={styles.text}>{t("planManagement.text.workout")}</Text>
        <TextInput
          placeholder={t("lesson.example11")}
          style={styles.textInput}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={text => {
            if (text.length === 0) {
              handleChangeText("", 'text1')
            } else {
              handleChangeText(text, 'text1')
            }
          }}
          value={multiText.text1}
        />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.text}>{t("lesson.dietAndWeight")}</Text>
        <TextInput
          placeholder={t("lesson.example12")}
          style={styles.textInput}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={text => {
            if (text.length === 0) {
              handleChangeText("", 'text2')
            } else {
              handleChangeText(text, 'text2')
            }
          }}
          value={multiText.text2}
        />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.text}>{t("lesson.mindAndStress")}</Text>
        <TextInput
          placeholder={t("lesson.example13")}
          style={styles.textInput}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={text => {
            if (text.length === 0) {
              handleChangeText("", 'text3')
            } else {
              handleChangeText(text, 'text3')
            }
          }}
          value={multiText.text3}
        />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.text}>{t("planManagement.text.takingMedication")}</Text>
        <TextInput
          placeholder={t("lesson.example14")}
          style={styles.textInput}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={text => {
            if (text.length === 0) {
              handleChangeText("", 'text4')
            } else {
              handleChangeText(text, 'text4')
            }
          }}
          value={multiText.text4}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingRight: 16,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 12,
  },
  textInput: {
    paddingLeft: 8,
    borderColor: colors.gray_G03,
    borderBottomWidth: 1,
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G09,
  },
  textWrap: {
    marginVertical: 4,
  },
});
export default MultiTextInputComponent;
