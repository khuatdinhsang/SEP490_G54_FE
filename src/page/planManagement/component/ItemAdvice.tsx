import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';

type itemType = {
    name: string;
    id: number;
};

type itemAdviceProps = {
    item: itemType;
    handleSelectItem: (id: number, isAdd: boolean) => void;
};
const ItemAdvice: React.FC<itemAdviceProps> = ({ item, handleSelectItem }) => {
    return (
        <View style={styles.itemAdvice}>
            <Text style={styles.textItemAdvice}>{item.name}</Text>
            <Pressable onPress={() => handleSelectItem(item.id, true)} style={styles.add}>
                <Text style={{ textAlign: 'center', color: colors.white }}>+</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    itemAdvice: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15,
        borderColor: colors.gray
    },
    add: {
        height: 20,
        width: 20,
        borderRadius: 10,
        backgroundColor: colors.gray_G03
    },
    textItemAdvice: {
        width: '85%',
        marginRight: 20,
        fontWeight: '500',
        fontSize: 16,
        color: colors.gray_G08
    },
});

export default ItemAdvice;
