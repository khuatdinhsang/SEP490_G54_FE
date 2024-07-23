import {StyleSheet, Text, TextInput, View} from 'react-native';
import {flexRow} from '../../../../../../styles/flex';
import colors from '../../../../../../constant/color';
import {useState} from 'react';

interface InputChartProps {
  data: Array<{x: string; y: number; label?: string}>;
  setData: (data: Array<{x: string; y: number; label?: string}>) => void;
}
const InputChart = (props: InputChartProps) => {
  const {data, setData} = props;
  const [isForced, setIsForced] = useState(false);
  const borderWidth = isForced ? 1 : 0;

  const onChangeText = (index: number, value: string) => {
    const newData = [...data];
    newData[index].y = Number(value);
    setData(newData);
  };

  return (
    <View style={[styles.container, {borderWidth}]}>
      <View style={flexRow}>
        <Text style={styles.text}>10대 점수</Text>
        <TextInput
          placeholder="0"
          style={[styles.input, styles.text]}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={value => onChangeText(0, value)}
        />
        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>20대 점수</Text>
        <TextInput
          placeholder="0"
          style={[styles.input, styles.text]}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={value => onChangeText(1, value)}
        />
        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>30대 점수</Text>
        <TextInput
          placeholder="0"
          style={[styles.input, styles.text]}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={value => onChangeText(2, value)}
        />
        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>40대 점수</Text>
        <TextInput
          placeholder="0"
          style={[styles.input, styles.text]}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={value => onChangeText(3, value)}
        />
        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>50대 점수</Text>
        <TextInput
          placeholder="0"
          style={[styles.input, styles.text]}
          onFocus={() => setIsForced(true)}
          onBlur={() => setIsForced(false)}
          onChangeText={value => onChangeText(4, value)}
        />
        <Text style={styles.text}>점</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderColor: colors.primary,
    borderRadius: 12,
  },
  text: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
  },
  input: {
    marginHorizontal: 14,
    borderBottomWidth: 1,
    borderColor: colors.gray_G03,
    width: 120,
    textAlign: 'center',
  },
});
export default InputChart;
