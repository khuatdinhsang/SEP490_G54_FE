import Svg, {Rect} from 'react-native-svg';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryLabel,
} from 'victory-native';
import colors from '../../constant/color';

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
  data: Array<{x: string; y: number; label?: string}>;
}

const BarChart = (props: BarChartProps) => {
  const {data} = props;
  const textLabel = {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  };

  return (
    <VictoryChart
      height={200}
      style={{
        parent: {
          marginLeft: -20,
        },
      }}>
      <VictoryAxis
        crossAxis
        style={{
          axis: {stroke: colors.gray_G03},
          grid: {stroke: 'transparent'},
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
          tickLabels: {fill: 'transparent'},
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
        cornerRadius={{top: 9, bottom: 9}}
        barWidth={18}
        labelComponent={<CustomLabelComponent />}
      />
    </VictoryChart>
  );
};

const CustomLabelComponent = (props: any) => (
  <Svg>
    <Rect
      x={props.x - 12 - props.text.length * 5}
      y={props.y - 35}
      width={45}
      height={28}
      fill={colors.gray_G10}
      rx="8"
      ry="8"
    />
    <VictoryLabel
      {...props}
      text={props.text}
      style={{
        fill: colors.white,
        fontSize: 14,
      }}
      dy={-15}
      renderInPortal={false}
    />
  </Svg>
);
export default BarChart;
