import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image'; // Assuming you have IMAGE imported from your constant files
import { SCREENS_NAME } from '../../../../navigator/const';
import { planService } from '../../../../services/plan';
import { convertObjectToArray, getMondayOfCurrentWeek } from '../../../../util';
import { HeightDevice, WidthDevice } from '../../../../util/Dimenssion';
import LoadingScreen from '../../../../component/loading';
import { offsetTime } from '../../../../constant';

const MedicationRecord = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [dataListMedication, setDataListMedication] = useState<any[]>([]);
    const today: string = new Date().toLocaleString('en-US', { weekday: 'long' });
    const [checkIsExits, setCheckIsExits] = useState<boolean>(false);
    const [allItemsSelected, setAllItemsSelected] = useState<boolean>(false);
    const isEditable = route?.params?.isEditable;
    const [isEdit, setIsEdit] = useState<boolean>(isEditable)
    useEffect(() => {
        const fetchDataListMedication = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const res = await planService.getListMedicationRecords(getMondayOfCurrentWeek().split("T")[0]);
                if (res.code === 200) {
                    setDataListMedication(res.result);
                    setMessageError("");
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } catch (error: any) {
                if (error?.response?.status === 400 || error?.response?.status === 401) {
                    setMessageError(error.response.data.message);
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        fetchDataListMedication();
    }, []);

    useEffect(() => {
        const checkTodayExists = dataListMedication.some(item => item.weekday.includes(today));
        setCheckIsExits(checkTodayExists);
    }, [dataListMedication, today]);

    useEffect(() => {
        const allSelected = dataListMedication
            .filter(item => item.weekday.includes(today))
            .every(item => selectedItems[item.medicineTypeId] !== undefined);
        setAllItemsSelected(allSelected);
    }, [selectedItems, dataListMedication, today]);

    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    };

    const nextPage = async (): Promise<void> => {
        setIsLoading(true);
        const dataSubmit = {
            date: new Date().toISOString().split("T")[0],
            status: true,
            medicineTypeId: convertObjectToArray(selectedItems)
        };
        try {
            const res = await planService.putMedicine(dataSubmit);
            if (res.code === 200) {
                setMessageError("");
                setIsLoading(false);
                setIsEdit(false)
                navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART, { isEditable: false });
            } else {
                setMessageError("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 401) {
                setMessageError(error.response.data.message);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleViewChart = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART, { isEditable: isEdit });
    };

    const handleSelectItem = (itemId: number, isSelected: boolean) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [itemId]: isSelected
        }));
    };

    const isButtonSelected = (itemId: number, isSelected: boolean) => selectedItems[itemId] === isSelected;

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t('planManagement.text.takingMedication')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.medicationProfile')}
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
                {isEdit ? (
                    dataListMedication.length > 0 ? (
                        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                            {dataListMedication.map((item) => (
                                item.weekday.includes(today) && (
                                    <View style={{ marginBottom: 30 }} key={item.medicineTypeId}>
                                        <View style={[flexRow, { flexWrap: 'wrap' }]}>
                                            <Text style={styles.text}>오늘</Text>
                                            {/* <Text style={[styles.text, { color: colors.orange_04 }]}>{convertFromUTC(item.time, offsetTime)}</Text> */}
                                            <Text style={[styles.text, { color: colors.orange_04 }]}>{item.time}</Text>
                                            <Text style={styles.text}>에</Text>
                                            <Text style={[styles.text, { color: colors.orange_04 }]}>{item.medicineTitle}</Text>
                                            <Text style={styles.text}>을 먹었나요?</Text>
                                        </View>
                                        <View style={[flexRowSpaceBetween, { marginTop: 10 }]}>
                                            <Pressable
                                                onPress={() => handleSelectItem(item.medicineTypeId, true)}
                                                style={[
                                                    flexRowCenter,
                                                    styles.buttonBox,
                                                    {
                                                        width: '47%',
                                                        borderColor: isButtonSelected(item.medicineTypeId, true) ? colors.primary : colors.gray,
                                                        backgroundColor: isButtonSelected(item.medicineTypeId, true) ? colors.orange_02 : colors.white
                                                    }
                                                ]}
                                            >
                                                <Text style={{ color: isButtonSelected(item.medicineTypeId, true) ? colors.primary : colors.textGray }}>
                                                    {t("common.text.yes")}
                                                </Text>
                                            </Pressable>
                                            <Pressable
                                                onPress={() => handleSelectItem(item.medicineTypeId, false)}
                                                style={[
                                                    flexRowCenter,
                                                    styles.buttonBox,
                                                    {
                                                        width: '47%',
                                                        borderColor: isButtonSelected(item.medicineTypeId, false) ? colors.primary : colors.gray,
                                                        backgroundColor: isButtonSelected(item.medicineTypeId, false) ? colors.orange_02 : colors.white
                                                    }
                                                ]}
                                            >
                                                <Text style={{ color: isButtonSelected(item.medicineTypeId, false) ? colors.primary : colors.textGray }}>
                                                    {t("common.text.no")}
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                )
                            ))}
                            {messageError && !isLoading && <Text style={[styles.text, { color: colors.red }]}>{messageError}</Text>}
                        </View>
                    ) : (
                        <View style={styles.emptyContainer}>
                            <Image source={IMAGE.RECORD_DATA.CALENDAR} />
                            <Text style={[styles.text, { fontWeight: "700" }]}>{t('recordHealthData.noMedicationSchedule')}</Text>
                        </View>
                    )
                ) : (
                    <View style={[flexCenter, { marginTop: 100 }]}>
                        <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                        <Text style={styles.textTitle}>{t('recordHealthData.haven\'tEnteredAnyNumbers')}</Text>
                        <Text style={styles.textDesc}>{t('recordHealthData.enterNumberFirst')}</Text>
                        <Pressable
                            onPress={() => {
                                navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART, { isEditable: false });
                            }}
                            style={styles.buttonChart}>
                            <Text style={styles.textButtonChart}>{t('recordHealthData.enterRecord')}</Text>
                        </Pressable>
                    </View>
                )}

            </ScrollView>
            {
                checkIsExits && isEdit && (
                    <View style={styles.buttonContainer}>
                        <Pressable
                            disabled={!allItemsSelected}
                            onPress={nextPage}
                            style={[flexCenter, styles.button, { backgroundColor: allItemsSelected ? colors.primary : colors.gray_G02 }]}>
                            <Text style={[styles.textButton, { color: allItemsSelected ? colors.white : colors.gray_G04 }]}>
                                {t('recordHealthData.goToViewChart')}
                            </Text>
                        </Pressable>
                    </View>
                )
            }
            {isLoading && <LoadingScreen />}
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        paddingBottom: 100,
    },
    navigate: {
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
    text: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.gray_G07,
        flexWrap: 'wrap'
    },
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
    },
    textInput: {
        textAlign: 'center',
        lineHeight: 56,
        fontWeight: "700",
        fontSize: 18
    },
    buttonBox: {
        borderRadius: 8,
        borderWidth: 1,
        height: 60,
    },
    emptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 100
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
});

export default MedicationRecord;
