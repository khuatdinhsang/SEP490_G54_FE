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
import { DateTime } from 'luxon';
import { listRegisterMedicineData } from '../../../../constant/type/medical';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANG } from '../../../home/const';

const MedicationRecord = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>({});
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [dataListMedication, setDataListMedication] = useState<listRegisterMedicineData[]>([]);
    const today: string = new Date().toLocaleString('en-US', { weekday: 'long' });
    const [allItemsSelected, setAllItemsSelected] = useState<boolean>(false);
    const isEditable = route?.params?.isEditable;
    const [isEdit, setIsEdit] = useState<boolean>(isEditable)
    console.log("se", selectedItems)
    useEffect(() => {
        const fetchDataListMedication = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const langAys = await AsyncStorage.getItem("language")
                const lang = langAys === 'en' ? LANG.EN : LANG.KR
                const res = await planService.getListMedicationRecords(getMondayOfCurrentWeek()?.split("T")[0], lang);
                if (res.code === 200) {
                    setDataListMedication(res.result);
                    console.log("37", res.result)
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
        fetchDataListMedication();
    }, []);
    useEffect(() => {
        const allSelected = dataListMedication
            .every((item) => selectedItems[item.id] !== undefined);
        setAllItemsSelected(allSelected);
    }, [selectedItems, dataListMedication, today]);

    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    };

    const nextPage = async (): Promise<void> => {
        setIsLoading(true);
        const dataSubmit = {
            date: DateTime.local()?.toString()?.split("T")[0],
            status: true,
            ids: convertObjectToArray(selectedItems)
        };
        console.log("a", dataSubmit)
        try {
            const res = await planService.putMedicine(dataSubmit);
            if (res.code === 200) {
                setMessageError("");
                setIsLoading(false);
                setIsEdit(false)
                navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART, { isEditable: false });
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

    const handleViewChart = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART, { isEditable: isEdit });
    };

    const handleSelectItem = (itemId: number, isSelected: boolean) => {
        console.log("104", itemId)
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
                    dataListMedication?.length > 0 ? (
                        <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                            {dataListMedication.map((item) => (
                                <View style={{ marginBottom: 30 }} key={item.id}>
                                    <View style={[flexRow, { flexWrap: 'wrap' }]}>
                                        <Text style={styles.text}>{t("recordHealthData.today")}</Text>
                                        <Text style={[styles.text, { color: colors.orange_04 }]}>{new Date(item.date).getHours()?.toString()?.padStart(2, '0')}:{new Date(item.date).getMinutes()?.toString()?.padStart(2, '0')}</Text>
                                        <Text style={styles.text}>{t("recordHealthData.didYouTake")}</Text>
                                        <Text style={[styles.text, { color: colors.orange_04 }]}>{item.medicineName}</Text>
                                        <Text style={styles.text}>{t("recordHealthData.?")}</Text>
                                    </View>
                                    <View style={[flexRowSpaceBetween, { marginTop: 10 }]}>
                                        <Pressable
                                            onPress={() => handleSelectItem(item.id, true)}
                                            style={[
                                                flexRowCenter,
                                                styles.buttonBox,
                                                {
                                                    width: '47%',
                                                    borderColor: isButtonSelected(item.id, true) ? colors.primary : colors.gray,
                                                    backgroundColor: isButtonSelected(item.id, true) ? colors.orange_02 : colors.white
                                                }
                                            ]}
                                        >
                                            <Text style={{ color: isButtonSelected(item.id, true) ? colors.primary : colors.textGray }}>
                                                {t("common.text.yes")}
                                            </Text>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => handleSelectItem(item.id, false)}
                                            style={[
                                                flexRowCenter,
                                                styles.buttonBox,
                                                {
                                                    width: '47%',
                                                    borderColor: isButtonSelected(item.id, false) ? colors.primary : colors.gray,
                                                    backgroundColor: isButtonSelected(item.id, false) ? colors.orange_02 : colors.white
                                                }
                                            ]}
                                        >
                                            <Text style={{ color: isButtonSelected(item.id, false) ? colors.primary : colors.textGray }}>
                                                {t("common.text.no")}
                                            </Text>
                                        </Pressable>
                                    </View>
                                </View>
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
                        <Text style={styles.textTitle}>{t('recordHealthData.recordFound')}</Text>
                        <Text style={styles.textDesc}>{t('recordHealthData.comeback')}</Text>
                        <Pressable
                            onPress={() => {
                                navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART, { isEditable: false });
                            }}
                            style={styles.buttonChart}>
                            <Text style={styles.textButtonChart}>{t('recordHealthData.viewChart')}</Text>
                        </Pressable>
                    </View>
                )}

            </ScrollView>
            {
                isEdit && (
                    <View style={styles.buttonContainer}>
                        <Pressable
                            disabled={!(allItemsSelected || dataListMedication.length === 0)}
                            onPress={dataListMedication.length === 0 ? handleViewChart : nextPage}
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
