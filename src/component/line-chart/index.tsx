import { useCallback } from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
  Background,
  Circle,
  VictoryAxis,
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import colors from '../../constant/color';
import { Image, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { flexRow } from '../../styles/flex';

interface LineChartProps {
  data: Array<{ x: string; y: number; label?: string }>;
  icon?: ImageSourcePropType,
  textTitle: string,
  unit?: string,
  textTitleToday?: string,
  valueToday?: string,
  textTitleMedium?: string,
  valueMedium?: string,
  backgroundProps?: { y: number; height: number; color: string };
  // domainY: [number, number];
  labelElement: string,
  textInfo?: string,
  tickValues: number[]
}

// Example props:
/* <LineChart
  data={[
    {x: '9/11', y: 12.5},
    {x: '9/15', y: 10},
    {x: '9/20', y: 15},
    {x: '10/4', y: 8},
    {x: '10/5', y: 13, label: '8접시'},
  ]}
/>; */

/* <LineChart
  data={[
    {x: '9/11', y: 70},
    {x: '9/15', y: 60},
    {x: '9/20', y: 80},
    {x: '10/4', y: 50},
    {x: '10/5', y: 60, label: '60kg'},
  ]}
  backgroundProps={{
    color: colors.primary,
    height: 20,
    y: 40,
  }}
  domainY={[0, 100]}
/>; */

const LineChart = (props: LineChartProps) => {
  const HEIGHT = 250;
  const { data, backgroundProps, tickValues, textTitleMedium, valueMedium, textInfo, icon, textTitle, textTitleToday, labelElement, valueToday, unit } = props;
  const dataScatter = data.map(item => {
    return {
      x: item.x,
      y: item.y,
      label: item?.label
    };
  });
  console.log("aaa", dataScatter)

  const textLabel = {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
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
  return (
    <View style={[styles.container, styles.shadowBox]}>
      <View style={flexRow}>
        <Image source={icon} />
        <Text style={styles.textTitle}>{textTitle}</Text>
      </View>
      {backgroundProps && (
        <View style={[flexRow, { marginTop: 5 }]}>
          <View style={styles.infoColor}></View>
          <Text style={styles.textColorInfo}>{textInfo}</Text>
        </View>
      )}
      <VictoryChart
        // domain={{ y: domainY }}
        height={HEIGHT}
        style={{
          parent: {
            marginLeft: -20,
          },
          background: backgroundProps && { fill: colors.primary, opacity: '0.15' },
        }}
        domainPadding={{ x: 20 }}
        backgroundComponent={
          backgroundProps && (
            <Background
              y={HEIGHT - backgroundProps.y - 85}
              height={backgroundProps.height}
            />
          )
        }
      >
        <VictoryAxis
          crossAxis
          style={{
            axis: { stroke: colors.gray_G03 },
            grid: {
              stroke: (props: any) => {
                return props.index === data.length - 1
                  ? colors.primary
                  : 'transparent';
              },
            },
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
          tickFormat={(t, index) => (index === 0 ? '' : t)}
          style={{
            axis: { stroke: 'transparent' },
            tickLabels: { fill: colors.gray_G05 },
            grid: {
              stroke: colors.gray_G03,
              strokeWidth: 0.5,
              strokeDasharray: '3,3',
            },
          }}
        />
        <VictoryLine
          style={{ data: { stroke: colors.primary } }}
          width={2}
          data={data}
        // labelComponent={<CustomLabelComponent />}
        />
        <VictoryScatter
          data={dataScatter}
          style={{ data: { fill: colors.primary } }}
          size={5}
          // labelComponent={<CustomLabelComponent />}
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
      {valueToday && <View>
        <Text style={styles.textTitleMedium}>{textTitleToday}</Text>
        <View style={styles.value}>
          <Text style={styles.textValue}>{valueToday} {unit}</Text>
        </View>
      </View>}
      {valueMedium && <View style={{ marginTop: 20 }}>
        <Text style={styles.textTitleMedium}>{textTitleMedium}</Text>
        <View style={styles.value}>
          <Text style={styles.textValue}>{valueMedium} {unit}</Text>
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
      fill="url(#grad)" // Apply gradient here
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
export default LineChart;
