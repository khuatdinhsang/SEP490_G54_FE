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
import { convertToChart1Monthly, convertToChart1SAT, convertToChart1SF, convertToChart2Monthly, convertToChart2SAT, convertToChart2SF, convertToChart3SAT, convertToChart3SF, convertToChart4SAT, convertToChart4SF, convertToChart5SAT, convertToChart5SF, TransformedData } from '../../util';
import DescriptionColor from './conponent/descriptionColor';
import MonthlyChartEvaluate from './conponent/chart';

const SF_Evaluate = ({ route }: any) => {
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
    const goBackPreviousPage = () => {
        navigation.goBack();
    };
    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.EVALUATE.MONTHLY)
    }
    const getListNumber = async () => {
        setIsLoading(true)
        try {
            const res = await monthlyQuestionService.getChartSF(time)
            if (res.code === 200) {
                setErrorMessage("");
                setIsLoading(false)
                setChartOne(convertToChart1SF(res.result))
                setChartTwo(convertToChart2SF(res.result))
                setChartThree(convertToChart3SF(res.result))
                setChartFour(convertToChart4SF(res.result))
                setChartFive(convertToChart5SF(res.result))
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
    useEffect(() => {
        getListNumber()
    }, [])
    console.log("d1", chartFour)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconXRight={true}
                    isIconLeft={true}
                    text={`${time}월 결과`}
                    handleClickIconRight={() => navigation.navigate(SCREENS_NAME.EVALUATE.MONTHLY)}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.scrollView}>
                <View style={[styles.content, styles.shadowBox]}>
                    <View>
                        <Text style={styles.textTitle}>건강 경영 전략</Text>
                        <Text style={[styles.textAva, { marginTop: 10, marginBottom: 20 }]}>종합</Text>
                        <DescriptionColor />
                        <MonthlyChartEvaluate
                            data={chartOne}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.textAva, { marginTop: 10 }]}>긍정적인 마음</Text>
                        <Text style={[styles.textBva, { marginTop: 10, marginBottom: 20 }]}>질병 진행에 대한 두려움, 대인관계에 대한 걱정스러운 마음 등의 감정들을 극복하고 더 건강한 삶을살아가기 위해 긍정적인 마음 가지기를 얼마나 실천하고 있는지 평가한 결과입니다.</Text>
                        <DescriptionColor />
                        <MonthlyChartEvaluate
                            data={chartTwo}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.textAva, { marginTop: 10, }]}>운동</Text>
                        <Text style={[styles.textBva, { marginTop: 10, marginBottom: 20 }]}>더 건강한 삶을 살아가기 위해 규칙적인 운동하기를얼마나 실천하고 있는지 평가한 결과입니다.</Text>
                        <DescriptionColor />
                        <MonthlyChartEvaluate
                            data={chartThree}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.textAva, { marginTop: 10, }]}>식이</Text>
                        <Text style={[styles.textBva, { marginTop: 10, marginBottom: 20 }]}>건강을 유지하기 위해 건강한 음식을 바르게 먹고있는지 평가한 결과입니다.</Text>
                        <DescriptionColor />
                        <MonthlyChartEvaluate
                            data={chartFour}
                            tickValues={[0, 33, 67, 100]}
                        />
                    </View>
                    <View>
                        <Text style={[styles.textAva, { marginTop: 10, }]}>약물</Text>
                        <Text style={[styles.textBva, { marginTop: 10, marginBottom: 20 }]}>바르게 약물을 복용하고 있는지, 약물 복용을 꾸준히 실천하고 있는지 평가한 결과입니다.</Text>
                        <DescriptionColor />
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
        textAlign: 'center'
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
});

export default SF_Evaluate;
