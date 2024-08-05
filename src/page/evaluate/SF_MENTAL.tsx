import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../component/header-navigator'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useSSR, useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../../constant/color';
import Question from './conponent/Question';
import { SCREENS_NAME } from '../../navigator/const';
import { questionRes, resultQuestionRes } from '../../constant/type/question';
import { monthlyQuestionService } from '../../services/monthlyQuestion';
import { TypeQuestion } from '../../constant';
import LoadingScreen from '../../component/loading';

interface questionType {
    id: number,
    title: string
}
const SF_MENTAL = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const time = route?.params?.time
    const dataSF_I = route?.params?.data
    const goBackPreviousPage = () => {
        navigation.goBack();
    };
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const reviewMode = route?.params?.reviewMode;
    const [listQuestions, setListQuestions] = useState<questionRes[]>([])
    const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});
    const [type, setType] = useState<string>("")
    const [listQuestionsResult, setListQuestionsResult] = useState<resultQuestionRes[]>([])

    useEffect(() => {
        const getListQuestion = async () => {
            setIsLoading(true)
            try {
                const res = await monthlyQuestionService.getListQuestion(TypeQuestion.SF_MENTAL)
                if (res.code === 200) {
                    setErrorMessage("");
                    setIsLoading(false)
                    setListQuestions(res.result.formMonthlyQuestionDTOList)
                    setType(res.result.type)
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
        const getListQuestionResult = async () => {
            setIsLoading(true);
            try {
                const res = await monthlyQuestionService.getResultListQuestion(time, TypeQuestion.SF_MENTAL);
                if (res.code === 200) {
                    setErrorMessage("");
                    setListQuestionsResult(res.result)
                    setType(res.result[0].type)
                } else {
                    setErrorMessage("Unexpected error occurred.");
                }
            } catch (error: any) {
                if (error?.response?.status === 400) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage("Unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        if (reviewMode) {
            getListQuestionResult()
        } else {
            getListQuestion();
        }
    }, [])
    const handleSelectAnswer = (questionId: number, answerIndex: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    };
    const nextPage = () => {
        if (reviewMode) {
            navigation.navigate(SCREENS_NAME.EVALUATE.SF_ACTIVITY, { time, reviewMode: true });
        } else {
            const data = listQuestions.map((item) => {
                return {
                    monthNumber: time,
                    monthlyRecordType: type,
                    questionNumber: item.questionNumber,
                    question: item.question,
                    answer: answers[item.questionNumber]
                }
            })
            navigation.navigate(SCREENS_NAME.EVALUATE.SF_ACTIVITY, { time, data: [...dataSF_I, ...data] })
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={`${time}월 실천평가`}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={styles.line}></View>
            <ScrollView style={styles.scrollView} contentContainerStyle={{ paddingBottom: 80 }} >
                <View style={styles.content}>
                    <View style={styles.introduce}>
                        <Text style={[styles.text, { color: colors.orange_04 }]}>{type}</Text>
                        <Text style={[styles.text, { color: colors.gray_G08, marginTop: 5 }]}>{t("evaluate.sfActivity1")}</Text>
                        <Text style={[styles.text, { color: colors.gray_G08, marginTop: 5 }]}>{t("evaluate.sfActivity2")}</Text>
                    </View>
                    {listQuestions && listQuestions.map((item) => {
                        return (
                            <Question
                                question={item}
                                key={item.questionNumber}
                                selectedAnswer={answers[item.questionNumber]}
                                onSelectAnswer={handleSelectAnswer}
                            />
                        )
                    })}
                    {reviewMode && listQuestionsResult.map((item) => (
                        <Question
                            question={item}
                            key={item.questionNumber}
                            selectedAnswer={answers[item.questionNumber]}
                            onSelectAnswer={handleSelectAnswer}
                            answerResult={item.answer}
                            reviewMode={reviewMode}
                        />
                    ))}
                </View>
                {messageError && !isLoading && <Text style={[styles.text, { color: colors.red }]}>{messageError}</Text>}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={Object.keys(answers)?.length !== listQuestions?.length}
                    onPress={nextPage}
                    style={[styles.button, { backgroundColor: Object.keys(answers)?.length === listQuestions?.length ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: Object.keys(answers)?.length === listQuestions?.length ? colors.white : colors.gray_G04 }]}>{t('common.text.next')}</Text>
                </Pressable>
            </View>
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
    },
    header: {
        paddingHorizontal: 20,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    text: {
        fontWeight: "500",
        fontSize: 16,
    },
    line: {
        height: 1,
        backgroundColor: colors.gray_G02
    },
    introduce: {
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.gray_G02,
        marginBottom: 10
    },
    button: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 12,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    textButton: {
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
    },
})

export default SF_MENTAL