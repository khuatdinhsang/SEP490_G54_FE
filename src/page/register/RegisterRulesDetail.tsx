import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import 'moment/locale/ko';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGE } from '../../constant/image';
import HeaderNavigatorComponent from '../../component/header-navigator';

const RegisterRulesDetail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={t('common.text.termsOfUse')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={styles.line}></View>
            <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 20 }}>
                <Text style={[styles.text, { marginTop: 20 }]}>{t("common.text.article1")}</Text>
                <Text style={styles.text}>{t("common.text.des1")}</Text>
                <Text style={[styles.text, { marginTop: 20 }]}>{t("common.text.article2")}</Text>
                <Text style={styles.text}>{t("common.text.des2_1")}</Text>
                <Text style={styles.text}>{t("common.text.des2_2")}</Text>
                <Text style={styles.text}>{t("common.text.des2_3")}</Text>
                <Text style={[styles.text, { marginTop: 20 }]}>{t("common.text.article3")}</Text>
                <Text style={styles.text}>{t("common.text.des3_1")}</Text>
                <Text style={styles.text}>{t("common.text.des3_2")}</Text>
                <Text style={styles.text}>{t("common.text.des3_3")}</Text>
                <Text style={styles.text}>{t("common.text.des3_4")}</Text>
                <View style={{ marginBottom: 40 }}></View>
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        paddingHorizontal: 20,
    },
    line: {
        height: 2,
        backgroundColor: colors.gray_G02,
    },
    text: {
        color: colors.gray_G05,
        fontWeight: "500",
        fontSize: 16
    }
})

export default RegisterRulesDetail;
