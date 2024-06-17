import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';

type itemType = {
    name: string;
    id: number;
};

type itemAdviceProps = {
    item: itemType;
    handleSelectItem: (id: number, isAdd: boolean) => void;
    isSelected?: boolean
};
const Advice: React.FC<itemAdviceProps> = ({ item, handleSelectItem, isSelected }) => {
    return (
        <Pressable
            onPress={() => handleSelectItem(item.id, true)}
            style={[styles.itemAdvice, { borderColor: isSelected ? colors.primary : colors.gray, backgroundColor: isSelected ? colors.orange_01 : colors.white }]}>
            <Text style={[styles.textItemAdvice, { color: isSelected ? colors.orange_04 : colors.gray_G08 }]}>{item.name}</Text>
            <Image source={isSelected ? IMAGE.RECORD_DATA.ICON_CHECK_ORANGE : IMAGE.RECORD_DATA.ICON_CHECK} />
        </Pressable>
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
    },
    textItemAdvice: {
        width: '85%',
        marginRight: 20,
        fontWeight: '500',
        fontSize: 16,

    },
});

export default Advice;
