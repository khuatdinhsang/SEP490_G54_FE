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
interface dataType {
    id: number,
    value: string
}
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
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD, { chooseSelectedItem: selectedItem })
    }
    const handleSetGlycemic = (value: any) => {
        if (isCheckedGlycemic) {
            setShowModal(true)
            return
        }
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setGlycemic(value);
            setIsCheckedGlycemic(false)
        }
    };
    const handleSetChoresterol = (value: any) => {
        if (isCheckedChoresterol) {
            setShowModal(true)
            return
        }
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setChoresterol(value);
            setIsCheckedChoresterol(false)
        }
    };
    const handleSetGlucozer = (value: any) => {
        if (isCheckedGlucozer) {
            setShowModal(true)
            return
        }
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
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
                        <Text style={styles.textTitle}>당화혈색소(HbA1c)를 입력해주세요</Text>
                        <View style={[flexRowSpaceBetween, styles.item]}>
                            <View style={[flexRow]}>
                                <Text style={styles.itemText}>{selectedItem.value}</Text>
                                <View style={{ width: '50%', marginLeft: 10 }}>
                                    <InputNumber
                                        textRight='%'
                                        value={glycemic}
                                        keyboardType={"numeric"}
                                        handleSetValue={handleSetGlycemic}
                                    />
                                </View>
                            </View>
                            <Pressable style={flexRow}>
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
                        <Text style={styles.textTitle}>콜레스테롤을 입력해주세요</Text>
                        <View style={[flexRowSpaceBetween, styles.item]}>
                            <View style={[flexRow]}>
                                <Text style={styles.itemText}>{selectedItem.value}</Text>
                                <View style={{ width: '50%', marginLeft: 10 }}>
                                    <InputNumber
                                        textRight='mg/DL'
                                        value={choresterol}
                                        keyboardType={"numeric"}
                                        handleSetValue={handleSetChoresterol}
                                    />
                                </View>
                            </View>
                            <Pressable style={flexRow}>
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
                    <View>
                        <Text style={styles.textTitle}>당화혈색소(HbA1c)를 입력해주세요</Text>
                        <View style={styles.item}>
                            <View style={flexRowSpaceBetween}>
                                <View style={[flexRow]}>
                                    <Text style={styles.itemText}>{selectedItem.value}</Text>
                                    <View style={{ width: '50%', marginLeft: 10 }}>
                                        <InputNumber
                                            textRight='mg/DL'
                                            value={glucozer}
                                            keyboardType={"numeric"}
                                            handleSetValue={handleSetGlucozer}
                                        />
                                    </View>

                                </View>
                                <Pressable style={flexRow}>
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
        </SafeAreaView>
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
        marginTop: 10
    },
    itemText: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.gray_G09
    },
    textUnKnown: {
        fontWeight: "400",
        fontSize: 14,
    }
})
export default FillRecord