import React from 'react'
import { KeyboardTypeOptions, StyleSheet, Text, TextInput, View } from 'react-native'
import colors from '../../constant/color'

interface InputComponentProps {
    textRight: string;
    value: string,
    error: string,
    handleSetValue: (value: string) => void
    keyboardType: KeyboardTypeOptions
}

const InputNumber = (props: InputComponentProps) => {
    const { textRight, error, value, handleSetValue } = props
    return (
        <View
            style={[
                styles.box,
                {
                    borderColor:
                        value || (!value && !error)
                            ? colors.gray
                            : colors.primary,
                },
            ]}>
            <Text style={styles.unit}>{textRight}</Text>
            <TextInput
                style={styles.unitInput}
                keyboardType="numeric"
                value={value}
                onChangeText={handleSetValue}
            />
        </View>
    )
}
const styles = StyleSheet.create({
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
    },
    unit: {
        lineHeight: 56,
        position: 'absolute',
        zIndex: 1000,
        right: 20,
        color: colors.black,
    },
    unitInput: {
        width: '100%',
        height: 56,
        position: 'absolute',
        paddingLeft: '40%',
    },
    textInput: {
        textAlign: 'center',
        lineHeight: 56,
    },
})
export default InputNumber