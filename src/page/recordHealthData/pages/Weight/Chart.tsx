import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';
import { HeightDevice } from '../../../../util/Dimenssion';
import { chartService } from '../../../../services/charts';
import LoadingScreen from '../../../../component/loading';
import LineChart from '../../../../component/line-chart';
import { dataChartWeightResponse, valueWeight } from '../../../../constant/type/chart';
import { transformDataToChartWeight } from '../../../../util';

const WeightChart = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const isEditable = route?.params?.isEditable;
    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    };
    const navigateNumericalRecord = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.WEIGHT, { isEditable: isEditable });
    };
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [dataChart, setDataChart] = useState<valueWeight[]>([]);
    const [mediumData, setMediumData] = useState<number>(0);
    const [dataToday, setDataToday] = useState<number>(0);
    useEffect(() => {
        const getDataChart = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await chartService.getDataWeight();
                if (resData.code === 200) {
                    setIsLoading(false);
                    setDataChart(resData.result.weightResponseList);
                    setMediumData(resData.result.avgValue);
                    setDataToday(resData.result.valueToday)
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
    const maxValue = Math.max(...dataChart.map(item => item.value));
    const tickValues = [0, 20, 40, 60, 80, 100];

    if (maxValue > 110) {
        tickValues.push(maxValue);
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        text={t('recordHealthData.weight')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable
                        onPress={navigateNumericalRecord}
                        style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('recordHealthData.weightProfile')}
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.viewChart')}
                        </Text>
                    </Pressable>
                </View>
                {
                    dataChart?.length > 0 ?
                        <View style={styles.chart}>
                            <LineChart
                                icon={IMAGE.RECORD_DATA.CHART}
                                textTitleMedium={t('evaluate.mediumWeight')}
                                valueMedium={mediumData?.toString()}
                                unit='kg'
                                labelElement="%"
                                textTitleToday={t('evaluate.weightToday')}
                                valueToday={dataToday?.toString()}
                                textTitle={t("evaluate.chartWeight")}
                                data={transformDataToChartWeight(dataChart, "kg")}
                                tickValues={tickValues}
                                textInfo={t("evaluate.normalWeightRange")}
                                // chua xets theo figma
                                backgroundProps={{
                                    color: colors.primary,
                                    height: 40,
                                    y: 70,
                                }}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        height: HeightDevice,
    },
    navigate: {
        height: 48,
        width: '50%',
    },
    active: {
        borderBottomWidth: 2,
        borderColor: colors.orange_04,
    },
    textNavigate: {
        textAlign: 'center',
        lineHeight: 48,
        fontWeight: '700',
        fontSize: 16,
    },
    header: {
        paddingHorizontal: 20,
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 20,
        color: colors.gray_G10,
        textAlign: 'center',
    },
    textDesc: {
        fontWeight: '400',
        fontSize: 16,
        color: colors.gray_G06,
        textAlign: 'center',
    },
    textButton: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
        color: colors.white,
    },
    button: {
        marginTop: 20,
        backgroundColor: colors.gray_G08,
        borderRadius: 8,
        paddingVertical: 17,
        width: 140,
    },
    textError: {
        fontSize: 14,
        color: colors.red,
        fontWeight: '500',
    },
    chart: {
        backgroundColor: colors.background,
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
    },
});

export default WeightChart;
