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
import colors from '../../constant/color';

interface MonthlyChartProps {
    tickValues: number[];
    textTitle: string;
    data: Array<{
        x: string;
        label?: number;
        y1: number;
        y2?: number;
        y3?: number;
        y4?: number;
    }>;
}
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
const MonthlyChart: React.FC<MonthlyChartProps> = ({ tickValues, textTitle, data }) => {
    const hasY4 = data?.some(item => item.y4 !== 0);
    const hasY3 = data?.some(item => item.y3 !== 0);
    const hasY2 = data?.some(item => item.y2 !== 0);
    return (
        <View style={[styles.container, styles.shadowBox]}>
            <View style={styles.header}>
                <Text style={styles.textTitle}>{textTitle}</Text>
            </View>
            <View style={[styles.legendContainer, { marginTop: 10 }]}>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                    <Text style={styles.textDes}>1주차</Text>
                </View>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.orange_04 }]} />
                    <Text style={styles.textDes}>1개월차</Text>
                </View>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.green }]} />
                    <Text style={styles.textDes}>2개월차</Text>
                </View>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.blue_01 }]} />
                    <Text style={styles.textDes}>3개월차</Text>
                </View>
            </View>
            <VictoryChart
                height={250}
                theme={VictoryTheme.material}
                style={{ parent: { marginLeft: -25 } }}
            >
                <VictoryAxis
                    crossAxis
                    style={{
                        axis: { stroke: colors.gray_G03 },
                        grid: { stroke: 'transparent' },
                    }}
                />
                <VictoryAxis
                    crossAxis
                    dependentAxis
                    tickValues={tickValues}
                    style={{
                        axis: { stroke: 'transparent' },
                        grid: {
                            stroke: colors.gray_G03,
                            strokeDasharray: '3,3',
                        },
                    }}
                />
                <VictoryGroup offset={10}>
                    <VictoryBar
                        data={data}
                        x="x"
                        y="y1"
                        style={{ data: { fill: colors.gray_G03 } }}
                        cornerRadius={{ top: 5, bottom: 5 }}
                        barWidth={10}
                    />
                    {hasY2 &&
                        <VictoryBar
                            data={data}
                            x="x"
                            y="y2"
                            style={{ data: { fill: colors.orange_04 } }}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            barWidth={10}
                        />
                    }
                    {hasY3 &&
                        <VictoryBar
                            data={data}
                            x="x"
                            y="y3"
                            style={{ data: { fill: colors.green } }}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            barWidth={10}
                        />
                    }
                    {hasY4 &&
                        <VictoryBar
                            data={data}
                            x="x"
                            y="y4"
                            style={{ data: { fill: colors.blue_01 } }}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            barWidth={10}
                            labelComponent={<CustomLabelComponent />}
                        />
                    }
                </VictoryGroup>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G08,
    },
    legendContainer: {
        flexDirection: 'row',
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    des: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginRight: 5,
    },
    textDes: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.gray_G08,
    },
});

export default MonthlyChart;
