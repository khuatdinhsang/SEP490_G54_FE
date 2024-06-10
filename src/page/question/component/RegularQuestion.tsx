import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { flexRow, flexRowSpaceBetween } from '../../../styles/flex'
import colors from '../../../constant/color'
import { dataQuestion } from '../const';
import { useTranslation } from 'react-i18next';

type itemQuestion = {
    question: dataQuestion;
    handleDetailQuestion: (id: number) => void;
};
const RegularQuestionComponent: React.FC<itemQuestion> = ({ question, handleDetailQuestion }) => {
    const { t, i18n } = useTranslation();
    return (
        <View style={{ marginBottom: 20 }}>
            <View style={flexRow}>
                <Text style={styles.title}>Q</Text>
                <Text style={styles.title}>1</Text>
                <Text style={styles.title}>.</Text>
                <Text style={[styles.title, { color: colors.black }]}>{question.title}</Text>
            </View>
            <Pressable
                onPress={() => handleDetailQuestion(question.id)}
                style={styles.question}>
                <View style={styles.answer}>
                    <Text>{t("common.text.next")}</Text>
                </View>
                <Text style={styles.questionText}>{question.content}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.orange_04
    },
    question: {
        width: "100%",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray_G03,
        paddingHorizontal: 12,
        paddingVertical: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    questionText: {
        fontSize: 14,
        fontWeight: "400",
        color: colors.gray_G08,
        width: '80%'
    },
    answer: {
        backgroundColor: colors.gray_G01,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 4,
        height: 24
    }
})

export default RegularQuestionComponent