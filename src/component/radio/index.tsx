import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Pressable } from 'react-native';
import colors from '../../constant/color';

interface RadioButtonProps {
    label: string;
    value: string;
    selected: boolean;
    onPress: () => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, selected, onPress }) => (
    <Pressable onPress={onPress} style={styles.radioButtonContainer}>
        <View style={[styles.radioButton, { borderColor: selected ? colors.primary : colors.black }]}>
            {selected && <View style={styles.radioButtonSelected} />}
        </View>
        <Text style={styles.radioButtonLabel}>{label}</Text>
    </Pressable>
);

const styles = StyleSheet.create({
    radioButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    radioButton: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,

        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    radioButtonSelected: {
        height: 10,
        width: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
    },
    radioButtonLabel: {
        fontSize: 16,
        fontWeight: "500",
        color: colors.gray_G10
    },
});

export default RadioButton;