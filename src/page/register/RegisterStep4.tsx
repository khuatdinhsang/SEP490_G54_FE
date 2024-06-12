import React, { useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import ProgressHeader from '../../component/progessHeader';
import { authService } from '../../services/auth';
import axios from 'axios';

type ItemType = {
    type: string;
    data: ItemTypeChild[],
};

type ItemTypeChild = {
    id: number;
    name: string,
};

const RegisterStep4 = ({ route }: any) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const { valuesStep3, dataMedical } = route.params;
    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    };

    const handleSubmit = () => {
        const data = { ...valuesStep3, listMedicalHistory: [...valuesStep3.listMedicalHistory, ...selectedItems] }
        if (selectedItems.length > 0) {
            navigation.navigate(SCREENS_NAME.REGISTER.RULES, { data })
        }
    };

    const handleSelectItem = (itemId: number, isSelected: boolean) => {
        setSelectedItems((prevSelectedItems) => {
            if (isSelected) {
                if (!prevSelectedItems.includes(itemId)) {
                    return [...prevSelectedItems, itemId];
                }
            } else {
                return prevSelectedItems.filter(item => item !== itemId);
            }
            return prevSelectedItems;
        });
    };

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }} showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <Pressable onPress={loginPage}>
                        <Image
                            style={styles.buttonCancel}
                            source={require('../../assets/image/register/icon_X.png')}
                        />
                    </Pressable>
                    <ProgressHeader index={[0, 1, 2, 3]} length={4} style={{ marginTop: 45 }} />
                    <View style={{ marginTop: 20 }}>
                        <View style={[flexRow, { marginBottom: 20, width: 200, alignItems: 'flex-start' }]}>
                            <Text style={[styles.hightLight, { color: colors.primary }]}>04.</Text>
                            <Text style={[styles.hightLight, { color: colors.black }]}>{t("common.text.fillIllness")}</Text>
                        </View>
                    </View>
                    <Text style={styles.textField}>{dataMedical[0].type}</Text>
                    <View style={[flexRowSpaceBetween, { flexWrap: 'wrap' }]}>
                        {dataMedical && dataMedical.slice(0, 1).map((item: ItemType) => {
                            return item.data.map((itemChild: ItemTypeChild) => {
                                const isSelected = selectedItems.includes(itemChild.id);
                                return (
                                    <Pressable key={itemChild.id} style={styles.box} onPress={() => handleSelectItem(itemChild.id, !isSelected)}>
                                        <View style={[flexRowCenter, styles.boxItem, { borderColor: isSelected ? colors.primary : colors.gray, flexDirection: 'column' }]}>
                                            <Image source={IMAGE.REGISTER.BRAIN} />
                                            <Text style={[styles.nameItemBox, { color: isSelected ? colors.primary : colors.gray }]}>{itemChild.name}</Text>
                                        </View>
                                    </Pressable>
                                );
                            })
                        })}
                    </View>
                    <View style={{ marginBottom: 20 }}>
                        <Text style={styles.textField}>{dataMedical[1].type}</Text>
                        {dataMedical && dataMedical.slice(1).map((item: ItemType) => {
                            return item.data.map((itemChild) => {
                                const isSelected = selectedItems.includes(itemChild.id);
                                return (
                                    <View key={itemChild.id}>
                                        <Text style={[styles.textField, { marginBottom: 15 }]}>{itemChild.name}</Text>
                                        <View style={[flexRowSpaceBetween]}>
                                            <Pressable
                                                onPress={() => handleSelectItem(itemChild.id, true)}
                                                style={[
                                                    flexRowCenter,
                                                    styles.buttonBox,
                                                    {
                                                        width: '47%',
                                                        borderColor: selectedItems.includes(itemChild.id) ? colors.primary : colors.gray,
                                                        backgroundColor: selectedItems.includes(itemChild.id) ? colors.orange_02 : colors.white
                                                    }
                                                ]}
                                            >
                                                <Text style={{ color: selectedItems.includes(itemChild.id) ? colors.primary : colors.textGray }}>
                                                    {t("common.text.yes")}
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                onPress={() => handleSelectItem(itemChild.id, false)}
                                                style={[
                                                    flexRowCenter,
                                                    styles.buttonBox,
                                                    {
                                                        width: '47%',
                                                        borderColor: !selectedItems.includes(itemChild.id) ? colors.primary : colors.gray,
                                                        backgroundColor: !selectedItems.includes(itemChild.id) ? colors.orange_02 : colors.white
                                                    }
                                                ]}
                                            >
                                                <Text style={{ color: !selectedItems.includes(itemChild.id) ? colors.primary : colors.textGray }}>
                                                    {t("common.text.no")}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>

                                )
                            })
                        })}
                    </View>
                </SafeAreaView>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable onPress={handleSubmit} style={[styles.button, { backgroundColor: selectedItems.length !== 0 ? colors.primary : colors.gray }]}>
                    <Text style={styles.text}>{t("common.text.next")}</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    buttonCancel: {
        position: 'absolute',
        right: 0,
        top: 15,
    },
    box: {
        width: '45%',
        marginBottom: 20,
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
    textField: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.black,
        marginBottom: 10,
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        lineHeight: 60,
        fontWeight: '500',
        fontSize: 18,
    },
    button: {
        height: 60,
        borderRadius: 12,
    },
    buttonBox: {
        borderRadius: 8,
        borderWidth: 1,
        height: 60,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        paddingVertical: 20,
    },
});

export default RegisterStep4;
