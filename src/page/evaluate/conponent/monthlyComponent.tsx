import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { flexRow, flexRowSpaceBetween } from '../../../styles/flex'
import colors from '../../../constant/color'
import { useTranslation } from 'react-i18next'
import { IMAGE } from '../../../constant/image'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SCREENS_NAME } from '../../../navigator/const'
import { listMonthNumberRes } from '../../../constant/type/question'
interface MonthLyComponentProps {
    data: listMonthNumberRes
}
const MonthComponent = (props: MonthLyComponentProps) => {
    const { data } = props
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const detailEvaluate = () => {
        navigation.navigate(SCREENS_NAME.EVALUATE.DETAIL_WEEKLY, { time: data.monthNumber })
    }
    return (
        <Pressable
            onPress={detailEvaluate}
            style={[styles.item, flexRowSpaceBetween]}
        >
            <View style={flexRow}>
                <Image source={IMAGE.EVALUATE.NOTE} width={36} height={36} />
                <Text style={styles.textTime}>{data.monthNumber}월 실천평가</Text>
            </View>
            <View style={flexRow}>
                <Pressable
                    onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.SAT_SF_C, { time: data.monthNumber })}
                    style={[styles.button, { backgroundColor: colors.orange_04 }]}>
                    <Text style={[styles.textButton, { color: colors.white }]}>{data.isAnswered ? t("evaluate.viewResultSurvey") : t("evaluate.answerSurvey")}</Text>
                </Pressable>
                <Pressable style={[styles.button, { marginLeft: 10, backgroundColor: data.isAnswered ? colors.orange_04 : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: data.isAnswered ? colors.white : colors.gray_G07 }]}>{t("evaluate.viewResult")}</Text>
                </Pressable>
            </View>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    item: {
        marginBottom: 20
    },
    textTime: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.gray_G08
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 999,
        backgroundColor: colors.orange_04
    },
    textButton: {
        fontSize: 14,
        fontWeight: "500"
    }
})

export default MonthComponent