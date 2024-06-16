import React, { useState } from 'react';
import * as yup from "yup";
import { Button, FlatList, Image, Pressable, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import { flexRow } from '../../styles/flex';
import DatePicker from 'react-native-date-picker';
import { IMAGE } from '../../constant/image';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import { authService } from '../../services/auth';
import axios from 'axios';

const RegisterRules = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [checked, setChecked] = useState<boolean>(false)
    const { data } = route.params;
    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    }
    const handleCheck = () => {
        setChecked(checked => !checked)
    }
    const handleSubmit = async (): Promise<void> => {
        if (checked) {
            try {
                console.log("31", data)
                const res = await authService.register(data)
                if (res.code === 201) {
                    navigation.navigate(SCREENS_NAME.REGISTER.SUCCESS)
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    console.log("r", error.response.data.message)
                    // console.log("r", error.response.data.code)
                }
            }
        }
    }
    return (
        <ScrollView>
            <SafeAreaView style={styles.container} >
                <Pressable onPress={loginPage}>
                    <Image
                        style={styles.buttonCancel} source={require('../../assets/image/register/icon_X.png')} />
                </Pressable>
                <View style={{ justifyContent: 'space-between', marginTop: 45, display: 'flex', flexDirection: 'row', width: '100%' }}>
                    {Array.from({ length: 4 }).map((_, i) => (
                        <View
                            key={i}
                            style={{ width: '23%', backgroundColor: (i == 0 || i == 1 || i == 2 || i == 3) ? colors.primary : colors.gray, height: 3 }}
                        />
                    ))
                    }
                </View>
                <Text style={[styles.hightLight, { color: colors.black, marginTop: 20 }]} >{t("common.text.checkTerms")}</Text>
                <View style={{ marginTop: 30, paddingHorizontal: 12, paddingVertical: 20, borderWidth: 1, borderColor: colors.gray, borderRadius: 12 }}>
                    <Pressable onPress={handleCheck}>
                        <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', marginBottom: 20 }}>
                            <Image tintColor={checked ? colors.primary : colors.gray} source={IMAGE.ICON_CHECK} />
                            <Text style={styles.textfield}>{t("common.text.acceptTerms")}</Text>
                        </View>
                    </Pressable>
                    <View style={{ width: '100%', backgroundColor: colors.gray, height: 1 }}></View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image tintColor={checked ? colors.primary : colors.gray} source={IMAGE.ICON_CHECK} />
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textfield, { color: colors.primary }]}>{t("common.text.force")}</Text>
                                <Text style={styles.textfield}>{t("common.text.acceptTerms")}</Text>
                            </View>
                        </View>
                        <Text>{t("common.text.view")}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image tintColor={checked ? colors.primary : colors.gray} source={IMAGE.ICON_CHECK} />
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textfield, { color: colors.primary }]}>{t("common.text.force")}</Text>
                                <Text style={styles.textfield}>{t("common.text.acceptTerms")}</Text>
                            </View>
                        </View>
                        <Text>{t("common.text.view")}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image tintColor={checked ? colors.primary : colors.gray} source={IMAGE.ICON_CHECK} />
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textfield, { color: colors.primary }]}>{t("common.text.force")}</Text>
                                <Text style={styles.textfield}>{t("common.text.personalPolicy")}</Text>
                            </View>
                        </View>
                        <Text>{t("common.text.view")}</Text>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <Image tintColor={checked ? colors.primary : colors.gray} source={IMAGE.ICON_CHECK} />
                            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.textfield, { color: colors.primary }]}>{t("common.text.force")}</Text>
                                <Text style={styles.textfield}>{t("common.text.sensitiveInfo")}</Text>
                            </View>
                        </View>
                        <Text>{t("common.text.view")}</Text>
                    </View>
                </View>
                <Pressable
                    disabled={checked ? false : true}
                    onPress={handleSubmit} style={[styles.button, { backgroundColor: checked ? colors.primary : colors.gray }]} >
                    <Text style={styles.text}>{t("common.text.next")}</Text>
                </Pressable>
            </SafeAreaView >
        </ScrollView >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        height: HeightDevice,
    },
    buttonCancel: {
        position: 'absolute',
        right: 0,
        top: 15
    },
    hightLight: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 30,
    },

    field: {
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    text: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18
    },
    textfield: {
        color: colors.black,
        fontWeight: "400",
        fontSize: 16,
        marginLeft: 10
    },
    button: {
        height: 60,
        borderRadius: 12,
        position: 'absolute',
        bottom: 20,
        width: WidthDevice - 40,
        left: 20,
        // transform: [
        //     { translateX: -150 },
        // ],
    },


})

export default RegisterRules;
