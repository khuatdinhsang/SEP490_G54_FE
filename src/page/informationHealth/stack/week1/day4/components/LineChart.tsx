import {useCallback} from 'react';
import Svg from 'react-native-svg';
import {
  Circle,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
} from 'victory-native';
import colors from '../../../../../../constant/color';

interface LineChartProps {
  data: Array<{x: string; y: number; label?: string}>;
  domainY: [number, number];
}

const LineChart = (props: LineChartProps) => {
  const HEIGHT = 220;
  const {data, domainY} = props;
  const dataScatter = data.map(item => {
    return {
      x: item.x,
      y: item.y,
    };
  });

  const CustomScatterPoint = useCallback(
    (props: any) => {
      const fillColor = colors.white;
      const strokeColor = colors.primary;

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
          marginLeft: -10,
        },
      }}
      domainPadding={{x: 20}}>
      <VictoryAxis
        crossAxis
        style={{
          axis: {stroke: colors.gray_G03},
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
        tickValues={[0, 50, 100]}
      />
      <VictoryLine
        style={{data: {stroke: colors.primary}}}
        width={2}
        data={data}
      />
      <VictoryScatter
        data={dataScatter}
        style={{data: {fill: colors.primary}}}
        size={5}
        dataComponent={<CustomScatterPoint />}
      />
    </VictoryChart>
  );
};

export default LineChart;
