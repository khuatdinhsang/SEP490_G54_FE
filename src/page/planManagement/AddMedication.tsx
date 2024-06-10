import React, { useState } from 'react'
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../component/header-navigator'
import { useTranslation } from 'react-i18next';
import ProgressHeader from '../../component/progessHeader';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import colors from '../../constant/color';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import CheckBox from '@react-native-community/checkbox';
import DaySelection from '../../component/chooseDate';
import SelectDate from '../../component/inputSelectDate';
import { IMAGE } from '../../constant/image';
import TimerModule from '../../native-module/timer.module';
type dataType = {
    id: number,
    name: string
}
const AddMedication = () => {
    const { t, i18n } = useTranslation();
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [hour, setHours] = useState<number>();
    const [minute, setMinutes] = useState<number>();
    const [showHourScroll, setShowHourScroll] = useState(false);
    const [showMinuteScroll, setShowMinuteScroll] = useState(false);
    const handleHourChange = (newHour: number) => setHours(newHour);
    const handleMinuteChange = (newMinute: number) => setMinutes(newMinute);
    const toggleHourScroll = () => setShowHourScroll(!showHourScroll);
    const toggleMinuteScroll = () => setShowMinuteScroll(!showMinuteScroll);
    const initData = [
        { id: 1, name: t("common.text.monday") },
        { id: 2, name: t("common.text.tuesday") },
        { id: 3, name: t("common.text.wednesday") },
        { id: 4, name: t("common.text.thursday") },
        { id: 5, name: t("common.text.friday") },
        { id: 6, name: t("common.text.saturday") },
        { id: 7, name: t("common.text.sunday") },
    ]
    const initMedication = [
        { id: 1, name: t("planManagement.medication.highBloodPressure") },
        { id: 2, name: t("planManagement.medication.hyperlipidemia") },
        { id: 3, name: t("planManagement.medication.diabetes") },
        { id: 4, name: t("planManagement.medication.other") },
    ]
    const [data, setData] = useState<dataType[]>(initData);
    const [dataMedication, setDataMedication] = useState<dataType[]>(initMedication);
    const [selectedMedication, setSelectedMedication] = useState<number>();

    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.REGISTER_MEDICATION);
    };
    const nextPage = () => {
        // TimerModule.createSchedule({
        //     id: '1',
        //     title: 'DucAnh',
        //     description: 'DucAnh',
        //     hour: 23,
        //     minute: 5,
        //     daysOfWeek: [1, 2, 3, 4, 5, 6, 7],
        // });
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.LIST_REGISTER_MEDICATION);
    };
    const handleSelectDays = (itemId: number) => {
        setSelectedDays((prevSelectedItems) => {
            const newSelectedDays = prevSelectedItems.includes(itemId)
                ? prevSelectedItems.filter(item => item !== itemId)
                : [...prevSelectedItems, itemId];
            setIsChecked(newSelectedDays.length === initData.length);
            return newSelectedDays;
        });
    };
    const toggleCheckBox = () => {
        if (isChecked) {
            setSelectedDays([]);
        } else {
            setSelectedDays(initData.map(item => item.id));
        }
        setIsChecked(!isChecked);
    };
    const handleSelectMedication = (itemId: number) => {
        setSelectedMedication(itemId);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        isTextRight={true}
                        textRight={t("common.text.next")}
                        textRightStyle={{ color: hour && minute && selectedDays.length ? colors.primary : colors.gray_G04 }}
                        text={t("planManagement.text.takingMedication")}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={nextPage}
                    />
                </View>
                <ProgressHeader index={[0, 1, 2, 3]} length={5} />
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <Text style={styles.textPlan}>{t("planManagement.text.typesMedication")}</Text>
                    <Text style={styles.textPlan}>{t("planManagement.text.selectDayTime")}</Text>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.textChooseMedication}>{t("planManagement.text.pleaseChooseMedication")}</Text>
                        <View style={[flexRowSpaceBetween, { flexWrap: 'wrap' }]}>
                            {dataMedication && dataMedication.map((item) => {
                                return (
                                    <Pressable
                                        onPress={() => handleSelectMedication(item.id)} key={item.id}
                                        style={[styles.chooseMedication, {
                                            backgroundColor: item.id === selectedMedication ? colors.orange_01 : colors.white


                                        }]}>
                                        <Text
                                            style={[styles.textMedication, { color: item.id === selectedMedication ? colors.orange_04 : colors.textGray, borderColor: selectedMedication === item.id ? colors.orange_04 : colors.gray_G03 }]}>
                                            {item.name}</Text>
                                    </Pressable>
                                )
                            })}
                        </View>
                    </View>
                    <View style={[flexRowSpaceBetween, { marginTop: 10, marginBottom: 10 }]}>
                        <Text style={styles.textChooseMedication}>
                            {t("planManagement.text.pleaseChooseDay")}
                        </Text>
                        <View style={flexRow}>
                            <Text style={styles.textChooseMedication}>
                                {t("common.text.selectAll")}
                            </Text>
                            <CheckBox
                                disabled={false}
                                value={isChecked}
                                onValueChange={toggleCheckBox}
                                tintColors={{ true: colors.primary, false: colors.gray }}
                            />
                        </View>
                    </View>
                    <DaySelection
                        data={data}
                        selectedDays={selectedDays}
                        handleSelectDays={handleSelectDays}
                        isChecked={isChecked}
                    />
                    <View>
                        <Text style={[styles.textChooseMedication, { marginTop: 30, marginBottom: 10 }]}>{t("planManagement.text.timeWorkoutInDay")}</Text>
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
                        {(!hour && !minute) && <View style={flexRowCenter}>
                            <View style={[flexRow, styles.bridge]}>
                                <View style={styles.diamond} />
                            </View>
                            <View style={[flexRow, styles.insertData]}>
                                <Text style={styles.textInsert}>{t("planManagement.text.insertData")}</Text>
                                <Image source={IMAGE.ICON_X} tintColor={colors.white} />
                            </View>
                        </View>}
                    </View>
                </View>
            </ScrollView >
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={hour && minute && selectedDays.length ? false : true}
                    onPress={() => nextPage()}
                    style={[styles.button, { backgroundColor: (hour && minute && selectedDays.length > 0 && selectedMedication) ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.text, { color: (hour && minute && selectedDays.length > 0 && selectedMedication) ? colors.white : colors.gray_G04 }]}> {t('common.text.next')}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textPlan: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: 'center'
    },
    textChooseMedication: {
        fontWeight: '400',
        fontSize: 18,
        color: colors.gray_G09
    },
    // choose Medication
    chooseMedication: {
        width: '48%',
        marginBottom: 10,
        height: 70
    },
    textMedication: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 8,
        lineHeight: 70
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 20,
        marginBottom: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    button: {
        height: 60,
        borderRadius: 12,
    },
    bridge: {
        position: 'absolute',
        top: -5,
    },
    diamond: {
        width: 15,
        height: 15,
        backgroundColor: colors.green,
        transform: [{ rotate: '45deg' }],
        zIndex: 100
    },
    insertData: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: colors.green,
        position: 'absolute',
        zIndex: 100,
        top: 0,
    },
    textInsert: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.white
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        lineHeight: 62,
        fontWeight: '500',
        fontSize: 18,
    },
})
export default AddMedication
