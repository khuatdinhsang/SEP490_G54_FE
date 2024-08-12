import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { Switch } from 'react-native-switch';
import colors from '../../constant/color';
import { flexRow } from '../../styles/flex';

interface SwitchComponentProps {
  text: string;
  value: boolean;
  onChangeValue: (value: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

const SwitchComponent = (props: SwitchComponentProps) => {
  const { value, onChangeValue, text, style } = props;

  return (
    <View style={style}>
      <View style={[styles.container, flexRow]}>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.right}>
          <Switch
            value={value}
            onValueChange={val => {
              onChangeValue(val);
            }}
            activeText=""
            inActiveText=""
            circleSize={26}
            circleBorderWidth={0}
            backgroundActive={colors.primary}
            backgroundInactive={colors.gray_G02}
            circleActiveColor={colors.white}
            circleInActiveColor={colors.white}
            changeValueImmediately={true}
            switchLeftPx={3}
            switchRightPx={3}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray_G01,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    minHeight: 40,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    flex: 1,
    flexWrap: 'wrap'
  },
  right: {
    marginLeft: 10,
  },
});

export default SwitchComponent;
