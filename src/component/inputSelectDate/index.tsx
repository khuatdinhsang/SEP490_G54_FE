import React from 'react'
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { flexRowCenter } from '../../styles/flex';
import colors from '../../constant/color';
import { WidthDevice } from '../../util/Dimenssion';
import { useTranslation } from 'react-i18next';

interface InputComponentProps {
    text: string;
    value: number,
    toggleModalScroll: () => void,
    showScroll: boolean,
    textButton: string,
    handleChange: (value: number) => void,
    length: number,
    type: string
}

const SelectDate = (props: InputComponentProps) => {
    const currentYear = new Date().getFullYear();
    const { t } = useTranslation();
    const { text, length, type, value, toggleModalScroll, showScroll, textButton, handleChange } = props
    const renderValueItem = (value: number) => {
        switch (type) {
            case 'hour':
                return `${value}${t('common.text.hours')}`
            case 'minute':
                return `${value}${t('common.text.minutes')}`
            default:
                return value
        }
    }
    const stepCount = (value: number) => {
        switch (type) {
            case 'year':
                return currentYear - value
            case 'yearPlus':
                return currentYear + value
            case 'minute':
                return value * 5
            default:
                return value + 1
        }
    }
    return (
        <View>
            <Pressable onPress={toggleModalScroll}>
                <View style={styles.itemDate}>
                    <Text style={styles.date}>{value}</Text>
                    <Text style={[styles.textDate, { color: value !== undefined ? colors.black : colors.gray_G04 }]}>{text}</Text>
                </View>
            </Pressable>
            {showScroll && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showScroll}
                    onRequestClose={() => {
                        toggleModalScroll();
                    }}>
                    <View style={styles.centeredView}>
                        <View style={{ position: 'relative' }}>
                            <Pressable
                                style={styles.buttonCancelDate}
                                onPress={() => toggleModalScroll()}>
                                <Image
                                    source={require('../../assets/image/register/icon_X.png')}
                                />
                            </Pressable>
                        </View>
                        <View style={styles.modalView}>
                            <Text style={styles.titleModal}>
                                {text}
                            </Text>
                            <View style={styles.lineModal}></View>
                            <ScrollView style={styles.scrollView}>
                                <View style={[flexRowCenter, { width: '100%' }]}>
                                    <View
                                        style={[
                                            flexRowCenter,
                                            { width: type === 'year' || type === 'yearPlus' || type === 'hour' || type === 'minute' ? '48%' : '30%', flexWrap: 'wrap' },
                                        ]}>
                                        {Array.from(
                                            { length },
                                            (_, i) => stepCount(i),
                                        ).map(valueItem => (
                                            <View
                                                key={valueItem}
                                                style={[
                                                    styles.itemModal,
                                                    {
                                                        backgroundColor:
                                                            value === valueItem
                                                                ? colors.orange_02
                                                                : colors.white,
                                                    },
                                                ]}>
                                                <Pressable
                                                    onPress={() => {
                                                        handleChange(valueItem);
                                                    }}>
                                                    <Text
                                                        style={[
                                                            styles.textItemModal,
                                                            {
                                                                color:
                                                                    value === valueItem
                                                                        ? colors.primary
                                                                        : colors.black,
                                                            },
                                                        ]}>
                                                        {renderValueItem(valueItem)}
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        ))}
                                    </View>
                                </View>
                            </ScrollView>
                            <Pressable
                                onPress={() => toggleModalScroll()}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: value !== undefined ? colors.primary : colors.gray_G02,
                                        width: '90%',
                                        marginBottom: 20,
                                    },
                                ]}>
                                <Text style={styles.text}>
                                    {textButton}
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    )
}
const styles = StyleSheet.create({
    textDate: {
        textAlign: 'center',
        lineHeight: 52,
        position: 'absolute',
        zIndex: 1000,
        right: 15,

    },
    modalView: {
        backgroundColor: colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        zIndex: 0,
    },
    scrollView: {
        width: '100%',
        height: '40%',
    },
    buttonCancelDate: {
        position: 'absolute',
        top: 15,
        zIndex: 100,
        right: 15,
    },
    itemDate: {
        height: 52,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.gray,
    },
    date: {
        lineHeight: 52,
        marginLeft: '25%',
        color: colors.black,
        fontSize: 18,
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        lineHeight: 62,
        fontWeight: '500',
        fontSize: 18,
    },
    button: {
        height: 60,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 15,
    },
    textItemModal: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '400',
        padding: 10
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: WidthDevice,
        position: 'relative',
        height: '40%',
    },
    titleModal: {
        fontWeight: '400',
        fontSize: 18,
        marginVertical: 15,
    },
    lineModal: {
        width: '100%',
        height: 1,
        backgroundColor: colors.gray,
    },
    itemModal: {
        margin: 5,
        borderRadius: 8,
    },
})


export default SelectDate