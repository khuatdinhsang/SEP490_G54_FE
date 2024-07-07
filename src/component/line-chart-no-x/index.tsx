import { useCallback } from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  Circle,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import colors from '../../constant/color';
import { StyleSheet, Text, View } from 'react-native';

interface LineChartProps {
  data: Array<{ y: number, label?: string }>;
  textTitle: string;
  tickValues: number[],
  labelElement: string;
}

const LineChart = (props: LineChartProps) => {
  const HEIGHT = 250;
  const { data, textTitle, tickValues, labelElement } = props;
  const dataScatter = data.map((item, index) => ({
    x: index + 1,
    y: item.y,
    label: item?.label
  }));
  const yTickFormat = (y: number) => {
    if (y === 0) return '';
    if (y === 33) return '하';
    if (y === 67) return '중';
    if (y === 100) return '상';
    return y;
  };

  const CustomScatterPoint = useCallback(
    (props: any) => {
      const isLastPoint = props.index === data.length - 1;
      const fillColor = isLastPoint ? colors.white : colors.primary;
      const strokeColor = isLastPoint ? colors.primary : colors.primary;
      return (
        <Svg>
          <Circle
            cx={props.x}
            cy={props.y}
            r={5}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth={2}
          />
        </Svg>
      );
    },
    [dataScatter],
  );

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
        width={props.text.length * 8 + 8 * 2}
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
          width: 70
        }}
        dy={-15}
        dx={-7}
        renderInPortal={false}
        textAnchor="middle"
      />
    </Svg>
  );

  return (
    <View style={[styles.container, styles.shadowBox]}>
      <Text style={styles.textTitle}>{textTitle}</Text>
      <VictoryChart
        height={HEIGHT}
        style={{
          parent: {
            marginLeft: -20,
          },
        }}
        domainPadding={{ x: 20 }}
      >
        <VictoryAxis
          crossAxis
          style={{
            axis: { stroke: colors.gray_G03 },
            grid: { stroke: 'transparent' },
            tickLabels: { fill: 'transparent' },
          }}
          tickValues={dataScatter.map((_, index) => index + 1)}
        />
        <VictoryAxis
          crossAxis
          dependentAxis
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: colors.gray_G05 },
            grid: {
              stroke: colors.gray_G03,
              strokeWidth: 0.5,
              strokeDasharray: '3,3',
            },
          }}
          tickValues={tickValues}
          tickFormat={yTickFormat}
        />
        <VictoryLine
          style={{ data: { stroke: colors.primary } }}
          data={dataScatter}
          width={2}
          labelComponent={<CustomLabelComponent />}
        />
        <VictoryScatter
          data={dataScatter}
          style={{ data: { fill: colors.primary } }}
          size={5}
          dataComponent={<CustomScatterPoint />}
        />
        <VictoryLabel
          text={labelElement}
          x={30}
          y={HEIGHT - 50}
          textAnchor="middle"
          style={{ fill: colors.gray_G05, fontSize: 14, fontWeight: '400' }}
        />
      </VictoryChart>
    </View>
  );
};

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
    color: colors.gray_G08
  },
});
export default LineChart;
