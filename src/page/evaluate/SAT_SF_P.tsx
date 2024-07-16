import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../component/header-navigator'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useSSR, useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../../constant/color';
import Question from './conponent/Question';
import { SCREENS_NAME } from '../../navigator/const';
import LoadingScreen from '../../component/loading';
import { questionRes, resultQuestionRes } from '../../constant/type/question';
import { monthlyQuestionService } from '../../services/monthlyQuestion';
import { TypeQuestion } from '../../constant';

interface questionType {
    id: number,
    title: string
}
const SAT_SF_P = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const time = route?.params?.time
    const dataSF_C = route?.params?.data
    const reviewMode = route?.params?.reviewMode;
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState<string>("")
    const [listQuestionsResult, setListQuestionsResult] = useState<resultQuestionRes[]>([])
    const goBackPreviousPage = () => {
        navigation.goBack();
    };
    const [listQuestions, setListQuestions] = useState<questionRes[]>([])
    const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

    const handleSelectAnswer = (questionId: number, answerIndex: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    };
    const nextPage = () => {
        if (reviewMode) {
            navigation.navigate(SCREENS_NAME.EVALUATE.SAT_SF_I, { time, reviewMode: true });
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
            navigation.navigate(SCREENS_NAME.EVALUATE.SAT_SF_I, { time, data: [...dataSF_C, ...data] })
        }
    }
    useEffect(() => {
        const getListQuestion = async () => {
            setIsLoading(true)
            try {
                const res = await monthlyQuestionService.getListQuestion(TypeQuestion.SAT_SF_P)
                if (res.code === 200) {
                    setErrorMessage("");
                    setIsLoading(false)
                    setListQuestions(res.result.formMonthlyQuestionDTOList)
                    setType(res.result.type)
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
        const getListQuestionResult = async () => {
            setIsLoading(true);
            try {
                const res = await monthlyQuestionService.getResultListQuestion(time, TypeQuestion.SAT_SF_P);
                if (res.code === 200) {
                    setErrorMessage("");
                    setListQuestionsResult(res.result)
                    setType(res.result[0].type)
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
        };
        if (reviewMode) {
            getListQuestionResult()
        } else {
            getListQuestion();
        }
    }, [])

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
                        <Text style={[styles.text, { color: colors.gray_G08, marginTop: 5 }]}>다음은 자기 주도적으로 위기를 극복하고, 긍정적으로 성장하기 위해 , 삶의 목표와 구체적인 계획을 세울 때 사용할 수 있는 준비전략과 관련된 평가입니다. 각 문항들을 읽고, 귀하가 얼마나 잘 해왔는지를 가장 가깝다고 생각되는 부분에 체크해주십시오</Text>
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
                    disabled={Object.keys(answers).length !== listQuestions.length}
                    onPress={nextPage}
                    style={[styles.button, { backgroundColor: Object.keys(answers).length === listQuestions.length ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: Object.keys(answers).length === listQuestions.length ? colors.white : colors.gray_G04 }]}>{t('common.text.next')}</Text>
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

export default SAT_SF_P