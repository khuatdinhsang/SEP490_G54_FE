import React, { useState } from 'react'
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../component/header-navigator'
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { useSSR, useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import colors from '../../constant/color';
import Question from './conponent/Question';
import { SCREENS_NAME } from '../../navigator/const';

interface questionType {
    id: number,
    title: string
}
const SAT_SF_I = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const { time } = route.params
    const goBackPreviousPage = () => {
        navigation.goBack();
    };

    const initQuestion = [
        { id: 1, title: '절망적인 상황에서도 모든 가능성을 열어놓고 긍정적으로 받아들였다.' },
        { id: 2, title: '절망적인 상황에서도 모든 가능성을 열어놓고 긍정적으로 받아들였다.' },
        { id: 3, title: '절망적인 상황에서도 모든 가능성을 열어놓고 긍정적으로 받아들였다.' },
        { id: 4, title: '절망적인 상황에서도 모든 가능성을 열어놓고 긍정적으로 받아들였다.' },
        { id: 5, title: '절망적인 상황에서도 모든 가능성을 열어놓고 긍정적으로 받아들였다.' },
        { id: 6, title: '절망적인 상황에서도 모든 가능성을 열어놓고 긍정적으로 받아들였다.' },
        { id: 7, title: '절망적인 상황에서도 모든 가능성을 열어놓고 긍정적으로 받아들였다.' },
    ]
    const [listQuestions, setListQuestions] = useState<questionType[]>(initQuestion)
    const [answers, setAnswers] = useState<{ [key: number]: number | null }>({});

    const handleSelectAnswer = (questionId: number, answerIndex: number) => {
        setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
    };
    const nextPage = () => {
        console.log("Submitted answers: ", answers);
        navigation.navigate(SCREENS_NAME.EVALUATE.BEHAVIORAL_MODEL, { time })
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
                        <Text style={[styles.text, { color: colors.orange_04 }]}>SAT-SF-I</Text>
                        <Text style={[styles.text, { color: colors.gray_G08, marginTop: 5 }]}>다음은 자기 주도적으로 위기를 극복하고, 긍정적으로 성장하기 위해 , 삶의 목표와 구체적인 계획을 세울 때 사용할 수 있는 실행전략과 관련된 평가 입니다. 각 문항들을 읽고, 귀하가 지난 한달간 얼마나 잘 해왔는지 가장 가깝다고 생각되는 부분에 체크해 주십시오.</Text>
                    </View>
                    {listQuestions && listQuestions.map((item) => {
                        return (
                            <Question
                                question={item}
                                key={item.id}
                                selectedAnswer={answers[item.id]}
                                onSelectAnswer={handleSelectAnswer}
                            />
                        )
                    })}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={Object.keys(answers).length !== initQuestion.length}
                    onPress={nextPage}
                    style={[styles.button, { backgroundColor: Object.keys(answers).length === initQuestion.length ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: Object.keys(answers).length === initQuestion.length ? colors.white : colors.gray_G04 }]}>{t('common.text.next')}</Text>
                </Pressable>
            </View>
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

export default SAT_SF_I