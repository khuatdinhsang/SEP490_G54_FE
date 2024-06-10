import React, { useEffect, useRef, useState } from 'react';
import * as yup from "yup";
import { Button, FlatList, Image, Pressable, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import DatePicker from 'react-native-date-picker';
import { IMAGE } from '../../constant/image';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import 'moment/locale/ko';
import moment from 'moment';
import { paddingHorizontalScreen } from '../../styles/padding';
import CountdownTimer from '../../component/countDownTime';

const ForgotSuccess = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();

    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    }

    return (
        <SafeAreaView style={styles.container} >
            <Pressable style={styles.buttonCancel} onPress={loginPage}>
                <Image
                    source={require('../../assets/image/register/icon_X.png')} />
            </Pressable>
            <View style={{ marginTop: 15, position: 'relative', height: HeightDevice }}>
                <Text style={[styles.text, { textAlign: 'center' }]}>{t("authentication.findPassword")}</Text>
                <View style={styles.line}></View>
                <View style={[flexRowCenter, styles.content, { flexDirection: 'column' }]}>
                    <View style={[flexRowCenter, { width: 72, height: 72, backgroundColor: colors.orange_02, borderRadius: 36, marginBottom: 20 }]}>
                        <Image
                            style={{ width: '33%', height: '25%' }}
                            source={IMAGE.ICON_CHECK} tintColor={colors.primary} />
                    </View>
                    <Text style={{ fontWeight: '700', fontSize: 24, color: colors.black, marginBottom: 10 }}>{t("common.text.successForgotPassword")}</Text>
                    <Text style={{ fontWeight: '400', fontSize: 18, color: colors.gray_G06 }}>{t("common.text.loginAgain")}</Text>
                </View>
                <Pressable onPress={() => { loginPage() }} style={[styles.button, { backgroundColor: colors.primary }]} >
                    <Text style={styles.textButton}>{t("common.text.confirm")}</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HeightDevice,
    },
    buttonCancel: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 100
    },
    text: {
        fontWeight: '400',
        color: colors.black,
        fontSize: 18,
    },
    content: {
        paddingHorizontal: paddingHorizontalScreen,
        height: '70%'
    },
    line: {
        marginTop: 15,
        height: 2,
        backgroundColor: colors.gray
    },
    textButton: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18
    },
    button: {
        height: 60,
        borderRadius: 12,
        position: 'absolute',
        bottom: 35,
        width: WidthDevice - 40,
        left: 20,
    },
})

export default ForgotSuccess;
