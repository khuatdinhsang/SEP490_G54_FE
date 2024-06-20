import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';
import { HeightDevice } from '../../../../util/Dimenssion';
import BarChart from '../../../../component/bar-chart';


const NumericalRecordChart = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    const navigateNumericalRecord = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}

                        text={`${t('recordHealthData.glycatedHemoglobin')}/${t('recordHealthData.cholesterol')}/${t('recordHealthData.bloodSugar')}`}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable
                        onPress={navigateNumericalRecord}
                        style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('recordHealthData.bloodCountRecord')}
                        </Text>
                    </Pressable>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.viewChart')}
                        </Text>
                    </Pressable>
                </View>
                {false ?
                    <View style={[flexCenter, { height: '60%' }]}>
                        <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                        <Text style={styles.textTitle}>{t('recordHealthData.haven\'tEnteredAnyNumbers')}</Text>
                        <Text style={styles.textDesc}>{t('recordHealthData.enterNumberFirst')}</Text>
                        <Pressable
                            onPress={navigateNumericalRecord}
                            style={styles.button}>
                            <Text style={styles.textButton}>{t('recordHealthData.enterRecord')}</Text>
                        </Pressable>
                    </View>
                    : <BarChart
                        data={[
                            { x: '9/11', y: 2 },
                            { x: '9/13', y: 2 },
                            { x: '9/15', y: 3 },
                            { x: '9/20', y: 3, label: '3점' },
                            { x: '10/4', y: 3 },
                            { x: '10/5', y: 3 },
                        ]}
                    />
                }
            </ScrollView>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        height: HeightDevice
    }, navigate: {
        height: 48,
        width: '50%'
    },
    active: {
        borderBottomWidth: 2,
        borderColor: colors.orange_04,
    },
    textNavigate: {
        textAlign: 'center',
        lineHeight: 48,
        fontWeight: '700',
        fontSize: 16
    },
    header: {
        paddingHorizontal: 20,
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 20,
        color: colors.gray_G10,
        textAlign: "center",
    },
    textDesc: {
        fontWeight: '400',
        fontSize: 16,
        color: colors.gray_G06,
        textAlign: "center",
    },
    textButton: {
        fontWeight: "500",
        fontSize: 16,
        textAlign: "center",
        color: colors.white
    },
    button: {
        marginTop: 20,
        backgroundColor: colors.gray_G08,
        borderRadius: 8,
        paddingVertical: 17,
        width: 140
    }
})
export default NumericalRecordChart