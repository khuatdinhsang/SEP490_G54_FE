import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SCREENS_NAME } from '../../navigator/const';
import { ScrollView } from 'react-native-gesture-handler';
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import ProgressHeader from '../../component/progessHeader';
import colors from '../../constant/color';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import CheckBox from '@react-native-community/checkbox';
import { WidthDevice } from '../../util/Dimenssion';
import { IMAGE } from '../../constant/image';
import SelectDate from '../../component/inputSelectDate';
import DaySelection from '../../component/chooseDate';
import { TypeActivityRecord, TypeDate } from './const';
import { planService } from '../../services/plan';
import LoadingScreen from '../../component/loading';

type dataType = {
    id: number,
    name: string,
    value: string
}
type dataTypeWorkOut = {
    id: number,
    intensity: string,
    des: string,
    image: string,
    planType: string
}
const WorkOut = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const [isChecked, setIsChecked] = useState(false);
    const [hour, setHours] = useState<number>(0);
    const [minute, setMinutes] = useState<number>(0);
    const [showHourScroll, setShowHourScroll] = useState(false);
    const [showMinuteScroll, setShowMinuteScroll] = useState(false);
    const handleHourChange = (newHour: number) => setHours(newHour);
    const handleMinuteChange = (newMinute: number) => setMinutes(newMinute);
    const toggleHourScroll = () => setShowHourScroll(!showHourScroll);
    const toggleMinuteScroll = () => setShowMinuteScroll(!showMinuteScroll);
    const [selectedItem, setSelectedItem] = useState<string | undefined>();
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    const initData = [
        { id: 1, name: t("common.text.monday"), value: TypeDate.MONDAY },
        { id: 2, name: t("common.text.tuesday"), value: TypeDate.TUESDAY },
        { id: 3, name: t("common.text.wednesday"), value: TypeDate.WEDNESDAY },
        { id: 4, name: t("common.text.thursday"), value: TypeDate.THURSDAY },
        { id: 5, name: t("common.text.friday"), value: TypeDate.FRIDAY },
        { id: 6, name: t("common.text.saturday"), value: TypeDate.SATURDAY },
        { id: 7, name: t("common.text.sunday"), value: TypeDate.SUNDAY },
    ]
    const initDataWorkOut = [
        {
            id: 1,
            intensity: t("planManagement.text.highIntensity"),
            des: t("planManagement.text.examplesHighIntensity"),
            image: IMAGE.PLAN_MANAGEMENT.SOCCER,
            planType: TypeActivityRecord.HEAVY
        },
        {
            id: 2,
            intensity: t("planManagement.text.mediumIntensity"),
            des: t("planManagement.text.exampleMediumIntensity"),
            image: IMAGE.PLAN_MANAGEMENT.BADMINTON,
            planType: TypeActivityRecord.MEDIUM
        },
        {
            id: 3,
            intensity: t("planManagement.text.lowIntensity"),
            des: t("planManagement.text.examplesLowIntensity"),
            image: IMAGE.PLAN_MANAGEMENT.BOLLING,
            planType: TypeActivityRecord.LIGHT
        },
    ]
    const handleSelectItem = (itemId: number) => {
        const activityChoose = initDataWorkOut.find((item) => item.id === itemId)
        setSelectedItem(activityChoose?.planType);
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
    const [data, setData] = useState<dataType[]>(initData);
    const [dataWorkOut, setDataWorkOut] = useState<dataTypeWorkOut[]>(initDataWorkOut);
    const toggleCheckBox = () => {
        if (isChecked) {
            setSelectedDays([]);
        } else {
            setSelectedDays(initData.map(item => item.id));
        }
        setIsChecked(!isChecked);
    };
    const nextPage = async (): Promise<void> => {
        setIsLoading(true)
        const selectedDaysModify = data.filter(item => selectedDays.includes(item.id))
        const schedule = selectedDaysModify.map(item => item.value)
        const convertTime = hour * 60 + minute;
        const dataSubmit = {
            schedule,
            planType: selectedItem,
            planDuration: Number(convertTime),
            weekStart: new Date().toISOString(),
        }
        try {
            const res = await planService.postActivity(dataSubmit)
            if (res.code === 200) {
                setIsLoading(false)
                navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.FOOD_INTAKE);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 401) {
                setMessageError(error.response.data.message);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        }
        finally {
            setIsLoading(false)
        }
    };
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.POSITIVE_MIND);
    };
    const isNextButtonDisabled = !(hour && minute && selectedDays.length > 0 && selectedItem);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {(showMinuteScroll || showHourScroll) && (
                <View style={styles.boxShadow}></View>
            )}
            <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        isTextRight={true}
                        textRight={t("common.text.next")}
                        text={t("planManagement.text.workout")}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={nextPage}
                        textRightStyle={{ color: !isNextButtonDisabled ? colors.primary : colors.gray_G04 }}
                    />
                </View>
                <ProgressHeader index={[0, 1]} length={5} />
                <View style={{ marginTop: 20, marginHorizontal: 20 }}>
                    <Text style={styles.textPlan}>{t("planManagement.text.workoutPlan")}</Text>
                    <View style={[flexRowSpaceBetween, { marginTop: 30, marginBottom: 10 }]}>
                        <Text style={styles.textChooseDay}>
                            {t("planManagement.text.pleaseChooseDay")}
                        </Text>
                        <View style={flexRow}>
                            <Text style={styles.textChooseDay}>
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
                    <Text style={[styles.textChooseDay, { marginTop: 20, marginBottom: 10 }]}>{t("planManagement.text.timeWorkoutInDay")}</Text>
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
                    <View style={{ marginTop: 25 }}>
                        <Text style={styles.textChooseDay}>{t("planManagement.text.movementIntensity")}</Text>
                        <Text style={styles.textRecommend}>{t("planManagement.text.recommendation")}</Text>
                        {dataWorkOut && dataWorkOut.map((item) => {
                            return (
                                <Pressable onPress={() => handleSelectItem(item.id)}
                                    key={item.id}
                                    style={[flexRow, styles.example, { backgroundColor: selectedItem === item.planType ? colors.orange_01 : colors.white, borderColor: selectedItem === item.planType ? colors.primary : colors.gray }]}>
                                    <Image source={item.image || IMAGE.PLAN_MANAGEMENT.SOCCER} />
                                    <View style={styles.detailExample}>
                                        <Text style={[styles.textPlan, { color: selectedItem === item.planType ? colors.primary : colors.gray_G07 }]}>{item.intensity}</Text>
                                        <Text style={[styles.textChooseDay, { fontSize: 12 }]}>{item.des}</Text>
                                    </View>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={isNextButtonDisabled}
                    onPress={() => nextPage()}
                    style={[styles.button, { backgroundColor: isNextButtonDisabled ? colors.gray_G02 : colors.primary }]}>
                    <Text style={[styles.text, { color: isNextButtonDisabled ? colors.gray_G04 : colors.white, opacity: isNextButtonDisabled ? 0.5 : 1 }]}>
                        {t('common.text.next')}
                    </Text>
                </Pressable>
            </View>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    )
}

export default WorkOut;

const styles = StyleSheet.create({
    textPlan: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: 'center'
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        lineHeight: 62,
        fontWeight: '500',
        fontSize: 18,
    },

    example: {
        paddingHorizontal: 14,
        paddingVertical: 16,
        borderWidth: 1,
        borderRadius: 16,
        marginBottom: 10,
    },
    boxShadow: {
        width: WidthDevice,
        position: 'absolute',
        height: '100%',
        backgroundColor: colors.black,
        opacity: 0.6,
        zIndex: 100,
    },
    detailExample: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flex: 1
    },
    textChooseDay: {
        fontSize: 18,
        fontWeight: '400',
        color: colors.gray_G09
    },
    textRecommend: {
        color: colors.blue_01,
        fontSize: 16,
        marginVertical: 10
    },
    bridge: {
        position: 'absolute',
        top: -20,
        transform: [{ translateX: -7.5 }],
        left: "50%"
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
        top: -15,
    },
    day: {
        paddingHorizontal: 12,
        paddingVertical: 14,
        borderRadius: 999
    },
    textInsert: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.white
    },
    textDay: {
        fontWeight: '400',
        fontSize: 18,
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
    textError: {
        color: colors.red,
        fontWeight: "500",
        fontSize: 18
    }
});
