import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { flexRowSpaceBetween } from '../../../styles/flex'
import colors from '../../../constant/color'
import { useTranslation } from 'react-i18next'
import { dataQuestion } from '../const'

type itemQuestion = {
    question: dataQuestion;
    handleDetailQuestion: (id: number) => void;
};
const QuestionComponent: React.FC<itemQuestion> = ({ question, handleDetailQuestion }) => {
    const { t, i18n } = useTranslation();
    return (
        <Pressable
            onPress={() => { handleDetailQuestion(question.id) }}
            style={[flexRowSpaceBetween, styles.question]}>
            <View style={{ width: '70%' }}>
                <Text style={styles.textQuestion}>{question.date}</Text>
                <Text numberOfLines={2} ellipsizeMode='tail' style={[styles.textQuestion, { color: colors.gray_G08 }]}>{question.content}</Text>
            </View>
            <View style={[styles.statusQuestion, { backgroundColor: question.status === 1 ? colors.blue_background : colors.orange_01 }]}>
                <Text style={[styles.textQuestion, { color: question.status === 1 ? colors.blue_01 : colors.orange_04 }]}>{question.status === 1 ? t('questionManagement.answered') : t('questionManagement.waitForReply')}</Text>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    question: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.gray_G02,
        paddingVertical: 16,
        paddingHorizontal: 14,
        backgroundColor: colors.white,
        marginBottom: 15
    },
    textQuestion: {
        fontWeight: "500",
        fontSize: 16,
        color: colors.gray_G04,
    },
    statusQuestion: {
        paddingHorizontal: 18,
        paddingVertical: 7,
        borderRadius: 50
    },
})

export default QuestionComponent