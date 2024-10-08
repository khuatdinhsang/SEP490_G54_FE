import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../constant/color';

type DaySelectionProps = {
    data: { id: number, name: string, value: string }[],
    selectedDays: number[],
    handleSelectDays: (itemId: number) => void,
    isChecked: boolean
};

const DaySelection: React.FC<DaySelectionProps> = ({ data, selectedDays, handleSelectDays, isChecked }) => {
    return (
        <View style={styles.container}>
            {data && data.map((item) => {
                const isSelected = selectedDays?.includes(item.id);
                return (
                    <Pressable
                        key={item.id}
                        onPress={() => handleSelectDays(item.id)}
                        style={[styles.day, { backgroundColor: isSelected ? colors.primary : colors.gray_G02 }]}
                    >
                        <Text style={[styles.textDay, { color: isSelected ? colors.white : colors.textGray }]}>{item.name}</Text>
                    </Pressable>
                )
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    day: {
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 999,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 2
    },
    textDay: {
        fontWeight: '400',
        fontSize: 18,
    },
});

export default DaySelection;
