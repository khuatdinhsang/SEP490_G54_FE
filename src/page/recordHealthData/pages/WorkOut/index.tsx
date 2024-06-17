import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import InputNumber from '../../../../component/inputNumber';
import { SCREENS_NAME } from '../../../../navigator/const';
import SelectDate from '../../../../component/inputSelectDate';
import { IMAGE } from '../../../../constant/image';

type dataTypeWorkOut = {
    id: number,
    intensity: string,
    des: string,
    image: string
}
const WorkOutRecord = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [hour, setHours] = useState<number>();
    const [minute, setMinutes] = useState<number>();
    const [selectedItem, setSelectedItem] = useState<number>();
    const [showHourScroll, setShowHourScroll] = useState(false);
    const [showMinuteScroll, setShowMinuteScroll] = useState(false);
    const handleHourChange = (newHour: number) => setHours(newHour);
    const handleMinuteChange = (newMinute: number) => setMinutes(newMinute);
    const toggleHourScroll = () => setShowHourScroll(!showHourScroll);
    const toggleMinuteScroll = () => setShowMinuteScroll(!showMinuteScroll);
    const initDataWorkOut = [
        {
            id: 1,
            intensity: t("planManagement.text.highIntensity"),
            des: t("planManagement.text.examplesHighIntensity"),
            image: IMAGE.PLAN_MANAGEMENT.SOCCER
        },
        {
            id: 2,
            intensity: t("planManagement.text.mediumIntensity"),
            des: t("planManagement.text.exampleMediumIntensity"),
            image: IMAGE.PLAN_MANAGEMENT.BADMINTON
        },
        {
            id: 3,
            intensity: t("planManagement.text.lowIntensity"),
            des: t("planManagement.text.examplesLowIntensity"),
            image: IMAGE.PLAN_MANAGEMENT.BOLLING
        },
    ]
    const [dataWorkOut, setDataWorkOut] = useState<dataTypeWorkOut[]>(initDataWorkOut);

    const handleViewChart = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.WORD_OUT_CHART)
    }
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    const nextPage = () => {
        handleViewChart()
    }
    const handleSelectItem = (itemId: number) => {
        setSelectedItem(itemId);
    };
    const isDisable = hour && minute && selectedItem ? true : false

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t('planManagement.text.workout')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.workoutProfile')}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={handleViewChart}
                        style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('recordHealthData.viewChart')}
                        </Text>
                    </Pressable>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <Text style={styles.title}>{t('recordHealthData.pleaseChooseDay')}</Text>
                    <View>
                        <View style={[flexRowSpaceBetween, { width: '100%' }]}>
                            <View style={{ width: '47%' }}>
                                <SelectDate
                                    value={hour}
                                    text={t('common.text.hours')}
                                    textButton={t('common.text.next')}
                                    toggleModalScroll={toggleHourScroll}
                                    handleChange={handleHourChange}
                                    showScroll={showHourScroll}
                                    length={12}
                                    type={'hour'}
                                />
                            </View>
                            <View style={{ width: '47%' }}>
                                <SelectDate
                                    value={minute}
                                    text={t('common.text.minutes')}
                                    textButton={t('common.text.next')}
                                    toggleModalScroll={toggleMinuteScroll}
                                    handleChange={handleMinuteChange}
                                    showScroll={showMinuteScroll}
                                    length={12}
                                    type={'minute'}
                                />
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.title, { marginTop: 20 }]}>{t('planManagement.text.movementIntensity')}</Text>
                    {dataWorkOut && dataWorkOut.map((item) => {
                        return (
                            <Pressable onPress={() => handleSelectItem(item.id)}
                                key={item.id}
                                style={[flexRow, styles.example, { backgroundColor: selectedItem === item.id ? colors.orange_01 : colors.white, borderColor: selectedItem === item.id ? colors.primary : colors.gray }]}>
                                <Image source={item.image || IMAGE.PLAN_MANAGEMENT.SOCCER} />
                                <View style={styles.detailExample}>
                                    <Text style={[styles.textPlan, { color: selectedItem === item.id ? colors.primary : colors.gray_G07 }]}>{item.intensity}</Text>
                                    <Text style={[styles.textChooseDay, { fontSize: 12 }]}>{item.des}</Text>
                                </View>
                            </Pressable>
                        )
                    })}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={isDisable ? false : true}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: isDisable ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: isDisable ? colors.white : colors.gray_G04 }]}> {t('recordHealthData.goToViewChart')}</Text>
                </Pressable>
            </View>
        </SafeAreaView >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        paddingBottom: 100
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
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    button: {
        height: 60,
        borderRadius: 12,
        width: '100%'
    },
    textButton: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 60,
        fontWeight: "500",
        fontSize: 18
    },
    title: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.gray_G07,
        marginBottom: 20
    },
    example: {
        paddingHorizontal: 14,
        paddingVertical: 16,
        borderWidth: 1,
        borderRadius: 16,
        marginBottom: 10,
    },
    detailExample: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1
    },
    textPlan: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: 'center'
    },
    textChooseDay: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.gray_G09
    },
})
export default WorkOutRecord