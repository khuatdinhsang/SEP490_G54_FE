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
import { convertToChart1Monthly, convertToChart1SAT, convertToChart2Monthly, convertToChart2SAT, convertToChart3SAT, convertToChart4SAT, convertToChart5SAT, TransformedData } from '../../util';
import DescriptionColor from './conponent/descriptionColor';
import MonthlyChartEvaluate from './conponent/chart';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAT_Evaluate = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const time = route?.params?.time
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [chartOne, setChartOne] = useState<TransformedData[]>([])
    const [chartTwo, setChartTwo] = useState<TransformedData[]>([])
    const [chartThree, setChartThree] = useState<TransformedData[]>([])
    const [chartFour, setChartFour] = useState<TransformedData[]>([])
    const [chartFive, setChartFive] = useState<TransformedData[]>([])
    const [lang, setLang] = useState<string>("")
    console.log("35", chartFive)
    const goBackPreviousPage = () => {
        navigation.goBack();
    };
    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.EVALUATE.SF_EVALUATE, { time })
    }
    const getListNumber = async () => {
        setIsLoading(true)
        try {
            const langAys = await AsyncStorage.getItem("language") ?? "en"
            setLang(langAys)
            const res = await monthlyQuestionService.getChartSAT(time)
            if (res.code === 200) {
                setErrorMessage("");
                setIsLoading(false)
                setChartOne(convertToChart1SAT(res.result, t, langAys))
                setChartTwo(convertToChart2SAT(res.result, t, langAys))
                setChartThree(convertToChart3SAT(res.result, t, langAys))
                setChartFour(convertToChart4SAT(res.result, t, langAys))
                setChartFive(convertToChart5SAT(res.result, t, langAys))

            } else {
                setErrorMessage("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Unexpected error occurred.");
            }
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getListNumber()
    }, [])
    const convertTime = () => {
        let text = ""
        switch (time) {
            case 0:
                text = `${t("lesson.week1")} ${t("evaluate.results")}`
                break;
            default:
                text = `${lang === 'en' ? '#' : ''}${time}${t("evaluate.monthlyResults")}`
                break;
        }
        return text
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconXRight={true}
                    text={convertTime()}
                    handleClickIconRight={goBackPreviousPage}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.scrollView}>
                <View style={[styles.content, styles.shadowBox]}>
                    <View>
                        <Text style={styles.textTitle}>{t("evaluate.managementStrategy")}</Text>
                        <Text style={[styles.textAva, { marginTop: 10, marginBottom: 20 }]}>{t("evaluate.synthesis")}</Text>
                        <DescriptionColor />
                        {lang === 'en' && <View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.coreCompetencies")}{" "}:{" "}{"CC"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.preparationCompetencies")}{" "}:{" "}{"PC"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.executionStrategy")}{" "}:{" "}{"ES"}</Text>
                            </View>
                        </View>
                        }
                        <MonthlyChartEvaluate
                            data={chartOne}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.textAva, { marginTop: 10 }]}>{t("evaluate.coreCompetencies")}</Text>
                        <Text style={[styles.textBva, { marginTop: 10, marginBottom: 20 }]}>{t("evaluate.coreStrategies")}</Text>
                        <DescriptionColor />
                        {lang === 'en' && <View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.selfDirectedness")}{" "}:{" "}{"SD"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.positiveThinking")}{" "}:{" "}{"ST"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.formSupport")}{" "}:{" "}{"FSR"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.shareExperience")}{" "}:{" "}{"SSE"}</Text>
                            </View>
                        </View>
                        }
                        <MonthlyChartEvaluate
                            data={chartTwo}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.textAva, { marginTop: 10, }]}>{t("evaluate.coreCompetencies")}</Text>
                        <Text style={[styles.textBva, { marginTop: 10, marginBottom: 20 }]}>{t("evaluate.proactivelyOvercome")}</Text>
                        <DescriptionColor />
                        {lang === 'en' && <View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.pursingLife")}{" "}:{" "}{"PLV"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.settingGoal")}{" "}:{" "}{"SG/A"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.rational")}{" "}:{" "}{"RDM"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.priority")}{" "}:{" "}{"PCP"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.create")}{" "}:{" "}{"CHE"}</Text>
                            </View>
                        </View>
                        }
                        <MonthlyChartEvaluate
                            data={chartThree}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.textAva, { marginTop: 10, }]}>{t("evaluate.executionStrategy")}</Text>
                        <Text style={[styles.textBva, { marginTop: 10, marginBottom: 20 }]}>{t("evaluate.plansAction")}</Text>
                        <DescriptionColor />
                        {lang === 'en' && <View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.selfDirection")}{" "}:{" "}{"SD"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.stressManagement")}{" "}:{" "}{"SM"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.persistent")}{" "}:{" "}{"PE"}</Text>
                            </View>
                        </View>
                        }
                        <MonthlyChartEvaluate
                            data={chartFour}
                            tickValues={[0, 33, 67, 100]}
                        />
                        {lang === 'en' && <View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.energy")}{" "}:{" "}{"EC"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.selfMotivation")}{" "}:{" "}{"SM"}</Text>
                            </View>
                            <View style={[styles.legendItem, { marginRight: 10 }]}>
                                <View style={[styles.des, { backgroundColor: colors.gray_G03 }]} />
                                <Text style={styles.textDes}>{t("evaluate.checkUp")}{" "}:{" "}{"CU"}</Text>
                            </View>
                        </View>
                        }
                        <MonthlyChartEvaluate
                            data={chartFive}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                </View>
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={nextPage}
                    style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={[styles.text, { color: colors.white }]}> {t('common.text.next')}</Text>
                </Pressable>
            </View>
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
    header: {
        paddingHorizontal: 20,
    },
    textError: {
        fontSize: 14,
        color: colors.red,
        fontWeight: "500"
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
    content: {
        backgroundColor: colors.white,
        borderRadius: 16,
        marginTop: 20
    },
    textTitle: {
        fontWeight: "700",
        fontSize: 20,
        color: colors.gray_G10,
    },
    textAva: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.gray_G08
    },
    textBva: {
        fontWeight: "500",
        fontSize: 16,
        color: colors.gray_G07
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        backgroundColor: colors.background,
        paddingVertical: 10,
    },
    button: {
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
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

export default SAT_Evaluate;
