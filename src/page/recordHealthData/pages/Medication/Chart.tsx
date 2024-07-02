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
import LoadingScreen from '../../../../component/loading';
import { planService } from '../../../../services/plan';
import { chartService } from '../../../../services/charts';
import { getMondayOfCurrentWeek, getValueMaxChartStep, transformDataToChartStep } from '../../../../util';
import LineChart from '../../../../component/line-chart';
import { valueSteps } from '../../../../constant/type/chart';

const MedicationChart = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [checkIsExits, setCheckIsExits] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [dataChart, setDataChart] = useState<valueSteps[]>([])
    const [doneToday, setDoneToday] = useState<number>(0)
    const [totalToday, setTotalToday] = useState<number>(0)
    useEffect(() => {
        const getDataChart = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await chartService.getDataMedicine();
                if (resData.code === 200) {
                    setIsLoading(false);
                    setDataChart(resData.result.medicineResponseList)
                    setDoneToday(resData.result.doneToday)
                    setTotalToday(resData.result.totalToday)
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
        navigation.goBack()
    }
    const navigateNumericalRecord = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_RECORD)
    }
    console.log("61", transformDataToChartStep(dataChart, "%"))
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        text={t('planManagement.text.takingMedication')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable
                        onPress={navigateNumericalRecord}
                        style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('recordHealthData.medicationProfile')}
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.viewChart')}
                        </Text>
                    </Pressable>
                </View>
                {
                    dataChart.length > 0 ?
                        <View style={styles.chart}>
                            <LineChart
                                icon={IMAGE.PLAN_MANAGEMENT.MEDICATION1}
                                textTitleMedium={t("evaluate.numberMedicineToday")}
                                unit={t("evaluate.times")}
                                valueMedium={`${doneToday}/${totalToday}`}
                                labelElement="%"
                                textTitle={t("evaluate.chartMedicine")}
                                data={transformDataToChartStep(dataChart, "%")}
                                domainY={[0, getValueMaxChartStep(dataChart)]}
                            />
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
        height: HeightDevice
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
        fontSize: 18,
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
export default MedicationChart