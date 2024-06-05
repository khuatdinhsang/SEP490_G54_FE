import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { Button, FlatList, Image, Pressable, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker';
import { WidthDevice } from '../../util/Dimenssion';
import { IMAGE } from '../../constant/image';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import ProgressHeader from '../../component/progessHeader';
type ItemType = {
    id: number;
    name: string,
    icon: string
};
const RegisterStep4 = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [data, setData] = useState<ItemType[]>([])
    const [isAlcohol, setIsAlcohol] = useState<boolean>(false)
    const [isSmoke, setIsSmoke] = useState<boolean>(false)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    useEffect(() => {
        setData([
            {
                id: 1,
                name: t("common.diseases.heart"),
                icon: IMAGE.REGISTER.HEART
            },
            {
                id: 2,
                name: t("common.diseases.liver"),
                icon: IMAGE.REGISTER.LUNGS
            },
            {
                id: 3,
                name: t("common.diseases.brain"),
                icon: IMAGE.REGISTER.BRAIN
            },
            {
                id: 4,
                name: t("common.diseases.cancer"),
                icon: IMAGE.REGISTER.STETHOSCOPE
            },
        ])
    }, [])

    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    }
    const handleSubmit = () => {
        if (selectedItems.length > 0) {
            navigation.navigate(SCREENS_NAME.REGISTER.RULES)
        }
    }
    const handleSelectItem = (itemId: number) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter(item => item !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };
    const chooseAlcohol = (value: boolean) => {
        setIsAlcohol(value)
    }
    const chooseSmoke = (value: boolean) => {
        setIsSmoke(value)
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container} >
                <Pressable onPress={loginPage}>
                    <Image style={styles.buttonCancel} source={require('../../assets/image/register/icon_X.png')} />
                </Pressable>
                <ProgressHeader index={[0, 1, 2, 3]} length={4} style={{ marginTop: 45 }} />
                <View style={{ marginTop: 20 }}>
                    <View style={[flexRow, { marginBottom: 20, width: 200, alignItems: 'flex-start' }]}>
                        <Text style={[styles.hightLight, { color: colors.primary }]}>04.</Text>
                        <Text style={[styles.hightLight, { color: colors.black }]} >{t("common.text.fillIllness")}</Text>
                    </View>
                </View>
                <Text style={styles.textField}>{t("common.diseases.anamnesis")}</Text>

                <View style={[flexRowSpaceBetween, { width: WidthDevice - 40, flexWrap: 'wrap' }]}>
                    {
                        data && data.map((item: ItemType) => {
                            const isSelected = selectedItems.includes(item.id);
                            return (
                                <Pressable key={item.id} style={styles.box} onPress={() => handleSelectItem(item.id)} >
                                    <View style={[flexRowCenter, styles.boxItem, { borderColor: isSelected ? colors.primary : colors.gray, flexDirection: 'column' }]}>
                                        <Image source={item.icon || IMAGE.REGISTER.BRAIN} />
                                        <Text style={[styles.nameItemBox, { color: isSelected ? colors.primary : colors.gray }]}>{item.name}</Text>
                                    </View>
                                </Pressable >
                            )
                        })
                    }
                </View>
                <View style={{ marginBottom: 20 }}>
                    <Text style={styles.textField}>{t("common.text.infoHealth")}</Text>
                    <View>
                        <Text style={[styles.textField, { marginBottom: 15 }]}>{t("common.text.smoke")}</Text>
                        <View style={[flexRowSpaceBetween, { width: WidthDevice - 40 }]}>
                            <Pressable onPress={() => chooseAlcohol(true)} style={[flexRowCenter, styles.buttonBox, { width: '47%', borderColor: isAlcohol ? colors.primary : colors.gray, backgroundColor: isAlcohol ? colors.orange_02 : colors.white }]}>
                                <Text style={{ color: isAlcohol ? colors.primary : colors.textGray }}>{t("common.text.yes")}</Text>
                            </Pressable>
                            <Pressable onPress={() => chooseAlcohol(false)} style={[flexRowCenter, styles.buttonBox, { width: '47%', borderColor: !isAlcohol ? colors.primary : colors.gray, backgroundColor: !isAlcohol ? colors.orange_02 : colors.white }]}>
                                <Text style={{ color: !isAlcohol ? colors.primary : colors.textGray }}>{t("common.text.no")}</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View>
                        <Text style={[styles.textField, { marginVertical: 15 }]}>{t("common.text.alcohol")}</Text>
                        <View style={[flexRowSpaceBetween, { width: WidthDevice - 40 }]}>
                            <Pressable onPress={() => chooseSmoke(true)} style={[flexRowCenter, styles.buttonBox, { width: '47%', borderColor: isSmoke ? colors.primary : colors.gray, backgroundColor: isSmoke ? colors.orange_02 : colors.white }]}>
                                <Text style={{ color: isSmoke ? colors.primary : colors.textGray }}>{t("common.text.yes")}</Text>
                            </Pressable>
                            <Pressable onPress={() => chooseSmoke(false)} style={[flexRowCenter, styles.buttonBox, { width: '47%', borderRadius: 8, borderWidth: 1, borderColor: !isSmoke ? colors.primary : colors.gray, backgroundColor: !isSmoke ? colors.orange_02 : colors.white }]}>
                                <Text style={{ color: !isSmoke ? colors.primary : colors.textGray }}>{t("common.text.no")}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <Pressable onPress={handleSubmit} style={[styles.button, { backgroundColor: selectedItems.length !== 0 ? colors.primary : colors.gray }]} >
                    <Text style={styles.text}>{t("common.text.next")}</Text>
                </Pressable>
            </SafeAreaView >
        </ScrollView >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    buttonCancel: {
        position: 'absolute',
        right: 0,
        top: 15
    },
    box: {
        width: '45%',
        marginBottom: 20
    },
    boxItem: {
        height: 120,
        borderWidth: 1,
        borderRadius: 8,
    },
    hightLight: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 30,
    },
    nameItemBox: {
        fontWeight: '400',
        marginTop: 5,
        fontSize: 18,
    },
    field: {
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    textField: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.black,
        marginBottom: 10
    },
    text: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18
    },
    button: {
        height: 60,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 15
    },
    buttonBox: {
        borderRadius: 8,
        borderWidth: 1,
        height: 60,
    }

})

export default RegisterStep4;