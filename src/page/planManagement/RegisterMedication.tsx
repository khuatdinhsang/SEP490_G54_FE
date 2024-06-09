import React, { useState } from 'react';
import { Image, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { useTranslation } from 'react-i18next';
import ProgressHeader from '../../component/progessHeader';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import colors from '../../constant/color';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import { WidthDevice } from '../../util/Dimenssion';
import { IMAGE } from '../../constant/image';

const RegisterMedication = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [isShowModal, setIsShowModal] = useState<boolean>(true)
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.FOOD_INTAKE);
    };
    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.ADD_MEDICATION);
    };

    const closeModal = () => {
        setIsShowModal(false)
        // Implement close modal functionality
    };
    const initListRegisterMedication = [
        {
            id: 1,
            name: t("planManagement.medication.highBloodPressure"),
            day: [
                {
                    id: 1,
                    value: t("common.text.monday"),
                },
                {
                    id: 2,
                    value: t("common.text.tuesday"),
                },
                {
                    id: 3,
                    value: t("common.text.wednesday"),
                },
            ],
            time: {
                id: 1,
                value: 9,
                session: t("common.text.morning"),
            }
        },
        {
            id: 2,
            name: t("planManagement.medication.hyperlipidemia"),
            day: [
                {
                    id: 2,
                    value: t("common.text.tuesday"),
                },
                {
                    id: 4,
                    value: t("common.text.thursday"),
                },
            ],
            time: {
                id: 1,
                value: 11,
                session: t("common.text.morning"),
            }
        },
        {
            id: 3,
            name: t("planManagement.medication.diabetes"),
            day: [
                {
                    id: 1,
                    value: t("common.text.monday"),
                },
                {
                    id: 2,
                    value: t("common.text.tuesday"),
                },
                {
                    id: 3,
                    value: t("common.text.wednesday"),
                },
            ],
            time: {
                id: 1,
                value: 9,
                session: t("common.text.afternoon"),
            }
        },
        {
            id: 4,
            name: t("planManagement.medication.diabetes"),
            day: [
                {
                    id: 1,
                    value: t("common.text.monday"),
                },
                {
                    id: 2,
                    value: t("common.text.tuesday"),
                },
                {
                    id: 3,
                    value: t("common.text.wednesday"),
                },
            ],
            time: {
                id: 1,
                value: 9,
                session: t("common.text.afternoon"),
            }
        },
        {
            id: 5,
            name: t("planManagement.medication.diabetes"),
            day: [
                {
                    id: 1,
                    value: t("common.text.monday"),
                },
                {
                    id: 2,
                    value: t("common.text.tuesday"),
                },
                {
                    id: 3,
                    value: t("common.text.wednesday"),
                },
            ],
            time: {
                id: 1,
                value: 9,
                session: t("common.text.afternoon"),
            }
        },
    ]
    const [ListRegisterMedication, setListRegisterMedication] = useState(initListRegisterMedication)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        isTextRight={true}
                        textRightStyle={{ color: colors.primary }}
                        textRight={t("common.text.next")}
                        text={t("planManagement.text.takingMedication")}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={nextPage}
                    />
                </View>
                <ProgressHeader index={[0, 1, 2, 3]} length={5} style={{ marginVertical: 16 }} />
                <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                    <Text style={styles.textPlan}>{t("planManagement.text.registerMedication")}</Text>
                    <View style={{ marginVertical: 20 }}>
                        <Pressable onPress={nextPage} style={[flexRowCenter, styles.button]}>
                            <Text style={styles.iconAdd}>+</Text>
                            <Text style={styles.textAddSchedule}>{t("planManagement.text.addSchedule")}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={isShowModal}
                onRequestClose={closeModal}>
                <View style={styles.backgroundOverlay} />
                <View style={styles.centeredView}>
                    <View >
                        <Pressable
                            style={styles.buttonCancelDate}
                            onPress={closeModal}>
                            <Image
                                source={require('../../assets/image/register/icon_X.png')}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.modalView}>
                        <Text style={[styles.text, { marginTop: 15 }]}>{t("planManagement.text.questionMedicationNotChange")}</Text>
                        <Text style={[styles.text, { marginBottom: 10 }]}>{t("planManagement.text.retrieveHistoryLastWeek")}</Text>
                        <Text style={[styles.textChooseDay, { marginBottom: 10 }]}>{t("planManagement.text.drugHistoryLastWeek")}</Text>
                        <ScrollView style={styles.scrollView}>
                            {ListRegisterMedication && ListRegisterMedication.map((item) => {
                                return <View
                                    key={item.id}
                                    style={[flexRow, styles.example, { backgroundColor: colors.white }]}>
                                    <View style={[flexRow, { flex: 1 }]}>
                                        <Image source={IMAGE.PLAN_MANAGEMENT.MEDICATION} />
                                        <View style={styles.detailExample}>
                                            <Text style={[styles.textPlan, { fontSize: 16, color: colors.primary }]}>{item.name}</Text>
                                            <View style={flexRow}>
                                                <Text style={styles.textChooseDay}>{item.day.map(item => item.value).join(', ')} | </Text>
                                                <Text style={styles.textChooseDay}>{item.time.value}{item.time.session}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            })}
                        </ScrollView>
                        <View style={[flexRowSpaceBetween, { marginTop: 10 }]}>
                            <Pressable style={[styles.btn, { backgroundColor: colors.gray_G02 }]}>
                                <Text style={{ textAlign: 'center', color: colors.gray_G04 }}>{t("common.text.cancel")}</Text>
                            </Pressable>
                            <Pressable style={[styles.btn, { backgroundColor: colors.primary }]}>
                                <Text style={{ textAlign: 'center', color: colors.white }}>{t("common.text.retrieveAgain")}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textPlan: {
        fontWeight: '700',
        fontSize: 17,
        color: colors.gray_G07,
        textAlign: 'center'
    },
    btn: {
        paddingVertical: 17,
        borderRadius: 12,
        width: '48%'
    },
    textChooseDay: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.gray_G06
    },
    text: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G08,
    },
    button: {
        paddingVertical: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.orange_04,
        backgroundColor: colors.orange_01,
        gap: 10
    },
    textAddSchedule: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.orange_04
    },
    iconAdd: {
        color: colors.white,
        backgroundColor: colors.orange_04,
        paddingHorizontal: 5,
        borderRadius: 15,
        textAlign: 'center'
    },
    backgroundOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        width: WidthDevice,
    },
    buttonCancelDate: {
        position: 'absolute',
        top: 15,
        zIndex: 100,
        right: 15,
    },
    modalView: {
        backgroundColor: colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        padding: 20,
    },
    titleModal: {
        fontWeight: '400',
        fontSize: 18,
        marginVertical: 15,
    },
    scrollView: {
        width: '100%',
        height: '40%',
    },
    example: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 10,
        borderColor: colors.gray_G02,
    },
    detailExample: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
});

export default RegisterMedication;
