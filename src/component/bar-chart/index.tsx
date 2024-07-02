import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native';
import colors from '../../constant/color';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { flexRow } from '../../styles/flex';

/*
Example Props:
  <BarChart
    data={[
      {x: '9/11', y: 2},
      {x: '9/13', y: 2},
      {x: '9/15', y: 3},
      {x: '9/20', y: 3},
      {x: '10/4', y: 3},
      {x: '10/5', y: 3, label: '3점'},
    ]}
  />;
*/

interface BarChartProps {
  data: Array<{ x: string; y: number; label?: string }>;
  icon: ImageSourcePropType;
  textTitle: string;
  textTitleMedium: string;
  unit: string;
  valueMedium: string;
  backgroundProps?: { y: number; height: number; color: string };
  textInfo?: string;
}

const BarChart = (props: BarChartProps) => {
  const { data, backgroundProps, textInfo, icon, textTitle, valueMedium, textTitleMedium, unit } = props;
  const textLabel = {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  };
  const yValues = data.map(d => d.y);
  const maxY = Math.max(...yValues);
  const tickValues = [0, maxY / 3, (2 * maxY) / 3, maxY];

  return (
    <View style={[styles.container, styles.shadowBox]}>
      <View style={flexRow}>
        <Image source={icon} style={{ marginRight: 5 }} />
        <Text style={styles.textTitle}>{textTitle}</Text>
      </View>
      {backgroundProps && (
        <View style={[flexRow, { marginTop: 5 }]}>
          <View style={styles.infoColor}></View>
          <Text style={styles.textColorInfo}>{textInfo}</Text>
        </View>
      )}
      <VictoryChart
        height={200}
        style={{
          parent: {
            marginLeft: -40,
          },
        }}
      >
        <VictoryAxis
          crossAxis
          style={{
            axis: { stroke: colors.gray_G03 },
            grid: { stroke: 'transparent' },
            tickLabels: {
              fill: (fill: any) => {
                return fill.index === data.length - 1
                  ? colors.black
                  : colors.gray_G05;
              },
              ...textLabel,
            },
          }}
        />
        <VictoryAxis
          crossAxis
          dependentAxis
          tickValues={tickValues}
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
            grid: {
              stroke: colors.gray_G03,
              strokeWidth: 0.5,
              strokeDasharray: '3,3',
            },
          }}
        />

        <VictoryBar
          style={{
            data: {
              fill: fill =>
                fill.index === data.length - 1 ? colors.primary : colors.gray_G03,
            },
          }}
          data={data}
          cornerRadius={{ top: 9, bottom: 9 }}
          barWidth={18}
          labelComponent={<CustomLabelComponent />}
        />
      </VictoryChart>
      <View>
        <Text style={styles.textTitleMedium}>{textTitleMedium}</Text>
        <View style={styles.value}>
          <Text style={styles.textValue}>{valueMedium} {unit}</Text>
        </View>
      </View>
    </View>
  );
};

const CustomLabelComponent = (props: any) => (
  <Svg>
    <Defs>
      <LinearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor={colors.black} stopOpacity="0.7" />
        <Stop offset="100%" stopColor={colors.gray_G10} stopOpacity="0.7" />
      </LinearGradient>
    </Defs>
    <Rect
      x={props.x - 12 - props.text.length * 5}
      y={props.y - 35}
      width={45}
      height={28}
      fill="url(#grad)"
      rx="8"
      ry="8"
    />
    <VictoryLabel
      {...props}
      text={props.text}
      style={{
        fill: colors.white,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
      }}
      dy={-15}
      renderInPortal={false}
    />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
  },
  shadowBox: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#6D6D6D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 22,
    elevation: 3,
  },
  textTitle: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.gray_G08,
  },
  textTitleMedium: {
    fontWeight: "500",
    fontSize: 16,
    color: colors.gray_G07,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: colors.orange_04,
  },
  value: {
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.gray_G01,
    marginTop: 10,
  },
  textValue: {
    fontWeight: "700",
    fontSize: 18,
    color: colors.gray_G09,
    textAlign: "center",
  },
  infoColor: {
    height: 20,
    width: 70,
    backgroundColor: colors.primary,
    opacity: 0.15,
    marginRight: 10,
  },
  textColorInfo: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.gray_G06,
  },
});

export default BarChart;
