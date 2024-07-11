import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexRow, flexRowCenter } from '../../styles/flex';
import colors from '../../constant/color';
import WeeklyComponent from './conponent/weeklyComponent';
import { IMAGE } from '../../constant/image';
import { SCREENS_NAME } from '../../navigator/const';
import { chartService } from '../../services/charts';
import LoadingScreen from '../../component/loading';
import { valueWeight } from '../../constant/type/chart';
import LineChart from '../../component/line-chart-no-x';
import { weeklyReviewService } from '../../services/weeklyReviews';
import { extractDayAndMonth, formatDateRange, transformDataToChartNoX } from '../../util';

const WeeklyEvaluate = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [times, setTimes] = useState<string[]>([])
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.HOME.MAIN)
    };
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [dataChart, setDataChart] = useState<number[]>([])
    useEffect(() => {
        const getDataChart = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await chartService.getDataWeeklyReview();
                if (resData.code === 200) {
                    setIsLoading(false);
                    setDataChart(resData.result.percentage.reverse())
                    setTimes(resData.result.weekStart)
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
    useEffect(() => {
        const getDataTimes = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await weeklyReviewService.getWeeklyReviews();
                if (resData.code === 200) {
                    setIsLoading(false);
                    setTimes(resData.result)
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
        getDataTimes();
    }, []);
    console.log("data", dataChart)
    // console.log("time", extractDayAndMonth(times))
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={t('evaluate.view')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={flexRow}>
                <Pressable style={[styles.navigate, styles.active]}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                        {t('evaluate.week')}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.MONTHLY)}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('evaluate.month')}
                    </Text>
                </Pressable>
            </View>
            {times.length > 0 ? <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <LineChart
                        data={transformDataToChartNoX(dataChart)}
                        textTitle={t("evaluate.mediumChart")}
                        labelElement="사용X"
                        tickValues={[0, 33, 67, 100]}
                    />
                    <View style={{ marginBottom: 20, marginTop: 20 }}>
                        {times && times?.map((item, index) => {
                            return (
                                <WeeklyComponent key={index} time={item} isNew={index == 0 ? true : false} timeRender={`${formatDateRange(item)}`} />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
                :
                <View style={[flexRowCenter, { flexDirection: 'column', marginTop: 100 }]}>
                    <Image source={IMAGE.EVALUATE.CATEGORY} />
                    <Text style={[styles.textNavigate, { color: colors.gray_G08 }]}>{t("evaluate.noReview")}</Text>
                </View>
            }
            {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            {isLoading && <LoadingScreen />}
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
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
    content: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
    textError: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.red
    }
});

export default WeeklyEvaluate;
