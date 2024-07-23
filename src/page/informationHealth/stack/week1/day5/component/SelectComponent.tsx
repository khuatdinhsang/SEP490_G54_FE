import {Pressable, StyleSheet, Text, View} from 'react-native';
import colors from '../../../../../../constant/color';
import {flexRowCenter} from '../../../../../../styles/flex';

interface SelectComponentProps {
  textLeft: string;
  textRight: string;
  label: string;
  handleOnPressLeft: () => void;
  handleOnPressRight: () => void;
  indexActive: number;
}
const SelectComponent = (props: SelectComponentProps) => {
  const {
    textLeft,
    textRight,
    label,
    handleOnPressLeft,
    handleOnPressRight,
    indexActive,
  } = props;

  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <View
        style={[
          flexRowCenter,
          {
            marginTop: 10,
          },
        ]}>
        <Pressable
          style={[
            styles.button,
            flexRowCenter,
            {
              backgroundColor:
                indexActive === 1 ? colors.orange_01 : 'transparent',
              borderColor: indexActive === 1 ? colors.primary : colors.gray_G03,
            },
          ]}
          onPress={() => {
            handleOnPressLeft();
          }}>
          <Text
            style={{
              color: indexActive === 1 ? colors.primary : colors.gray_G05,
            }}>
            {textLeft}
          </Text>
        </Pressable>
        <Pressable
          style={[
            styles.button,
            flexRowCenter,
            {
              backgroundColor:
                indexActive === 2 ? colors.orange_01 : 'transparent',
              borderColor: indexActive === 2 ? colors.primary : colors.gray_G03,
            },
          ]}
          onPress={() => {
            handleOnPressRight();
          }}>
          <Text
            style={{
              color: indexActive === 2 ? colors.primary : colors.gray_G05,
            }}>
            {textRight}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G07,
  },
  button: {
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    height: 60,
    flex: 1,
  },
});
export default SelectComponent;
