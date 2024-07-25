import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { useTranslation } from 'react-i18next';
import ProgressHeader from '../../component/progessHeader';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import colors from '../../constant/color';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import CheckBox from '@react-native-community/checkbox';
import DaySelection from '../../component/chooseDate';
import { IMAGE } from '../../constant/image';
import TimerModule from '../../native-module/timer.module';
import { TypeDate } from './const';
import LoadingScreen from '../../component/loading';
import { medicineService } from '../../services/medicine';
import { listRegisterMedicineData, medicinePost, mentalData } from '../../constant/type/medical';
import InputNumber from '../../component/inputNumber';
import { generateRandomId, getISO8601ForSelectedDays, getMondayOfCurrentWeek, twoDigit } from '../../util';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { addRegisterMedication, addRegisterMedicationInterface, setListRegisterMedication, setListRegisterMedicationInterface } from '../../store/medication.slice';
import { offsetTime } from '../../constant';

type dataType = {
    id: number,
    name: string,
    value: string,
    dayWeek: number
}

const AddMedication = ({ route }: any) => {
    const { t, i18n } = useTranslation();
    const [isChecked, setIsChecked] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [selectedDays, setSelectedDays] = useState<number[]>([]);
    const [hour, setHours] = useState<string>("");
    const [minute, setMinutes] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const dispatch = useDispatch()
    const initData = [
        { id: 1, name: t("common.text.monday"), value: TypeDate.MONDAY, dayWeek: 2 },
        { id: 2, name: t("common.text.tuesday"), value: TypeDate.TUESDAY, dayWeek: 3 },
        { id: 3, name: t("common.text.wednesday"), value: TypeDate.WEDNESDAY, dayWeek: 4 },
        { id: 4, name: t("common.text.thursday"), value: TypeDate.THURSDAY, dayWeek: 5 },
        { id: 5, name: t("common.text.friday"), value: TypeDate.FRIDAY, dayWeek: 6 },
        { id: 6, name: t("common.text.saturday"), value: TypeDate.SATURDAY, dayWeek: 7 },
        { id: 7, name: t("common.text.sunday"), value: TypeDate.SUNDAY, dayWeek: 1 },
    ];

    const [data, setData] = useState<dataType[]>(initData);
    const [dataMedication, setDataMedication] = useState<mentalData[]>([]);
    const [selectedMedication, setSelectedMedication] = useState<number | undefined>();
    const listRegisterMedication = useSelector((state: RootState) => state.medication.listRegisterMedication);
    const listRegisterMedicationInterface = useSelector((state: RootState) => state.medication.listRegisterMedicationInterface);
    const handleSetHour = (value: string) => {
        if (Number(value) > 24) {
            return
        }
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setHours(value);
        }
    }
    const handleSetMinute = (value: string) => {
        if (Number(value) > 59) {
            return
        }
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setMinutes(value);
        }
    }
    useEffect(() => {
        const fetchDataMedication = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const res = await medicineService.getListMedicineType();
                if (res.code === 200) {
                    setIsLoading(false);
                    setDataMedication(res.result);
                    setMessageError("");
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } catch (error: any) {
                if (error?.response?.status === 400) {
                    setMessageError(error.response.data.message);
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchDataMedication();
    }, []);

    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.REGISTER_MEDICATION);
    };

    const nextPage = () => {
        const preHours = twoDigit(Number(hour));
        const preMinutes = twoDigit(Number(minute));
        const times = getISO8601ForSelectedDays(preHours, preMinutes, selectedDays);
        const dataSubmit = {
            medicineTypeId: selectedMedication,
            weekStart: getMondayOfCurrentWeek().split("T")[0],
            schedule: times
        };
        const dayChoose = data.filter(item => selectedDays.includes(item.id));
        const selectedMedicineTitle = dataMedication.find((item) => item.id === selectedMedication)?.title || '';
        const dataInterface: listRegisterMedicineData | any = {
            medicineTypeId: selectedMedication || 0,
            weekday: dayChoose.map((item) => item.name),
            time: `${twoDigit(Number(hour))}:${twoDigit(Number(minute))}:00`,
            medicineTitle: selectedMedicineTitle.toString(),
            indexDay: dayChoose.map((item) => item.dayWeek),
        };

        const isDuplicate = listRegisterMedicationInterface.some(item => {
            const hasSameDay = item.indexDay.some((day: any) => dataInterface.indexDay.includes(day));
            return item.medicineTypeId === dataInterface.medicineTypeId &&
                item.time === dataInterface.time &&
                hasSameDay;
        });
        console.log("130", isDuplicate)
        if (!isDuplicate) {
            dispatch(addRegisterMedication(dataSubmit));
            dispatch(addRegisterMedicationInterface(dataInterface));
            navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.LIST_REGISTER_MEDICATION, {
                listRegisterMedicationSubmit: [...listRegisterMedication, dataSubmit],
                listRegisterMedicationInterface: [...listRegisterMedicationInterface, dataInterface]
            });
        } else {
            setMessageError("Medication with the same date, time, and type already exists.");
        }
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
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        isTextRight={true}
                        textRight={t("common.text.next")}
                        textRightStyle={{ color: hour && minute && selectedDays.length ? colors.primary : colors.gray_G04 }}
                        text={t("planManagement.text.takingMedication")}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={() => {
                            if (hour && minute && selectedDays.length) {
                                nextPage();
                            }
                        }}
                        disabledRight={hour && minute && selectedDays.length ? false : true}
                    />
                </View>
                <ProgressHeader index={[0, 1, 2, 3]} length={5} />
                <ScrollView contentContainerStyle={{ paddingBottom: hour || minute ? 100 : 150 }}>
                    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                        <Text style={styles.textPlan}>{t("planManagement.text.typesMedication")}</Text>
                        <Text style={styles.textPlan}>{t("planManagement.text.selectDayTime")}</Text>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.textChooseMedication}>{t("planManagement.text.pleaseChooseMedication")}</Text>
                            <View style={[flexRowSpaceBetween, { flexWrap: 'wrap' }]}>
                                {dataMedication && dataMedication.map((item) => {
                                    return (
                                        <Pressable
                                            onPress={() => handleSelectMedication(item.id)}
                                            key={item.id}
                                            style={[styles.chooseMedication, {
                                                backgroundColor: item.id === selectedMedication ? colors.orange_01 : colors.white
                                            }]}>
                                            <Text
                                                style={[styles.textMedication, { color: item.id === selectedMedication ? colors.orange_04 : colors.textGray, borderColor: selectedMedication === item.id ? colors.orange_04 : colors.gray_G03 }]}>
                                                {item.title}</Text>
                                        </Pressable>
                                    );
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
                                    <InputNumber
                                        textRight={t('common.text.hours')}
                                        value={hour}
                                        keyboardType={"numeric"}
                                        handleSetValue={handleSetHour}
                                        styleInput={{ paddingLeft: 50 }}
                                    />
                                </View>
                                <View style={{ width: '47%' }}>
                                    <InputNumber
                                        textRight={t('common.text.minutes')}
                                        value={minute}
                                        keyboardType={"numeric"}
                                        handleSetValue={handleSetMinute}
                                        styleInput={{ paddingLeft: 50 }}
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
                        {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
                    </View>
                </ScrollView >
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={hour && minute && selectedDays.length ? false : true}
                    onPress={nextPage}
                    style={[styles.button, { backgroundColor: (hour && minute && selectedDays.length > 0 && selectedMedication) ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.text, { color: (hour && minute && selectedDays.length > 0 && selectedMedication) ? colors.white : colors.gray_G04 }]}> {t('common.text.next')}</Text>
                </Pressable>
            </View>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
};

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
        paddingVertical: 10,
    },
    button: {
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bridge: {
        position: 'absolute',
        top: -5,
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
        fontWeight: '500',
        fontSize: 18,
    },
    textError: {
        color: colors.red,
        fontWeight: "500",
        fontSize: 14,
        marginTop: 10
    }
});

export default AddMedication;
