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
  backgroundProps1?: { y: number; height: number; color: string };
  backgroundProps2?: { y: number; height: number; color: string };
  labelElement: string;
  textInfoColor1?: string;
  textInfoColor2?: string;
  tickValues: number[],
  textDescription?: string
  valueDescription1?: number
  valueDescription2?: number
  unitDescription?: string
}

const TwoLineChart = (props: LineChartProps) => {
  const { data1, data2, color1, color2, tickValues, backgroundProps1,
    backgroundProps2, textInfoColor1, textInfoColor2, icon,
    textTitle, labelElement,
    textDescription, valueDescription1, valueDescription2, unitDescription
  } = props;
  const HEIGHT = 250;
  const dataScatter1 = data1.map(item => ({ x: item.x, y: item.y }));
  const dataScatter2 = data2.map(item => ({ x: item.x, y: item.y }));
  const textLabel = {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  };

  const CustomScatterPoint1 = useCallback(
    (props: any) => {
      const isLastPoint = props.index === data1.length - 1;
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
      const isLastPoint = props.index === data2.length - 1;
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
          background: backgroundProps1 && { fill: colors.primary, opacity: '0.15' },
        }}
        domainPadding={{ x: 20 }}
        backgroundComponent={
          backgroundProps1 && (
            <Background
              y={HEIGHT - backgroundProps1.y - 85}
              height={backgroundProps1.height}
              style={{ fill: backgroundProps1.color, opacity: 0.15 }}
            />
          )

        }
      // backgroundComponent={
      //   <>
      //     {backgroundProps1 && (
      //       <Background
      //         y={HEIGHT - backgroundProps1.y - 85}
      //         height={backgroundProps1.height}
      //         style={{ fill: backgroundProps1.color, opacity: 0.15 }}
      //       />
      //     )}
      //     {backgroundProps2 && (
      //       <Background
      //         y={HEIGHT - backgroundProps2.y - 85}
      //         height={backgroundProps2.height}
      //         style={{ fill: backgroundProps2.color, opacity: 0.15 }}
      //       />
      //     )}
      //   </>
      // }
      >

        <VictoryAxis
          crossAxis
          style={{
            axis: { stroke: colors.gray_G03 },
            tickLabels: {
              fill: (fill: any) => {
                return fill.index === data1.length - 1
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
          tickFormat={(tick) => (tick === 89 || tick === 139 ? tick.toString() : '')}
        />

        <VictoryLine
          style={{ data: { stroke: color1 } }}
          width={2}
          data={data1}
          labelComponent={<CustomLabelComponent />}
        />
        <VictoryLine
          style={{ data: { stroke: color2 } }}
          width={2}
          data={data2}
          labelComponent={<CustomLabelComponent />}
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
      {valueDescription1 !== null && <View>
        <Text style={styles.textTitleMedium}>{textDescription}</Text>
        <View style={styles.value}>
          <Text style={styles.textValue}>{valueDescription1} {unitDescription}</Text>
        </View>
        <View style={styles.value}>
          <Text style={styles.textValue}>{valueDescription2} {unitDescription}</Text>
        </View>
      </View>}
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
  textTitleMedium: {
    fontWeight: "500",
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
    marginRight: 10
  },
  textColorInfo: {
    fontWeight: "400",
    fontSize: 14,
    color: colors.gray_G06
  }
});

export default TwoLineChart;
