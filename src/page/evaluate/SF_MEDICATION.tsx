import React, { useEffect, useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../component/header-navigator'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useSSR, useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../../constant/color';
import Question from './conponent/Question';
import { SCREENS_NAME } from '../../navigator/const';
import { questionRes } from '../../constant/type/question';
import { monthlyQuestionService } from '../../services/monthlyQuestion';
import { TypeQuestion } from '../../constant';
import LoadingScreen from '../../component/loading';

interface questionType {
    id: number,
    title: string
}
const SF_MEDICATION = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const time = route?.params?.time
    const dataSF_DIET = route?.params?.data
    const goBackPreviousPage = () => {
        navigation.goBack();
    };
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)

    const [listQuestions, setListQuestions] = useState<questionRes[]>([])
    const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});
    const [type, setType] = useState<string>("")
    useEffect(() => {
        const getListQuestion = async () => {
            setIsLoading(true)
            try {
                const res = await monthlyQuestionService.getListQuestion(TypeQuestion.SF_MEDICATION)
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
        getListQuestion()
    }, [])
    const handleSelectAnswer = (questionId: number, answerIndex: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    };
    const nextPage = async (): Promise<void> => {
        const dataList = listQuestions.map((item) => {
            return {
                monthNumber: time,
                monthlyRecordType: type,
                questionNumber: item.questionNumber,
                question: item.question,
                answer: answers[item.questionNumber]
            }
        })
        const data = [...dataList, ...dataSF_DIET]
        setIsLoading(true)
        try {
            const res = await monthlyQuestionService.postListQuestion(data)
            if (res.code == 201) {
                setIsLoading(false);
                navigation.navigate(SCREENS_NAME.EVALUATE.SUCCESS_SURVEY)
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
            setIsLoading(false)
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
                        <Text style={[styles.text, { color: colors.gray_G08, marginTop: 5 }]}>‘효과적인 건강 행동 패턴(Highly Effective Health Behavior Pattern)’이란 건강 습관을 만들기 위해서 6개월 이상 반복해야 하는 건강 행동을 말합니다.</Text>
                        <Text style={[styles.text, { color: colors.gray_G08, marginTop: 5 }]}>다음은 ‘긍정적 마음 가지기'에 해당하는 건강 행동 패턴 문항입니다.  다음 문항들을 읽고 지난 한달간의 본인의 행동에 가장 알맞는 항목에  O 표시하세요.</Text>
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

export default SF_MEDICATION