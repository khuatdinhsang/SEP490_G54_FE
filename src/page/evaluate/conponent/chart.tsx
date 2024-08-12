import React from 'react';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import {
    VictoryAxis,
    VictoryBar,
    VictoryChart,
    VictoryGroup,
    VictoryLabel,
    VictoryTheme,
} from 'victory-native';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { useTranslation } from 'react-i18next';

interface MonthlyChartProps {
    tickValues: number[];
    data: Array<{
        x: string;
        label?: number;
        y1: number;
        y2: number;
    }>;
}

const getColorForValue = (value: number) => {
    if ((value > 0 && value < 33)) return colors.orange_04;
    if ((value >= 33 && value < 67)) return colors.green;
    if ((value >= 67 && value <= 100)) return colors.blue_01;
    return colors.gray_G03;
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

const wrapLabel = (text: string) => {
    if (typeof text !== 'string') {
        return text;
    }
    const maxLineLength = 5;
    const words = text?.split('');
    let currentLine = '';
    const lines = [];

    for (const word of words) {
        if ((currentLine + word)?.length > maxLineLength) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine += word;
        }
    }
    if (currentLine) {
        lines.push(currentLine);
    }
    return lines.join('\n');
};

const MonthlyChartEvaluate: React.FC<MonthlyChartProps> = ({ tickValues, data }) => {
    // Filter data where both y1 and y2 are not zero
    const filteredData = data.filter((d) => d.y1 !== 0 || d.y2 !== 0);
    const { t } = useTranslation();

    return (
        <VictoryChart
            height={250}
            theme={VictoryTheme.material}
            style={{ parent: { marginLeft: -30 } }}
            domainPadding={{ x: [15, 35] }}
        >
            <VictoryAxis
                crossAxis
                style={{
                    axis: { stroke: colors.gray_G03 },
                    grid: { stroke: 'transparent' },
                    tickLabels: { fontSize: 10, padding: 5 },
                    ticks: { stroke: 'transparent' }
                }}
                tickLabelComponent={<VictoryLabel dy={5} dx={-5} />}
                tickFormat={(t) => wrapLabel(t)}
            />
            <VictoryAxis
                dependentAxis
                tickValues={tickValues}
                style={{
                    axis: { stroke: 'transparent' },
                    grid: {
                        stroke: colors.gray_G03,
                        strokeDasharray: '3,3',
                    },
                    ticks: { stroke: 'transparent' }
                }}
            />
            <VictoryAxis
                dependentAxis
                orientation="right"
                tickValues={[25, 55, 85]}
                style={{
                    axis: { stroke: 'transparent' },
                    grid: { stroke: 'transparent' },
                    ticks: { stroke: 'transparent' }
                }}
                tickLabelComponent={<VictoryLabel dx={-25} />}
                tickFormat={(value) => {
                    switch (value) {
                        case 25:
                            return t("evaluate.serious");
                        case 55:
                            return t("evaluate.medium");
                        case 85:
                            return t("evaluate.good");
                        default:
                            return '';
                    }
                }}
            />
            <VictoryGroup offset={10}>
                {filteredData.some(d => d.y1 !== 0) && (
                    <VictoryBar
                        data={filteredData}
                        x="x"
                        y="y1"
                        style={{ data: { fill: colors.gray_G03 } }}
                        cornerRadius={{ top: 5, bottom: 5 }}
                        barWidth={10}
                    />
                )}
                {filteredData.some(d => d.y2 !== 0) && (
                    <VictoryBar
                        data={filteredData}
                        x="x"
                        y="y2"
                        style={{
                            data: {
                                fill: ({ datum }) => getColorForValue(datum.y2),
                            },
                        }}
                        cornerRadius={{ top: 5, bottom: 5 }}
                        barWidth={10}
                    />
                )}
            </VictoryGroup>
        </VictoryChart>
    );
};

export default MonthlyChartEvaluate;
