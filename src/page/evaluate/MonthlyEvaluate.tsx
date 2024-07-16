import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexRow, flexRowCenter } from '../../styles/flex';
import colors from '../../constant/color';
import WeeklyComponent from './conponent/weeklyComponent';
import { IMAGE } from '../../constant/image';
import MonthComponent from './conponent/monthlyComponent';
import { SCREENS_NAME } from '../../navigator/const';
import LoadingScreen from '../../component/loading';
import { monthlyQuestionService } from '../../services/monthlyQuestion';
import { listMonthNumberRes } from '../../constant/type/question';
import MonthlyChart from '../../component/monthly-chart';
import { chartService } from '../../services/charts';
import { convertToChart1Monthly, convertToChart2Monthly } from '../../util';

const MonthEvaluate = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const goBackPreviousPage = () => {
        navigation.goBack();
    };
    const [data, setData] = useState<listMonthNumberRes[]>([])
    const [chartOne, setChartOne] = useState<any>([])
    const [chartTwo, setChartTwo] = useState<any>([])
    const getListNumber = async () => {
        setIsLoading(true)
        try {
            const res = await monthlyQuestionService.getListMonthNumber()
            console.log("31", res)
            if (res.code === 200) {
                setErrorMessage("");
                setIsLoading(false)
                setData(res.result)
                try {
                    const resData = await chartService.monthlyQuestionChart();
                    if (resData.code === 200) {
                        setChartOne(convertToChart1Monthly(resData.result))
                        setChartTwo(convertToChart2Monthly(resData.result))
                    } else {
                        setErrorMessage("Unexpected error occurred.");
                    }
                } catch (error: any) {
                    if (error?.response?.status === 400 || error?.response?.status === 401) {
                        setErrorMessage(error.response.data.message);
                    } else {
                        setErrorMessage("Unexpected error occurred.");
                    }
                } finally {
                    setIsLoading(false);
                }
            } else {
                setErrorMessage("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 401) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Unexpected error occurred.");
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    // useFocusEffect(
    //     useCallback(() => {
    //         getListNumber();
    //     }, [])
    // );
    useEffect(() => {
        getListNumber();
    }, [])
    console.log("79", chartOne)
    console.log("80", chartTwo)
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
                <Pressable
                    onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.WEEKLY)}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('evaluate.week')}
                    </Text>
                </Pressable>
                <Pressable style={[styles.navigate, styles.active]}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                        {t('evaluate.month')}
                    </Text>
                </Pressable>
            </View>
            {data.length > 0 ? (
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.scrollView}>
                    <View style={{ paddingTop: 20 }}>
                        <MonthlyChart
                            textTitle={"건강 경영 전략 변화 그래프"}
                            data={chartOne}
                            tickValues={[0, 20, 40, 60, 80, 100]}
                        />
                    </View>
                    <View style={{ paddingTop: 20 }}>
                        <MonthlyChart
                            textTitle={"건강 경영 전략 변화 그래프"}
                            data={chartTwo}
                            tickValues={[0, 20, 40, 60, 80, 100]}
                        />
                    </View>
                    <View style={styles.content}>
                        {data.map((item, index) => (
                            <MonthComponent
                                key={index}
                                data={item}
                            />
                        ))}
                    </View>
                </ScrollView>
            ) : (
                <View style={[flexRowCenter, { flexDirection: 'column', flex: 1 }]}>
                    <Image source={IMAGE.EVALUATE.CATEGORY} />
                    <Text style={[styles.textNavigate, { color: colors.gray_G08 }]}>
                        {t("evaluate.noReview")}
                    </Text>
                </View>
            )}
            {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
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
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
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
        paddingTop: 30,
    },
    textError: {
        fontSize: 14,
        color: colors.red,
        fontWeight: "500"
    }
});

export default MonthEvaluate;
