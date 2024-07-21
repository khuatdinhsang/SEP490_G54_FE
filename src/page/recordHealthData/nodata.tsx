import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import RecordComponent from './component/Record';
import { recordData } from './contant';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { weeklyReviewService } from '../../services/weeklyReviews';
import { getMondayOfCurrentWeek } from '../../util';
import LoadingScreen from '../../component/loading';


const NoDataRecordHealthData = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.HOME.MAIN)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={t('recordHealthData.record')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={[flexCenter, { marginTop: 100 }]}>
                <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                <Text style={styles.textTitle}>{t('evaluate.noPlan')}</Text>
                <Text style={styles.textDesc}>{t('evaluate.actionPlan')}</Text>
                <Pressable
                    onPress={() => {
                        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.MAIN_INDEX);
                    }}
                    style={styles.buttonChart}>
                    <Text style={styles.textButtonChart}>{t('evaluate.buttonActionPlan')}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        paddingBottom: 20
    },
    header: {
        backgroundColor: colors.white,
        paddingHorizontal: 20
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 20,
        color: colors.gray_G10,
        textAlign: 'center',
    },
    textDesc: {
        fontWeight: '400',
        fontSize: 16,
        color: colors.gray_G06,
        textAlign: 'center',
    },
    buttonChart: {
        marginTop: 20,
        backgroundColor: colors.gray_G08,
        borderRadius: 8,
        paddingVertical: 17,
        width: 140,
    },
    textButtonChart: {
        fontWeight: '500',
        fontSize: 16,
        textAlign: 'center',
        color: colors.white,
    }
})
export default NoDataRecordHealthData