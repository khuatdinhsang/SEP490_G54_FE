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
import { chartService } from '../../../../services/charts';
import LoadingScreen from '../../../../component/loading';
import LineChart from '../../../../component/line-chart';
import { valueActivity, valueSteps } from '../../../../constant/type/chart';
import { convertMinutesToHours, getType, setType, transformDataToChartActivity } from '../../../../util';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkOutChart = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [dataChart, setDataChart] = useState<valueActivity[]>([])
    const [dataToday, setDataToday] = useState<number>(0)
    const isEditable = route?.params?.isEditable;
    const [lang, setLang] = useState<string>("")
    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    }
    const [typeToday, setTypeToday] = useState<string>("")
    const navigateNumericalRecord = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.WORK_OUT_RECORD, { isEditable: isEditable });
    }
    useEffect(() => {
        const getDataChart = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const langAys = await AsyncStorage.getItem("language") ?? "en"
                setLang(langAys)
                const resData = await chartService.getDataActivity();
                if (resData.code === 200) {
                    setIsLoading(false);
                    setDataChart(resData.result.activityResponseList)
                    setDataToday(resData.result.durationToday)
                    setTypeToday(resData.result.typeToDay ?? 0)
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
    const maxValue = Math.max(...dataChart.map(item => convertMinutesToHours(item.duration)));
    console.log("59", maxValue)
    const tickValues = [0, 1, 2, 3, 4];

    if (maxValue > 5) {
        tickValues.push(maxValue);
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={t('planManagement.text.workout')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={flexRow}>
                <Pressable
                    onPress={navigateNumericalRecord}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('recordHealthData.workoutProfile')}
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
                    dataChart?.length > 0 ?
                        <View style={styles.chart}>
                            <LineChart
                                icon={IMAGE.PLAN_MANAGEMENT.HUMAN}
                                textTitleMedium={t("evaluate.resultActivityToday")}
                                unit={t("common.text.hours")}
                                valueMedium={`${setType(getType(typeToday, lang), lang)}/${convertMinutesToHours(dataToday)?.toString()}`}
                                labelElement={t("common.text.hours")}
                                textTitle={t("evaluate.chartActivity")}
                                data={transformDataToChartActivity(dataChart, lang)}
                                tickValues={tickValues}
                                note1={{ text: "LIGHT", des: "L" }}
                                note2={{ text: "MEDIUM", des: "M" }}
                                note3={{ text: "HEAVY", des: "H" }}
                                lang={lang}
                            />
                        </View>
                        :
                        <View style={[flexCenter, { marginTop: 100 }]}>
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
        flex: 1,
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
export default WorkOutChart