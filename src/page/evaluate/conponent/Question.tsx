import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../../../constant/color'
import { flexCenter, flexRowSpaceBetween } from '../../../styles/flex'
import { questionRes } from '../../../constant/type/question'
interface questionProps {
    question: questionRes,
    selectedAnswer: number | null;
    onSelectAnswer: (questionId: number, answerIndex: number) => void;
}
const Question = (props: questionProps) => {
    const { question, selectedAnswer, onSelectAnswer } = props
    const { t } = useTranslation();
    const answers = [
        t('evaluate.abSolutelyNotCorrect'),
        t('evaluate.aPartCorrect'),
        t('evaluate.prettyCorrect'),
        t('evaluate.absoluteCorrect')
    ];
    return (
        <View>
            <Text style={[styles.text, { marginTop: 10 }]}>{question.questionNumber}.</Text>
            <Text style={styles.text}>{question.question}</Text>
            <View style={[flexRowSpaceBetween, { marginTop: 10 }]}>
                {answers.map((answer, index) => (
                    <Pressable
                        key={index}
                        style={[
                            flexCenter,
                            styles.answer,
                            { backgroundColor: selectedAnswer === index + 1 ? colors.orange_01 : colors.gray_G01 },
                        ]}
                        onPress={() => onSelectAnswer(question.questionNumber, index + 1)}
                    >
                        <Text
                            style={[
                                styles.textAnswer,
                                { color: selectedAnswer === index + 1 ? colors.orange_04 : colors.gray_G06 },
                            ]}
                        >
                            {answer}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontWeight: "600",
        fontSize: 18,
        color: colors.gray_G09

    },
    answer: {
        borderRadius: 4,
        width: "23%",
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    textAnswer: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: "500",
    }
})

export default Question