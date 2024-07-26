import { StyleSheet, Text, TextInput, View } from 'react-native';
import colors from '../../../../../../constant/color';
import { useState } from 'react';

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

  return (
    <View style={[styles.container, { borderColor }]}>
      <View style={styles.textWrap}>
        <Text style={styles.text}>운동</Text>
        <TextInput
          placeholder="예) 일주일에 세번 걷기"
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
        <Text style={styles.text}>식이 및 체중</Text>
        <TextInput
          placeholder="예) 균형 잡힌 식사하기"
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
        <Text style={styles.text}>마음, 스트레스 관리</Text>
        <TextInput
          placeholder="예) 하루에 10분씩 명상하기"
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
        <Text style={styles.text}>약물 복용</Text>
        <TextInput
          placeholder="예) 시간에 맞추어 약물 복용하기"
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
