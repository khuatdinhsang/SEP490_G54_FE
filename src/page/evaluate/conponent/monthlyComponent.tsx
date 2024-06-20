import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { flexRow, flexRowSpaceBetween } from '../../../styles/flex'
import colors from '../../../constant/color'
import { useTranslation } from 'react-i18next'
import { IMAGE } from '../../../constant/image'
import { ParamListBase, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SCREENS_NAME } from '../../../navigator/const'
interface MonthLyComponentProps {
    time: number
}
const MonthComponent = (props: MonthLyComponentProps) => {
    const { time } = props
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const detailEvaluate = () => {
        navigation.navigate(SCREENS_NAME.EVALUATE.DETAIL_WEEKLY, { time })
    }
    return (
        <Pressable
            onPress={detailEvaluate}
            style={[styles.item, flexRowSpaceBetween]}
        >
            <View style={flexRow}>
                <Image source={IMAGE.EVALUATE.NOTE} width={36} height={36} />
                <Text style={styles.textTime}>{time}월 실천평가</Text>
            </View>
            <View style={flexRow}>
                <Pressable
                    onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.SAT_SF_C, { time })}
                    style={[styles.button, { backgroundColor: true ? colors.orange_04 : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: true ? colors.white : colors.gray_G07 }]}>{t("evaluate.answerSurvey")}</Text>
                </Pressable>
                <Pressable style={[styles.button, { marginLeft: 10, backgroundColor: false ? colors.orange_04 : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: false ? colors.white : colors.gray_G07 }]}>{t("evaluate.viewResult")}</Text>
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