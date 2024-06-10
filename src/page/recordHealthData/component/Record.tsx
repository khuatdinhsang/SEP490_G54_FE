import React from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import colors from '../../../constant/color'
import { IMAGE } from '../../../constant/image'
import { recordData } from '../contant';

type itemRecord = {
    record: recordData;
    handleNavigate: () => void;
};
const RecordComponent: React.FC<itemRecord> = ({ record, handleNavigate }) => {
    return (
        <Pressable
            onPress={handleNavigate}
            style={styles.item}>
            <Image source={record.image || IMAGE.RECORD_DATA.BLOOD} />
            <Text style={styles.itemText}>{record.title}</Text>
        </Pressable>
    )
}
const styles = StyleSheet.create({
    item: {
        paddingVertical: 20,
        elevation: 5,
        backgroundColor: colors.white,
        borderRadius: 12,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '48%',
        height: 170,
        marginBottom: 20
    },
    itemText: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.gray_G07,
        marginTop: 10,
        textAlign: 'center',
        paddingHorizontal: 20
    }
})

export default RecordComponent