import { StyleSheet, Text, TextInput, View } from 'react-native';
import { flexRow } from '../../../../../../styles/flex';
import colors from '../../../../../../constant/color';
import { useState, useTransition } from 'react';
import { useTranslation } from 'react-i18next';
import { TypeErrorDay4 } from '../Step2';

interface InputChartProps {
  data: Array<{ x: string; y: number; label?: string }>;
  setData: (data: Array<{ x: string; y: number; label?: string }>) => void;
  error: TypeErrorDay4,
  setError: (error: TypeErrorDay4) => void;
}
const InputChart = (props: InputChartProps) => {
  const { data, setData, error, setError } = props;
  const [isForced, setIsForced] = useState(false);
  const borderWidth = isForced ? 1 : 0;
  const { t } = useTranslation();
  const onChangeText = (index: number, value: string) => {
    const newData = [...data];
    const numericRegex = /^[0-9]*$/;
    setError({ ...error, [`err${index + 1}`]: '' });
    if (numericRegex.test(value) && Number(value) <= 100) {
      newData[index].y = Number(value);
    } else {
      newData[index].y = 0;
      setError({ ...error, [`err${index + 1}`]: t("placeholder.err.invalidInput") });
    }
    setData(newData);
  };
  console.log("31", data)

  return (
    <View style={[styles.container, { borderWidth }]}>
      <View style={flexRow}>
        <Text style={styles.text}>10대 점수</Text>
        <View>
          <TextInput
            value={data[0].y.toString()}
            keyboardType='numeric'
            placeholder="0"
            style={[styles.input, styles.text]}
            onFocus={() => setIsForced(true)}
            onBlur={() => setIsForced(false)}
            onChangeText={value => onChangeText(0, value)}
          />
          <Text style={styles.textError}>{error?.err1}</Text>
        </View>
        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>20대 점수</Text>
        <View>
          <TextInput
            value={data[1].y.toString()}
            keyboardType='numeric'
            placeholder="0"
            style={[styles.input, styles.text]}
            onFocus={() => setIsForced(true)}
            onBlur={() => setIsForced(false)}
            onChangeText={value => onChangeText(1, value)}
          />
          <Text style={styles.textError}>{error?.err2}</Text>
        </View>

        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>30대 점수</Text>
        <View>
          <TextInput
            value={data[2].y.toString()}
            placeholder="0"
            keyboardType='numeric'
            style={[styles.input, styles.text]}
            onFocus={() => setIsForced(true)}
            onBlur={() => setIsForced(false)}
            onChangeText={value => onChangeText(2, value)}
          />
          <Text style={styles.textError}>{error?.err3}</Text>
        </View>
        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>40대 점수</Text>
        <View>
          <TextInput
            value={data[3].y.toString()}
            placeholder="0"
            style={[styles.input, styles.text]}
            onFocus={() => setIsForced(true)}
            onBlur={() => setIsForced(false)}
            onChangeText={value => onChangeText(3, value)}
          />
          <Text style={styles.textError}>{error?.err4}</Text>
        </View>
        <Text style={styles.text}>점</Text>
      </View>
      <View style={flexRow}>
        <Text style={styles.text}>50대 점수</Text>
        <View>
          <TextInput
            value={data[4].y.toString()}
            placeholder="0"
            style={[styles.input, styles.text]}
            onFocus={() => setIsForced(true)}
            onBlur={() => setIsForced(false)}
            onChangeText={value => onChangeText(4, value)}
          />
          <Text style={styles.textError}>{error?.err5}</Text>
        </View>
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
  textError: {
    color: colors.red,
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center"
  }
});
export default InputChart;
