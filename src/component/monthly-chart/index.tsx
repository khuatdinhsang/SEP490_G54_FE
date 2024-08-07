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
import { useTranslation } from 'react-i18next';

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
    text1?: string;
    text2?: string;
    text3?: string;
    text4?: string;
    note1?: string;
    note2?: string;
    note3?: string;
    note4?: string;
    language: string
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

const MonthlyChart: React.FC<MonthlyChartProps> = ({ tickValues, textTitle,
    data, text1, text2, text3, text4, language, note1, note2, note3, note4 }) => {
    const { t } = useTranslation()
    console.log("a", language)
    const filteredDataY1 = data.filter((d) => d.y1 !== 0);
    const filteredDataY2 = data.filter((d) => d.y2 !== 0);
    const filteredDataY3 = data.filter((d) => d.y3 !== 0);
    const filteredDataY4 = data.filter((d) => d.y4 !== 0);

    const hasY4 = filteredDataY4?.length > 0;
    const hasY3 = filteredDataY3?.length > 0;
    const hasY2 = filteredDataY2?.length > 0;

    return (
        <View style={[styles.container, styles.shadowBox]}>
            <View style={styles.header}>
                <Text style={styles.textTitle}>{textTitle}</Text>
            </View>
            <View style={[styles.legendContainer, { marginTop: 10 }]}>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                    <Text style={styles.textDes}>{t("lesson.week1")}</Text>
                </View>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.orange_04 }]} />
                    <Text style={styles.textDes}>{t("lesson.month1")}</Text>
                </View>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.green }]} />
                    <Text style={styles.textDes}>{t("lesson.month2")}</Text>
                </View>
                <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.blue_01 }]} />
                    <Text style={styles.textDes}>{t("lesson.month3")}</Text>
                </View>
            </View>
            <View>
                {text1 && note1 && language === 'en' && <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                    <Text style={styles.textDes}>{text1}{" "}:{" "}{note1}</Text>
                </View>
                }
                {text2 && note2 && language === 'en' && <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                    <Text style={styles.textDes}>{text2}{" "}:{" "}{note2}</Text>
                </View>
                }
                {text3 && note3 && language === 'en' && <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                    <Text style={styles.textDes}>{text3}{" "}:{" "}{note3}</Text>
                </View>
                }
                {text4 && note4 && language === 'en' && <View style={[styles.legendItem, { marginRight: 10 }]}>
                    <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                    <Text style={styles.textDes}>{text4}{" "}:{" "}{note4}</Text>
                </View>
                }
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
                        ticks: { stroke: 'transparent' }
                    }}
                    tickFormat={(t) => wrapLabel(t)}
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
                        ticks: { stroke: 'transparent' }
                    }}
                />
                <VictoryGroup offset={10}>
                    <VictoryBar
                        data={filteredDataY1}
                        x="x"
                        y="y1"
                        style={{ data: { fill: colors.gray_G03 } }}
                        cornerRadius={{ top: 5, bottom: 5 }}
                        barWidth={10}
                    />
                    {hasY2 &&
                        <VictoryBar
                            data={filteredDataY2}
                            x="x"
                            y="y2"
                            style={{ data: { fill: colors.orange_04 } }}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            barWidth={10}
                        />
                    }
                    {hasY3 &&
                        <VictoryBar
                            data={filteredDataY3}
                            x="x"
                            y="y3"
                            style={{ data: { fill: colors.green } }}
                            cornerRadius={{ top: 5, bottom: 5 }}
                            barWidth={10}
                        />
                    }
                    {hasY4 &&
                        <VictoryBar
                            data={filteredDataY4}
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
