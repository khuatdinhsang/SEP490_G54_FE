import {useCallback} from 'react';
import Svg, {Defs, LinearGradient, Rect, Stop} from 'react-native-svg';
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

interface BarChartProps {
  data: Array<{x: string; y: number; label?: string}>;
  backgroundProps?: {y: number; height: number; color: string};
  domainY: [number, number];
}

// Example props:
{
  /* <LineChart
  data={[
    {x: '9/11', y: 12.5},
    {x: '9/15', y: 10},
    {x: '9/20', y: 15},
    {x: '10/4', y: 8},
    {x: '10/5', y: 13, label: '8접시'},
  ]}
/>; */
}

{
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
}

const LineChart = (props: BarChartProps) => {
  const HEIGHT = 220;
  const {data, backgroundProps, domainY} = props;
  const dataScatter = data.map(item => {
    return {
      x: item.x,
      y: item.y,
    };
  });

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
    <VictoryChart
      domain={{y: domainY}}
      height={HEIGHT}
      style={{
        parent: {
          marginLeft: -20,
        },
        background: backgroundProps && {fill: colors.primary, opacity: '0.15'},
      }}
      domainPadding={{x: 20}}
      backgroundComponent={
        backgroundProps && (
          <Background
            y={HEIGHT - backgroundProps.y - 85}
            height={backgroundProps.height}
          />
        )
      }>
      <VictoryAxis
        crossAxis
        style={{
          axis: {stroke: colors.gray_G03},
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
        style={{
          axis: {stroke: 'transparent'},
          tickLabels: {fill: colors.gray_G05},
          grid: {
            stroke: colors.gray_G03,
            strokeWidth: 0.5,
            strokeDasharray: '3,3',
          },
        }}
      />
      <VictoryLine
        style={{data: {stroke: colors.primary}}}
        width={2}
        data={data}
        labelComponent={<CustomLabelComponent />}
      />
      <VictoryScatter
        data={dataScatter}
        style={{data: {fill: colors.primary}}}
        size={5}
        dataComponent={<CustomScatterPoint />}
      />
      <VictoryLabel
        text="접시"
        x={30}
        y={HEIGHT - 50}
        textAnchor="middle"
        style={{fill: colors.gray_G05, fontSize: 14, fontWeight: '400'}}
      />
    </VictoryChart>
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
      width={props.text.length * 10 + 24}
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
      }}
      dy={-15}
      renderInPortal={false}
    />
  </Svg>
);

export default LineChart;
