import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';
import { HeightDevice } from '../../../../util/Dimenssion';
import { extractDayAndMonth, getMondayOfCurrentWeek, transformDataToChartWeight } from '../../../../util';
import LoadingScreen from '../../../../component/loading';
import { chartService } from '../../../../services/charts';
import LineChart from '../../../../component/line-chart';
import { valueBloodPressure } from '../../../../constant/type/chart';
import TwoLineChart from '../../../../component/twoLine-chart';
interface dataTypes {
    x: string,
    y: number,
    label?: string
}
const BloodPressureChart = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [dataSystoleChart, setDataSystoleChart] = useState<dataTypes[]>([])
    const [dataDiastoleChart, setDataDiastoleChart] = useState<dataTypes[]>([])
    //tam thu - cao
    const [systoleToday, setSystoleToday] = useState<number>(0)
    //tam trương - thap
    const [diastoleToday, setDiastoleToday] = useState<number>(0)
    const isEditable = route?.params?.isEditable;
    useLayoutEffect(() => {
        const getDataChart = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await chartService.getDataBloodPressure();
                if (resData.code === 200) {
                    setIsLoading(false);
                    const diaStoleData = resData.result.bloodPressureResponseList.map((item, index, array) => {
                        const dataPoint: dataTypes = {
                            x: extractDayAndMonth(item.date),
                            y: item.diastole,
                        };
                        if (index === array?.length - 1) {
                            dataPoint['label'] = `${item.diastole}`;
                        }
                        return dataPoint;
                    });
                    const systoleData = resData.result.bloodPressureResponseList.map((item, index, array) => {
                        const dataPoint: dataTypes = {
                            x: extractDayAndMonth(item.date),
                            y: item.systole,
                        };
                        if (index === array?.length - 1) {
                            dataPoint['label'] = `${item.systole}`;
                        }
                        return dataPoint;
                    });
                    setDataDiastoleChart(diaStoleData)
                    setDataSystoleChart(systoleData)
                    setSystoleToday(resData.result.systoleToday)
                    setDiastoleToday(resData.result.diastoleToday)
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } catch (error: any) {
                if (error?.response?.status === 400) {
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
    console.log("a", systoleToday)
    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    }
    const navigateNumericalRecord = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.BLOOD_PRESSURE, { isEditable: isEditable })
    }
    console.log("88", diastoleToday)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={t('common.diseases.highBlood')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={flexRow}>
                <Pressable
                    onPress={navigateNumericalRecord}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('recordHealthData.bloodPressureProfile')}
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
                    dataSystoleChart?.length > 0 || dataDiastoleChart?.length > 0 ?
                        (<View style={styles.chart}>
                            <TwoLineChart
                                icon={IMAGE.RECORD_DATA.THERMOMETER}
                                labelElement="%"
                                textTitle={t("evaluate.chartBlood")}
                                textInfoColor1={t("evaluate.minBlood")}
                                textInfoColor2={t("evaluate.maxBlood")}
                                data1={dataDiastoleChart}
                                data2={dataSystoleChart}
                                color1={colors.green}
                                color2={colors.orange_04}
                                detail={true}
                                tickValues={[0, 89, 139, 199]}
                                textDescription={t("evaluate.valueBloodToday")}
                                valueDescription1={diastoleToday}
                                valueDescription2={systoleToday}
                                unitDescription="mg/DL"
                                backgroundProps1={{
                                    color: colors.green,
                                    min: 60,
                                    max: 80,
                                }}
                                backgroundProps2={{
                                    color: colors.orange_04,
                                    min: 90,
                                    max: 120,
                                }}
                            />
                        </View>)
                        : (
                            <View style={{ height: HeightDevice, display: 'flex', alignItems: 'center', marginTop: 100 }}>
                                <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                                <Text style={styles.textTitle}>{t('recordHealthData.haven\'tEnteredAnyNumbers')}</Text>
                                <Text style={styles.textDesc}>{t('recordHealthData.enterNumberFirst')}</Text>
                                <Pressable
                                    onPress={navigateNumericalRecord}
                                    style={styles.button}>
                                    <Text style={styles.textButton}>{t('recordHealthData.enterRecord')}</Text>
                                </Pressable>
                            </View>
                        )
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
export default BloodPressureChart