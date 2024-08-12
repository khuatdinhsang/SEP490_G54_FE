import React, { useCallback } from 'react';
import { Defs, LinearGradient, Rect, Stop, Circle, Svg } from 'react-native-svg';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
  VictoryArea,
  Background
} from 'victory-native';
import colors from '../../constant/color';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { flexRow } from '../../styles/flex';

interface LineChartProps {
  data1: Array<{ x: string; y: number; label?: string }>;
  data2: Array<{ x: string; y: number; label?: string }>;
  color1: string;
  color2: string;
  icon: ImageSourcePropType;
  textTitle: string;
  backgroundProps1?: { min: number; max: number; color: string };
  backgroundProps2?: { min: number; max: number; color: string };
  labelElement: string;
  textInfoColor1?: string;
  textInfoColor2?: string;
  tickValues: number[];
  textDescription?: string;
  valueDescription1?: number;
  valueDescription2?: number;
  unitDescription?: string;
  detail: boolean
}

const TwoLineChart = (props: LineChartProps) => {
  const {
    detail,
    data1,
    data2,
    color1,
    color2,
    tickValues,
    backgroundProps1,
    backgroundProps2,
    textInfoColor1,
    textInfoColor2,
    icon,
    textTitle,
    labelElement,
    textDescription,
    valueDescription1,
    valueDescription2,
    unitDescription
  } = props;
  console.log("data1", data1)
  console.log("data2", data2)
  const HEIGHT = 250;
  const dataScatter1 = data1.map(item => ({ x: item.x, y: item.y, label: item.label }));
  const dataScatter2 = data2.map(item => ({ x: item.x, y: item.y, label: item.label }));

  const textLabel = {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20
  };

  const gradientMin1 = backgroundProps1?.min;
  const gradientMin2 = backgroundProps2?.min;
  const gradientMax1 = backgroundProps1?.max;
  const gradientMax2 = backgroundProps2?.max;

  const CustomScatterPoint1 = useCallback(
    (props: any) => {
      const isLastPoint = props.index === data1?.length - 1;
      const fillColor = isLastPoint ? colors.white : color1;
      const strokeColor = isLastPoint ? color1 : color1;
      return (
        <Circle
          cx={props.x}
          cy={props.y}
          r={5}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
      );
    },
    [data1, color1],
  );

  const CustomScatterPoint2 = useCallback(
    (props: any) => {
      const isLastPoint = props.index === data2?.length - 1;
      const fillColor = isLastPoint ? colors.white : color2;
      const strokeColor = isLastPoint ? color2 : color2;

      return (
        <Circle
          cx={props.x}
          cy={props.y}
          r={5}
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth={2}
        />
      );
    },
    [data2, color2],
  );

  return (
    <View style={[styles.container, styles.shadowBox]}>
      <View style={flexRow}>
        <Image source={icon} />
        <Text style={styles.textTitle}>{textTitle}</Text>
      </View>
      {backgroundProps1 && (
        <View style={[flexRow, { marginTop: 5 }]}>
          <View style={[styles.infoColor, { backgroundColor: `${backgroundProps1?.color}` }]}></View>
          <Text style={styles.textColorInfo}>{textInfoColor1}</Text>
        </View>
      )}
      {backgroundProps2 && (
        <View style={[flexRow, { marginTop: 5 }]}>
          <View style={[styles.infoColor, { backgroundColor: `${backgroundProps2?.color}` }]}></View>
          <Text style={styles.textColorInfo}>{textInfoColor2}</Text>
        </View>
      )}
      <VictoryChart
        height={HEIGHT}
        style={{
          parent: {
            marginLeft: -20,
          },
        }}
        domainPadding={{ x: 20 }}
      >
        <Defs>
          <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors.orange_04} stopOpacity="0.5" />
            <Stop offset="100%" stopColor={colors.orange_04} stopOpacity="0.5" />
          </LinearGradient>
          <LinearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor={colors.orange_04} stopOpacity="0.5" />
            <Stop offset="100%" stopColor={colors.orange_04} stopOpacity="0.5" />
          </LinearGradient>
        </Defs>
        <VictoryArea
          style={{
            data: { fill: backgroundProps1?.color, opacity: 0.3 },
          }}
          data={[
            { x: 0, y: gradientMax1, y0: gradientMin1 },
            { x: data1.length + 1, y: gradientMax1, y0: gradientMin1 },
          ]}
          interpolation="step"
        />
        <VictoryArea
          style={{
            data: { fill: backgroundProps2?.color, opacity: 0.3 },
          }}
          data={[
            { x: 0, y: gradientMax2, y0: gradientMin2 },
            { x: data2.length + 1, y: gradientMax2, y0: gradientMin2 },
          ]}
          interpolation="step"
        />
        <VictoryAxis
          crossAxis
          style={{
            axis: { stroke: colors.gray_G03 },
            tickLabels: {
              fill: colors.gray_G05,
              ...textLabel,
            },
          }}
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
          tickFormat={(tick) => (tick === 89 || tick === 139 || tick === 129 || tick === 179 ? tick?.toString() : '')}
        />
        <VictoryLine
          style={{ data: { stroke: color1 } }}
          data={data1}
        />
        <VictoryLine
          style={{ data: { stroke: color2 } }}
          data={data2}
        />
        <VictoryScatter
          data={dataScatter1}
          style={{ data: { fill: color1 } }}
          size={5}
          dataComponent={<CustomScatterPoint1 />}
        />
        <VictoryScatter
          data={dataScatter2}
          style={{ data: { fill: color2 } }}
          size={5}
          dataComponent={<CustomScatterPoint2 />}
        />
        <VictoryLabel
          text={labelElement}
          x={30}
          y={HEIGHT - 50}
          textAnchor="middle"
          style={{ fill: colors.gray_G05, fontSize: 14, fontWeight: '400' }}
        />
      </VictoryChart>
      {(valueDescription1 !== null) && detail && (
        <View>
          <Text style={styles.textTitleMedium}>{textDescription}</Text>
          <View style={styles.value}>
            <Text style={styles.textValue}>{valueDescription1} {unitDescription}</Text>
          </View>
          <View style={styles.value}>
            <Text style={styles.textValue}>{valueDescription2} {unitDescription}</Text>
          </View>
        </View>
      )}
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
      x={props.x - 12 - props.text?.length * 5}
      y={props.y - 35}
      width={props.text?.length * 8 + 8 * 2}
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
    fontWeight: '700',
    fontSize: 18,
    color: colors.gray_G08
  },
  textTitleMedium: {
    fontWeight: '500',
    fontSize: 16,
    color: colors.gray_G07,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: colors.orange_04
  },
  value: {
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: colors.gray_G01,
    marginTop: 10
  },
  textValue: {
    fontWeight: '700',
    fontSize: 18,
    color: colors.gray_G09,
    textAlign: 'center',
  },
  infoColor: {
    height: 20,
    width: 70,
    backgroundColor: colors.primary,
    opacity: 0.15,
    marginRight: 10
  },
  textColorInfo: {
    fontWeight: '400',
    fontSize: 14,
    color: colors.gray_G06
  }
});

export default TwoLineChart;
