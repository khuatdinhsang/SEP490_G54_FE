import React, { useEffect, useRef, useState } from 'react';
import * as yup from "yup";
import { Button, FlatList, Image, Pressable, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import DatePicker from 'react-native-date-picker';
import { dataDiseases, illnessHistoryData } from '../../constant/data/diseases';
import { IMAGE } from '../../constant/image';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import 'moment/locale/ko';
import moment from 'moment';
import { paddingHorizontalScreen } from '../../styles/padding';
import CountdownTimer from '../../component/countDownTime';
import HeaderNavigatorComponent from '../../component/header-navigator';

const PlanSuccess = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();

    const homePage = () => {
        navigation.navigate(SCREENS_NAME.HOME.MAIN)
    }
    return (
        <SafeAreaView style={styles.container} >
            <HeaderNavigatorComponent
                isIconXRight={true}
                text={t("common.text.complete")}
                handleClickIconRight={homePage}
            />
            <View style={[flexCenter, styles.content, { flexDirection: 'column' }]}>
                <Image
                    source={IMAGE.PLAN_MANAGEMENT.PEN_BOOK} />
                <Text style={{ fontWeight: '700', fontSize: 24, color: colors.black, marginBottom: 10 }}>{t("planManagement.text.planCompleted")}</Text>
                <Text style={{ fontWeight: '400', fontSize: 18, color: colors.gray_G06 }}>{t("planManagement.text.tryHardImplementPlan")}</Text>
            </View>
            <Pressable onPress={homePage} style={[styles.button, { backgroundColor: colors.primary }]} >
                <Text style={styles.textButton}>{t("planManagement.text.gotoHome")}</Text>
            </Pressable>
        </SafeAreaView >
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HeightDevice,
        marginHorizontal: 20
    },
    buttonCancel: {
        position: 'absolute',
        right: 20,
        top: 15,
        zIndex: 100
    },
    text: {
        fontWeight: '400',
        color: colors.black,
        fontSize: 18,
    },
    content: {
        paddingHorizontal: paddingHorizontalScreen,
        height: '80%'
    },
    line: {
        marginTop: 15,
        height: 2,
        backgroundColor: colors.gray
    },
    textButton: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 60,
        fontWeight: "500",
        fontSize: 18
    },
    button: {
        height: 60,
        borderRadius: 12,
        position: 'absolute',
        bottom: 20,
        width: WidthDevice - 40,
    },
})

export default PlanSuccess;
