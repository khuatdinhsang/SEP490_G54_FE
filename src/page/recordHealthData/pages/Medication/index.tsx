import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image'; // Assuming you have IMAGE imported from your constant files
import { SCREENS_NAME } from '../../../../navigator/const';

const MedicationRecord = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [selectedItems, setSelectedItems] = useState<{ [key: number]: boolean }>({});
    const initData = [
        { id: 1, medication: "고혈압약", time: "오전9시" },
        { id: 2, medication: "기타약", time: "오전13시" },
    ];
    const [takeMedicines] = useState<any[]>([]);

    const goBackPreviousPage = () => {
        navigation.goBack()
    };

    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MEDICATION_CHART)
    };

    const handleSelectItem = (itemId: number, isSelected: boolean) => {
        setSelectedItems((prevSelectedItems) => ({
            ...prevSelectedItems,
            [itemId]: isSelected
        }));
    };

    const isButtonSelected = (itemId: number, isSelected: boolean) => selectedItems[itemId] === isSelected;

    const allItemsSelected = takeMedicines.every(item => item.id in selectedItems);

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
                        onPress={nextPage}
                        style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('recordHealthData.viewChart')}
                        </Text>
                    </Pressable>
                </View>
                {takeMedicines.length > 0 ? (
                    <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                        {takeMedicines.map((itemChild) => (
                            <View style={{ marginBottom: 30 }} key={itemChild.id}>
                                <View style={flexRow}>
                                    <Text style={styles.text}>오늘</Text>
                                    <Text style={[styles.text, { color: colors.orange_04 }]}>{itemChild.time}</Text>
                                    <Text style={styles.text}>에</Text>
                                    <Text style={[styles.text, { color: colors.orange_04 }]}>{itemChild.medication}</Text>
                                    <Text style={styles.text}>을 먹었나요?</Text>
                                </View>
                                <View style={[flexRowSpaceBetween, { marginTop: 10 }]}>
                                    <Pressable
                                        onPress={() => handleSelectItem(itemChild.id, true)}
                                        style={[
                                            flexRowCenter,
                                            styles.buttonBox,
                                            {
                                                width: '47%',
                                                borderColor: isButtonSelected(itemChild.id, true) ? colors.primary : colors.gray,
                                                backgroundColor: isButtonSelected(itemChild.id, true) ? colors.orange_02 : colors.white
                                            }
                                        ]}
                                    >
                                        <Text style={{ color: isButtonSelected(itemChild.id, true) ? colors.primary : colors.textGray }}>
                                            {t("common.text.yes")}
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => handleSelectItem(itemChild.id, false)}
                                        style={[
                                            flexRowCenter,
                                            styles.buttonBox,
                                            {
                                                width: '47%',
                                                borderColor: isButtonSelected(itemChild.id, false) ? colors.primary : colors.gray,
                                                backgroundColor: isButtonSelected(itemChild.id, false) ? colors.orange_02 : colors.white
                                            }
                                        ]}
                                    >
                                        <Text style={{ color: isButtonSelected(itemChild.id, false) ? colors.primary : colors.textGray }}>
                                            {t("common.text.no")}
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        ))}
                    </View>
                ) : (
                    <View style={styles.emptyContainer}>
                        <Image source={IMAGE.RECORD_DATA.CALENDAR} />
                        <Text style={[styles.text, { fontWeight: "700" }]}>{t('recordHealthData.noMedicationSchedule')}</Text>
                    </View>
                )}
            </ScrollView>
            {takeMedicines.length > 0 && <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!allItemsSelected}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: allItemsSelected ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: allItemsSelected ? colors.white : colors.gray_G04 }]}>
                        {t('recordHealthData.goToViewChart')}
                    </Text>
                </Pressable>
            </View>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        paddingBottom: 100,
        flexGrow: 1,
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
        color: colors.gray_G07
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

export default MedicationRecord;
