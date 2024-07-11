import React, { useState } from 'react'
import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import colors from '../../constant/color'

interface InputComponentProps {
    textRight: string;
    value: string,
    error?: string,
    handleSetValue: (value: string) => void
    keyboardType: KeyboardTypeOptions,
    styleInput?: StyleProp<TextStyle>,
    isEditable?: boolean
}

const InputNumber = (props: InputComponentProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const { textRight, error, value, handleSetValue, styleInput, isEditable } = props
    return (
        <View
            style={[
                styles.box,
                isFocused && styles.textFocused
            ]}>
            <Text style={[styles.unit, value?.length !== 0 && styles.textRightFocused]}>{textRight}</Text>
            <TextInput
                style={[styles.unitInput, styleInput]}
                keyboardType="numeric"
                value={value}
                onChangeText={handleSetValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={isEditable}
            />
            {error && <View style={{ position: 'absolute', bottom: -20 }}>
                <Text style={styles.textError}>{error}</Text>
            </View>}

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
    textError: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.red,
    }
})
export default InputNumber