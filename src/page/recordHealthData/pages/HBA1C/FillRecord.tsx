import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowSpaceBetween } from '../../../../styles/flex';
import * as Progress from 'react-native-progress';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';
import InputNumber from '../../../../component/inputNumber';
import CheckBox from '@react-native-community/checkbox';
import DialogSingleComponent from '../../../../component/dialog-single';
import { WidthDevice } from '../../../../util/Dimenssion';
import { paddingHorizontalScreen } from '../../../../styles/padding';
import RangeBlock from '../../../../component/range-block';
import { getMondayOfCurrentWeek } from '../../../../util';
import { planService } from '../../../../services/plan';
import LoadingScreen from '../../../../component/loading';
import { DateTime } from 'luxon';
const widthProgressBar = WidthDevice - 2 * paddingHorizontalScreen - 50;
const FillRecord = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { selectedItem } = route.params;
    const { t, i18n } = useTranslation();
    const [glycemic, setGlycemic] = useState<string>("");
    const [choresterol, setChoresterol] = useState<string>("");
    const [glucozer, setGlucozer] = useState<string>("");
    const [isCheckedGlycemic, setIsCheckedGlycemic] = useState(false);
    const [isCheckedChoresterol, setIsCheckedChoresterol] = useState(false);
    const [isCheckedGlucozer, setIsCheckedGlucozer] = useState(false);
    const [isShowModal, setShowModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    const [glycemicError, setGlycemicError] = useState<string>("");
    const [choresterolError, setChoresterolError] = useState<string>("");
    const [glucozerError, setGlucozerError] = useState<string>("");
    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    }
    const nextPage = async (): Promise<void> => {
        if (Number(glycemic) > 10) {
            setGlycemicError(t('placeholder.err.invalidInput'));
            return;
        }
        if (Number(choresterol) > 300) {
            setChoresterolError(t('placeholder.err.invalidInput'));
            return;
        }
        if (Number(glucozer) > 200) {
            setGlucozerError(t('placeholder.err.invalidInput'));
            return;
        }
        // setIsLoading(true)
        const dataSubmit = {
            timeMeasure: selectedItem.value,
            weekStart: getMondayOfCurrentWeek()?.split("T")[0],
            date: DateTime.local()?.toString()?.split("T")[0],
            cholesterol: Number(choresterol) || null,
            bloodSugar: Number(glucozer) || null,
            hba1c: Number(glycemic) || null
        }
        try {
            const res = await planService.postCardinal(dataSubmit)
            if (res.code === 201) {
                setIsLoading(false)
                navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD_CHART);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400) {
                setMessageError(error.response.data.message);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        }
        finally {
            setIsLoading(false)
        }
    };
    const handleSetGlycemic = (value: any) => {
        setGlycemicError("")
        if (isCheckedGlycemic) {
            setShowModal(true)
            return
        }
        const numericRegex = /^(\d*\.?\d*)$/;
        if (numericRegex.test(value) && value?.length <= 3) {
            setGlycemic(value);
            setIsCheckedGlycemic(false)
        }
    };
    const handleSetChoresterol = (value: any) => {
        setChoresterolError("")
        if (isCheckedChoresterol) {
            setShowModal(true)
            return
        }
        const numericRegex = /^(\d*\.?\d*)$/;
        if (numericRegex.test(value) && value?.length <= 5) {
            setChoresterol(value);
            setIsCheckedChoresterol(false)
        }
    };
    const handleSetGlucozer = (value: any) => {
        setGlucozerError("")
        if (isCheckedGlucozer) {
            setShowModal(true)
            return
        }
        const numericRegex = /^(\d*\.?\d*)$/;
        if (numericRegex.test(value) && value?.length <= 5) {
            setGlucozer(value);
            setIsCheckedGlucozer(false)
        }
    };
    const toggleCheckBoxGlycemic = () => {
        setIsCheckedGlycemic(!isCheckedGlycemic);
        if (!isCheckedGlycemic) {
            setGlycemic("");
        }

    };
    const toggleCheckBoxChoresterol = () => {
        setIsCheckedChoresterol(!isCheckedChoresterol);
        if (!isCheckedChoresterol) {
            setChoresterol("");
        }

    };
    const toggleCheckBoxGlucozer = () => {
        setIsCheckedGlucozer(!isCheckedGlucozer);
        if (!isCheckedGlucozer) {
            setGlucozer("");
        }
    };
    const disableButton = !(isCheckedGlycemic || glycemic) || !(isCheckedChoresterol || choresterol) || !(isCheckedGlucozer || glucozer);
    return (
        <SafeAreaView style={styles.container}>
            {isShowModal && (
                <DialogSingleComponent
                    isActive={isShowModal}
                    isOverlay={true}
                    buttonText={t('common.text.confirm')}
                    imageSource={IMAGE.ICON_CHECK_COLOR}
                    title={t('recordHealthData.unableEnterNumber')}
                    content={t('recordHealthData.pleaseUnCheck')}
                    handleClickButton={() => setShowModal(false)}
                />
            )}
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}

                        text={`${t('recordHealthData.glycatedHemoglobin')}/${t('recordHealthData.cholesterol')}/${t('recordHealthData.bloodSugar')}`}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.textTitle}>{t('recordHealthData.enterHBA1C')}</Text>
                        <View style={[flexRowSpaceBetween, styles.item]}>
                            <View style={[flexRow, { flex: 1 }]}>
                                <Text style={styles.itemText}>{selectedItem.name}</Text>
                                <View style={{ width: '55%', marginLeft: 10 }}>
                                    <InputNumber
                                        textRight='%'
                                        value={glycemic}
                                        keyboardType={"numeric"}
                                        handleSetValue={handleSetGlycemic}
                                        error={glycemicError}
                                        styleInput={{ marginLeft: 10 }}
                                    />
                                </View>
                            </View>
                            <Pressable style={[flexRow]}>
                                <CheckBox
                                    disabled={false}
                                    value={isCheckedGlycemic}
                                    onValueChange={toggleCheckBoxGlycemic}
                                    tintColors={{ true: colors.primary, false: colors.gray }}
                                />
                                <Text style={[styles.textUnKnown, { color: isCheckedGlycemic ? colors.orange_04 : colors.gray_G07 }]}>{t('recordHealthData.unknown')}</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ marginBottom: 30 }}>
                        <Text style={styles.textTitle}>{t("recordHealthData.enterCholesterol")}</Text>
                        <View style={[flexRowSpaceBetween, styles.item]}>
                            <View style={[flexRow, { flex: 1 }]}>
                                <Text style={styles.itemText}>{selectedItem.name}</Text>
                                <View style={{ width: '55%', marginLeft: 10 }}>
                                    <InputNumber
                                        textRight='mg/DL'
                                        value={choresterol}
                                        keyboardType={"numeric"}
                                        handleSetValue={handleSetChoresterol}
                                        error={choresterolError}
                                        styleInput={{ marginLeft: -10 }}
                                    />
                                </View>
                            </View>
                            <Pressable style={[flexRow]}>
                                <CheckBox
                                    disabled={false}
                                    value={isCheckedChoresterol}
                                    onValueChange={toggleCheckBoxChoresterol}
                                    tintColors={{ true: colors.primary, false: colors.gray }}
                                />
                                <Text style={styles.textUnKnown}>{t('recordHealthData.unknown')}</Text>
                            </Pressable>
                        </View>
                    </View>
                    <View >
                        <Text style={styles.textTitle}>{t('recordHealthData.enterBlood')}</Text>
                        <View style={styles.item}>
                            <View style={flexRowSpaceBetween}>
                                <View style={[flexRow, { flex: 1 }]}>
                                    <Text style={styles.itemText}>{selectedItem.name}</Text>
                                    <View style={{ width: '55%', marginLeft: 10 }}>
                                        <InputNumber
                                            textRight='mg/DL'
                                            value={glucozer}
                                            keyboardType={"numeric"}
                                            handleSetValue={handleSetGlucozer}
                                            error={glucozerError}
                                            styleInput={{ marginLeft: -10 }}
                                        />
                                    </View>

                                </View>
                                <Pressable style={[flexRow]}>
                                    <CheckBox
                                        disabled={false}
                                        value={isCheckedGlucozer}
                                        onValueChange={toggleCheckBoxGlucozer}
                                        tintColors={{ true: colors.primary, false: colors.gray }}
                                    />
                                    <Text style={styles.textUnKnown}>{t('recordHealthData.unknown')}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    {messageError && !isLoading && <Text style={[styles.textTitle, { color: colors.red }]}>{messageError}</Text>}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={disableButton}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: !disableButton ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: !disableButton ? colors.white : colors.gray_G04 }]}> {t('recordHealthData.goToViewChart')}</Text>
                </Pressable>
            </View>
            {isLoading && <LoadingScreen />}
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
    },
    progressBarTextLeft: {
        position: 'absolute',
        top: 10,
    },
    progressBarTextRight: {
        position: 'absolute',
        top: 10,
        right: 0,
    },
    progressBarTextCenter: {
        position: 'absolute',
        top: 10,
        color: colors.primary,
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
    },
    button: {
        height: 60,
        borderRadius: 12,
        width: '100%'
    },
    textButton: {
        textAlign: "center",
        lineHeight: 60,
        fontWeight: "500",
        fontSize: 18
    },
    // 
    textTitle: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.gray_G07
    },
    item: {
        paddingVertical: 24,
        paddingHorizontal: 20,
        backgroundColor: colors.gray_G01,
        borderRadius: 12,
        marginTop: 10,
    },
    itemText: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.gray_G09,
        flex: 1,
        flexShrink: 1
    },
    textUnKnown: {
        fontWeight: "400",
        fontSize: 14,
    }
})
export default FillRecord