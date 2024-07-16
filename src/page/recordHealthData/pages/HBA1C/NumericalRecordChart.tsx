import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';
import { HeightDevice } from '../../../../util/Dimenssion';
import BarChart from '../../../../component/bar-chart';
import LineChart from '../../../../component/line-chart';
import { chartService } from '../../../../services/charts';
import { extractDayAndMonth, getMondayOfCurrentWeek, transformDataToChartHBA1C } from '../../../../util';
import LoadingScreen from '../../../../component/loading';
import { valueBloodSugar, valueCardinal } from '../../../../constant/type/chart';

interface dataTypes {
    x: string,
    y: number,
    label?: string
}
const NumericalRecordChart = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const isEditable = route?.params?.isEditable;
    console.log("chart", isEditable)
    const [dataChartHBA1C, setDataChartHBA1C] = useState<valueCardinal[]>([])
    const [dataChartCholesterol, setDataCholesterol] = useState<valueCardinal[]>([])
    const [hba1cDataToday, setHba1cDataToday] = useState<number>()
    const [cholesterolDataToday, setCholesterolDataToday] = useState<number>()
    const [beforeEat, setBeforeEat] = useState<dataTypes[]>([])
    const [afterEat, setAfterEat] = useState<dataTypes[]>([])
    useEffect(() => {
        const getDataChart = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await chartService.getDataCardinal();
                console.log("r", resData)
                if (resData.code === 200) {
                    console.log("aaaa", resData.result.detailDataBloodSugar)
                    setIsLoading(false);
                    setDataCholesterol(resData.result.cholesterolList)
                    setDataChartHBA1C(resData.result.hba1cList)
                    setHba1cDataToday(resData.result.hba1cDataToday)
                    setCholesterolDataToday(resData.result.cholesterolDataToday)
                    const beforeEatData = resData.result.bloodSugarList.map((item, index, array) => {
                        const dataPoint: dataTypes = {
                            x: extractDayAndMonth(item.date),
                            y: item.beforeEat ?? 0,
                        };
                        if (index === array.length - 1) {
                            dataPoint['label'] = `${item.beforeEat}mg/DL`;
                        }
                        return dataPoint;
                    });
                    setBeforeEat(beforeEatData)
                    const afterEatData = resData.result.bloodSugarList.map((item, index, array) => {
                        const dataPoint: dataTypes = {
                            x: extractDayAndMonth(item.date),
                            y: item.afterEat ?? 0,
                        };
                        if (index === array.length - 1) {
                            dataPoint['label'] = `${item.afterEat}mg/DL`;
                        }
                        return dataPoint;
                    });
                    setAfterEat(afterEatData)
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } catch (error: any) {
                if (error?.response?.status === 400 || error?.response?.status === 401) {
                    setMessageError(error.response.data.message);
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        getDataChart();
    }, []);
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    }
    const navigateNumericalRecord = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD, { isEditable: isEditable })
    }
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
                <Pressable
                    onPress={navigateNumericalRecord}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('recordHealthData.bloodCountRecord')}
                    </Text>
                </Pressable>
                <Pressable style={[styles.navigate, styles.active]}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                        {t('recordHealthData.viewChart')}
                    </Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>

                {
                    dataChartHBA1C || dataChartCholesterol ?
                        <View style={styles.chart}>
                            <View>
                                <LineChart
                                    icon={IMAGE.RECORD_DATA.BLOOD}
                                    textTitle={t("evaluate.chartHBA1C")}
                                    textTitleToday={t("evaluate.valueHBA1CToday")}
                                    unit='%'
                                    textInfo={t("evaluate.safeHBA1C")}
                                    valueToday={hba1cDataToday?.toString()}
                                    labelElement="%"
                                    data={transformDataToChartHBA1C(dataChartHBA1C, "%")}
                                    tickValues={[0, 2, 4, 6, 8, 10]}
                                    // chưa xét
                                    backgroundProps={{
                                        color: colors.primary,
                                        height: 35,//chưa biết đang fix theo figma
                                        y: 70,
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <LineChart
                                    icon={IMAGE.RECORD_DATA.BLOOD}
                                    textTitle={t("evaluate.chartCholesterol")}
                                    textTitleToday={t("evaluate.valueCholesterolToday")}
                                    textInfo={t("evaluate.safeCholesterol")}
                                    unit="mg/DL"
                                    valueToday={cholesterolDataToday?.toString()}
                                    labelElement="%"
                                    data={transformDataToChartHBA1C(dataChartCholesterol, "mg/DL")}
                                    tickValues={[100, 150, 200, 250, 300]}
                                    // chưa xét
                                    backgroundProps={{
                                        color: colors.primary,
                                        height: 60,//chưa biết đang fix theo figma
                                        y: 23,
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <LineChart
                                    icon={IMAGE.RECORD_DATA.BLOOD}
                                    textTitle={t("evaluate.chartBloodSugar")}
                                    textTitleToday={t("evaluate.valueBloodSugarToday")}
                                    textInfo={t("evaluate.safeBeforeMeal")}
                                    unit="mg/DL"
                                    // valueToday={cholesterolDataToday?.toString()}
                                    labelElement="%"
                                    data={beforeEat}
                                    tickValues={[0, 129, 179, 229]}
                                    // chưa xét
                                    backgroundProps={{
                                        color: colors.primary,
                                        height: 20,//chưa biết đang fix theo figma
                                        y: 80,
                                    }}
                                />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <LineChart
                                    icon={IMAGE.RECORD_DATA.BLOOD}
                                    textTitle={t("evaluate.chartBloodSugar")}
                                    textTitleToday={t("evaluate.valueBloodSugarToday")}
                                    textInfo={t("evaluate.safeAfterMeal")}
                                    unit="mg/DL"
                                    // valueToday={cholesterolDataToday?.toString()}
                                    labelElement="%"
                                    data={afterEat}
                                    tickValues={[0, 129, 179, 229]}
                                    // chưa xét
                                    backgroundProps={{
                                        color: colors.primary,
                                        height: 30,//chưa biết đang fix theo figma
                                        y: 65,
                                    }}
                                />
                            </View>
                        </View>

                        :
                        <View style={[flexCenter, { height: '60%' }]}>
                            <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                            <Text style={styles.textTitle}>{t('recordHealthData.haven\'tEnteredAnyNumbers')}</Text>
                            <Text style={styles.textDesc}>{t('recordHealthData.enterNumberFirst')}</Text>
                            <Pressable
                                onPress={navigateNumericalRecord}
                                style={styles.button}>
                                <Text style={styles.textButton}>{t('recordHealthData.enterRecord')}</Text>
                            </Pressable>
                        </View>
                }
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        paddingBottom: 100
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
    }
})
export default NumericalRecordChart