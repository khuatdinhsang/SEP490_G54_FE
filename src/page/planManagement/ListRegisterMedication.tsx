import React, { useEffect, useState } from 'react'
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
import { HeightDevice } from '../../util/Dimenssion';
import DialogSingleComponent from '../../component/dialog-single';
import { listRegisterMedicineData } from '../../constant/type/medical';
import { planService } from '../../services/plan';
import { getMondayOfCurrentWeek } from '../../util';
import LoadingScreen from '../../component/loading';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { deleteRegisterMedication } from '../../store/medication.slice';
const ListRegisterMedication = ({ route }: any) => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [messageError, setMessageError] = useState<string>("")
    const [isModalDelete, setIsModalDelete] = useState<boolean>(false)
    const [itemSelected, setItemSelected] = useState<number>()
    const [isLoading, setIsLoading] = useState(false);
    const listRegisterMedicationInterface = useSelector((state: RootState) => state.medication.listRegisterMedicationInterface);
    const listRegisterMedicationSubmit = useSelector((state: RootState) => state.medication.listRegisterMedication);
    const dispatch = useDispatch()
    const nextPage = async (): Promise<void> => {
        setIsLoading(true)
        try {
            const res = await planService.postMedicine(listRegisterMedicationSubmit)
            if (res.code === 200) {
                setIsLoading(false)
                setMessageError("");
                navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.NUMBER_STEPS);
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
    const handleRegisterMedication = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.ADD_MEDICATION);
    }
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.ADD_MEDICATION);
    };
    const handleDeleteMedication = (id: number) => {
        setItemSelected(id)
        setIsModalDelete(true)
    }
    const handleClickButtonCancel = () => {
        setIsModalDelete(false)
    }
    const handleClickButtonConfirm = (id: number) => {
        dispatch(deleteRegisterMedication(id));
        setIsModalDelete(false)
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, backgroundColor: colors.white }}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        isTextRight={true}
                        textRight={t("common.text.next")}
                        text={t("planManagement.text.takingMedication")}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={nextPage}
                        textRightStyle={{ color: colors.primary }}
                    />
                </View>
                <View style={{ backgroundColor: colors.white }}>
                    <ProgressHeader index={[0, 1, 2, 3]} length={5} />
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 0 }} >
                    <View >
                        <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
                            <Text style={[styles.textPlan, { marginBottom: 20 }]}>{t("planManagement.text.registerMedication")}</Text>
                            {listRegisterMedicationInterface && listRegisterMedicationInterface.map((item) => {
                                return <View
                                    key={item.medicineTypeId}
                                    style={[flexRow, styles.example, { backgroundColor: colors.white }]}>
                                    <View style={[flexRow, { flex: 1, marginRight: 10 }]}>
                                        <Image source={IMAGE.PLAN_MANAGEMENT.MEDICATION} />
                                        <View style={styles.detailExample}>
                                            <Text style={[styles.textPlan, { fontSize: 16, color: colors.primary }]}>{item.medicineTitle}</Text>
                                            <Text style={styles.textChooseDay}>{item.weekday.map(item => item).join(', ')} | {item.time}</Text>
                                        </View>
                                    </View>
                                    <Pressable
                                        onPress={() => handleDeleteMedication(item.medicineTypeId)}>
                                        <Text style={styles.textDelete}>{t("common.text.delete")}</Text>
                                    </Pressable>
                                </View>
                            })}
                            <View style={{ marginVertical: 20 }}>
                                <Pressable onPress={handleRegisterMedication} style={[flexRowCenter, styles.buttonAdd]}>
                                    <Text style={styles.iconAdd}>+</Text>
                                    <Text style={styles.textAddSchedule}>{t("planManagement.text.addSchedule")}</Text>
                                </Pressable>
                            </View>
                            {messageError && !isLoading && <Text style={[styles.textAddSchedule, { color: colors.red }]}>{messageError}</Text>}
                        </View>
                    </View>
                </ScrollView >
            </View>
            <View style={{ paddingHorizontal: 20 }}>
                <Pressable
                    onPress={() => nextPage()}
                    style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={[styles.text, { color: colors.white }]}> {t('common.text.next')}</Text>
                </Pressable>
            </View>
            <DialogSingleComponent
                isActive={isModalDelete}
                isOverlay={true}
                imageSource={IMAGE.HOME.WARNING}
                title={t('common.text.confirmDelete')}
                content={t('common.text.CannotRestored')}
                btnDelete={true}
                textButtonCancel={t('common.text.cancel')}
                handleClickButtonCancel={handleClickButtonCancel}
                textButtonConfirm={t('common.text.confirm')}
                handleClickButtonConfirm={handleClickButtonConfirm}
                itemSelected={itemSelected}
            />
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    textPlan: {
        fontWeight: '700',
        fontSize: 17,
        color: colors.gray_G07,
        textAlign: 'center',
    },
    textChooseMedication: {
        fontWeight: '400',
        fontSize: 18,
        color: colors.gray_G09
    },
    button: {
        borderRadius: 12,
        marginBottom: 20,
        paddingVertical: 17
    },
    buttonAdd: {
        paddingVertical: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.orange_04,
        backgroundColor: colors.orange_01,
        gap: 10
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
    },
    example: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderRadius: 12,
        marginBottom: 10,
        borderColor: colors.white,
        elevation: 5,
    },
    detailExample: {
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '80%'
    },
    textChooseDay: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.gray_G06
    },
    textDelete: {
        fontWeight: '400',
        fontSize: 14,
        color: colors.blue_01
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
    }

})
export default ListRegisterMedication