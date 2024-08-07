import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../../../constant/color'
import { flexCenter, flexRow, flexRowSpaceBetween } from '../../../styles/flex'
import { questionRes } from '../../../constant/type/question'

const DescriptionColor = () => {
    const { t } = useTranslation()
    return (
        <View style={flexRow}>
            <View style={[styles.color, { backgroundColor: colors.gray_G03 }]}></View>
            <Text style={[styles.text, { marginRight: 10 }]}>{t("common.text.lastMonth")}</Text>
            <View style={[styles.color, { backgroundColor: colors.orange_04 }]}></View>
            <View style={[styles.color, { backgroundColor: colors.green }]}></View>
            <View style={[styles.color, { backgroundColor: colors.blue_01 }]}></View>
            <Text style={styles.text}>{t("evaluate.thisMonth")}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontWeight: "400",
        fontSize: 14,
        color: colors.gray_G06

    },
    color: {
        height: 8,
        width: 8,
        borderRadius: 4,
        marginRight: 5
    }

})

export default DescriptionColor