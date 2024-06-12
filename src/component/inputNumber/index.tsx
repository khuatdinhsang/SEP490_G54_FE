import React, { useState } from 'react'
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../../constant/color'

interface InputComponentProps {
    textRight: string;
    value: string,
    error?: string,
    handleSetValue: (value: string) => void
    keyboardType: KeyboardTypeOptions
}

const InputNumber = (props: InputComponentProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const { textRight, error, value, handleSetValue } = props
    return (
        <View
            style={[
                styles.box,
                isFocused && styles.textFocused
            ]}>
            <Text style={[styles.unit, isFocused && styles.textRightFocused]}>{textRight}</Text>
            <TextInput
                style={styles.unitInput}
                keyboardType="numeric"
                value={value}
                onChangeText={handleSetValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
        borderColor: colors.gray_G03
    },
    unit: {
        lineHeight: 56,
        fontWeight: '400',
        fontSize: 14,
        position: 'absolute',
        zIndex: 1000,
        right: 15,
        color: colors.gray_G04
    },
    textRightFocused: {
        color: colors.black,
    },
    unitInput: {
        width: '100%',
        height: 56,
        position: 'absolute',
        paddingLeft: 30,
    },
    textInput: {
        textAlign: 'center',
        lineHeight: 56,
    },
    textFocused: {
        borderColor: colors.primary,
    },
})
export default InputNumber