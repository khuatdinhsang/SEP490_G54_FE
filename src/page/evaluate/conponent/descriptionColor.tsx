import React from 'react'
import { useTranslation } from 'react-i18next'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../../../constant/color'
import { flexCenter, flexRow, flexRowSpaceBetween } from '../../../styles/flex'
import { questionRes } from '../../../constant/type/question'

const DescriptionColor = () => {
    return (
        <View style={flexRow}>
            <View style={styles.color}></View>
        </View>
    )
}
const styles = StyleSheet.create({
    text: {
        fontWeight: "600",
        fontSize: 18,
        color: colors.gray_G09

    },
    color: {
        height: 8,
        width: 8,
        borderRadius: 4,
        backgroundColor: colors.gray_G03
    }

})

export default DescriptionColor