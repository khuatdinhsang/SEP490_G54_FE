import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowSpaceAround, flexRowSpaceBetween } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';
import { HeightDevice } from '../../../../util/Dimenssion';
import BarChart from '../../../../component/bar-chart';
import LineChart from '../../../../component/line-chart';
import { chartService } from '../../../../services/charts';
import { extractDayAndMonth, transformDataToChartHBA1C } from '../../../../util';
import LoadingScreen from '../../../../component/loading';
import { BloodSugarDetails, valueCardinal } from '../../../../constant/type/chart';
import { TypeTimeMeasure } from '../../contant';
import TwoLineChart from '../../../../component/twoLine-chart';

interface DataTypes {
    x: string;
    y: number;
    label?: string;
}

const NumericalRecordChart = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>('');
    const [dataChartHBA1C, setDataChartHBA1C] = useState<valueCardinal[]>([]);
    const [dataChartCholesterol, setDataCholesterol] = useState<valueCardinal[]>([]);
    const [hba1cDataToday, setHba1cDataToday] = useState<number>();
    const [cholesterolDataToday, setCholesterolDataToday] = useState<number>();
    const [beforeEat, setBeforeEat] = useState<DataTypes[]>([]);
    const [afterEat, setAfterEat] = useState<DataTypes[]>([]);
    const [detailBloodSugar, setDetailBloodSugar] = useState<BloodSugarDetails | undefined>();

    useLayoutEffect(() => {
        const getDataChart = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await chartService.getDataCardinal();
                console.log('r', resData);
                if (resData.code === 200) {
                    console.log("1", resData.result.cholesterolDataToday)
                    setDataCholesterol(resData.result.cholesterolList);
                    setDataChartHBA1C(resData.result.hba1cList);
                    setHba1cDataToday(resData.result.hba1cDataToday);
                    setCholesterolDataToday(resData.result.cholesterolDataToday);
                    setDetailBloodSugar(resData.result.detailDataBloodSugar);

                    const beforeEatData = resData.result.bloodSugarList.map((item, index, array) => ({
                        x: extractDayAndMonth(item.date),
                        y: item.beforeEat ?? 0,
                        label: index === array.length - 1 ? `${item.beforeEat ?? 0}mg/DL` : undefined,
                    }));
                    setBeforeEat(beforeEatData);

                    const afterEatData = resData.result.bloodSugarList.map((item, index, array) => ({
                        x: extractDayAndMonth(item.date),
                        y: item.afterEat ?? 0,
                        label: index === array.length - 1 ? `${item.afterEat ?? 0}mg/DL` : undefined,
                    }));
                    setAfterEat(afterEatData);
                } else {
                    setMessageError('Unexpected error occurred.');
                }
            } catch (error: any) {
                setMessageError(error?.response?.status === 400 ? error.response.data.message : 'Unexpected error occurred.');
            } finally {
                setIsLoading(false);
            }
        };
        getDataChart();
    }, []);

    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    };

    const navigateNumericalRecord = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD);
    };

    console.log('93', detailBloodSugar);
    console.log("aaaa")
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={`${t('recordHealthData.glycatedHemoglobin')}/${t('recordHealthData.cholesterol')}/${t('recordHealthData.bloodSugar')}`}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={flexRow}>
                <Pressable onPress={navigateNumericalRecord} style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>{t('recordHealthData.bloodCountRecord')}</Text>
                </Pressable>
                <Pressable style={[styles.navigate, styles.active]}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>{t('recordHealthData.viewChart')}</Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {(dataChartHBA1C.length > 0 || dataChartCholesterol.length > 0) ? (
                    <View style={styles.chart}>
                        {dataChartHBA1C.length > 0 && (
                            <View>
                                <LineChart
                                    icon={IMAGE.RECORD_DATA.BLOOD}
                                    textTitle={t('evaluate.chartHBA1C')}
                                    textTitleToday={t('evaluate.valueHBA1CToday')}
                                    unit="%"
                                    textInfo={t('evaluate.safeHBA1C')}
                                    valueToday={hba1cDataToday?.toString()}
                                    labelElement="%"
                                    data={transformDataToChartHBA1C(dataChartHBA1C, '%')}
                                    tickValues={[0, 2, 4, 6, 8, 10]}
                                    backgroundProps={{ color: colors.primary, min: 4.5, max: 6.5 }}
                                />
                            </View>
                        )}
                        {dataChartCholesterol.length > 0 && (
                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <LineChart
                                    icon={IMAGE.RECORD_DATA.BLOOD}
                                    textTitle={t('evaluate.chartCholesterol')}
                                    textTitleToday={t('evaluate.valueCholesterolToday')}
                                    textInfo={t('evaluate.safeCholesterol')}
                                    unit="mg/DL"
                                    valueToday={cholesterolDataToday?.toString()}
                                    labelElement="%"
                                    data={transformDataToChartHBA1C(dataChartCholesterol, 'mg/DL')}
                                    tickValues={[100, 150, 200, 250, 300]}
                                    backgroundProps={{ color: colors.primary, min: 0, max: 200 }}
                                />
                            </View>
                        )}
                        <TwoLineChart
                            icon={IMAGE.RECORD_DATA.BLOOD}
                            labelElement="%"
                            textTitle={t('evaluate.chartBloodSugar')}
                            textInfoColor1={t('evaluate.safeBeforeMeal')}
                            textInfoColor2={t('evaluate.safeAfterMeal')}
                            detail={false}
                            data1={beforeEat}
                            data2={afterEat}
                            color1={colors.green}
                            color2={colors.orange_04}
                            tickValues={[0, 129, 159, 179, 199]}
                            unitDescription="mg/DL"
                            backgroundProps1={{ color: colors.green, min: 70, max: 99 }}
                            backgroundProps2={{ color: colors.orange_04, min: 70, max: 140 }}
                        />
                        {detailBloodSugar && <Text style={[styles.textTitleMedium, { marginTop: 20 }]}>{t("evaluate.bloodSugarToday")}</Text>}
                        {detailBloodSugar && (
                            <>
                                {detailBloodSugar.MORNING?.length > 0 && (
                                    <View style={[flexRowSpaceBetween, { alignItems: 'center', marginTop: 20 }]}>
                                        <Text style={styles.timeOfDayLabel}>{t('evaluate.morning')?.charAt(0)?.toUpperCase() + t('evaluate.morning')?.slice(1)}</Text>
                                        {detailBloodSugar.MORNING.map((data, index) => (
                                            <View key={index} style={[flexCenter, styles.bloodDetail]}>
                                                <Text style={styles.textBloodDetail}>
                                                    {data.typeTimeMeasure === TypeTimeMeasure.BEFORE_BREAKFAST ? t('recordHealthData.beforeBreakfast') : t('recordHealthData.afterBreakfast')}
                                                </Text>
                                                <Text style={styles.textBloodDetail}>{data.data}mg/DL</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                                {detailBloodSugar.LUNCH?.length > 0 && (
                                    <View style={[flexRowSpaceBetween, { alignItems: 'center', marginTop: 20 }]}>
                                        <Text style={styles.timeOfDayLabel}>{t('evaluate.lunch')?.charAt(0)?.toUpperCase() + t('evaluate.lunch')?.slice(1)}</Text>
                                        {detailBloodSugar.LUNCH.map((data, index) => (
                                            <View key={index} style={[flexCenter, styles.bloodDetail]}>
                                                <Text style={styles.textBloodDetail}>
                                                    {data.typeTimeMeasure === TypeTimeMeasure.BEFORE_LUNCH ? t('recordHealthData.beforeLunch') : t('recordHealthData.afterLunch')}
                                                </Text>
                                                <Text style={styles.textBloodDetail}>{data.data}mg/DL</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                                {detailBloodSugar.DINNER?.length > 0 && (
                                    <View style={[flexRowSpaceBetween, { alignItems: 'center', marginTop: 20 }]}>
                                        <Text style={styles.timeOfDayLabel}>{t('evaluate.dinner')?.charAt(0)?.toUpperCase() + t('evaluate.dinner')?.slice(1)}</Text>
                                        {detailBloodSugar.DINNER.map((data, index) => (
                                            <View key={index} style={[flexCenter, styles.bloodDetail]}>
                                                <Text style={styles.textBloodDetail}>
                                                    {data.typeTimeMeasure === TypeTimeMeasure.BEFORE_DINNER ? t('recordHealthData.beforeDinner') : t('recordHealthData.afterDinner')}
                                                </Text>
                                                <Text style={styles.textBloodDetail}>{data.data}mg/DL</Text>
                                            </View>
                                        ))}
                                    </View>
                                )}
                            </>
                        )}
                    </View>
                ) : (
                    <View style={{ height: HeightDevice, display: 'flex', alignItems: 'center', marginTop: 100 }}>
                        <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                        <Text style={styles.textTitle}>{t('recordHealthData.haven\'tEnteredAnyNumbers')}</Text>
                        <Text style={styles.textDesc}>{t('recordHealthData.enterNumberFirst')}</Text>
                        <Pressable onPress={navigateNumericalRecord} style={styles.button}>
                            <Text style={styles.textButton}>{t('recordHealthData.enterRecord')}</Text>
                        </Pressable>
                    </View>
                )}
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        paddingBottom: 100,
        backgroundColor: colors.background
    }, navigate: {
        height: 48,
        width: '50%'
    },
    active: {
        borderBottomWidth: 2,
        borderColor: colors.orange_04,
    },
    textNavigate: {
        textAlign: 'center',
        lineHeight: 48,
        fontWeight: '700',
        fontSize: 16
    },
    header: {
        paddingHorizontal: 20,
    },
    timeOfDayLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 20,
        color: colors.gray_G10,
        textAlign: "center",
    },
    textDesc: {
        fontWeight: '400',
        fontSize: 16,
        color: colors.gray_G06,
        textAlign: "center",
    },
    textButton: {
        fontWeight: "500",
        fontSize: 16,
        textAlign: "center",
        color: colors.white
    },
    button: {
        marginTop: 20,
        backgroundColor: colors.gray_G08,
        borderRadius: 8,
        paddingVertical: 17,
        width: 140
    },
    textError: {
        fontSize: 14,
        color: colors.red,
        fontWeight: "500"
    },
    chart: {
        backgroundColor: colors.background,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    textTitleMedium: {
        fontWeight: "500",
        fontSize: 16,
        color: colors.gray_G07,
        paddingLeft: 10,
        borderLeftWidth: 2,
        borderLeftColor: colors.orange_04,
    },
    bloodDetail: {
        borderRadius: 12,
        backgroundColor: colors.white,
        marginLeft: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        flex: 1
    },
    textBloodDetail: {
        fontWeight: "700",
        fontSize: 14,
        color: colors.gray_G07,
        textAlign: 'center',
    }

});

export default NumericalRecordChart;
