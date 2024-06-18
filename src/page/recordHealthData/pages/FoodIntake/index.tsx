import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { SCREENS_NAME } from '../../../../navigator/const';
import InputComponent from '../../../../component/input';

const FoodIntakeRecord = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const initBoldOfRice = "4";
    const [numberBoldOfRice, setNumberBoldOfRice] = useState<string | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const [showInput, setShowInput] = useState<boolean>(false);

    const handleViewChart = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.FOOD_INTAKE_CHART);
    };

    const goBackPreviousPage = () => {
        navigation.goBack();
    };

    const nextPage = () => {
        const numericRegex = /^[0-9]*$/;
        if (numberBoldOfRice) {
            if (numericRegex.test(numberBoldOfRice)) {
                navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.FOOD_INTAKE_CHART)
                setError(false);
            } else {
                setError(true);
            }
        }
    };

    const handleClickTrue = () => {
        setShowInput(true);
        setNumberBoldOfRice(initBoldOfRice);
    };

    const handleClickFalse = () => {
        setShowInput(true);
        setNumberBoldOfRice("0");
    };

    const handleChangeBoldOfRice = (values: string) => {
        setNumberBoldOfRice(values);
        setError(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t('planManagement.text.foodIntake')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.foodIntakeProfile')}
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
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <View style={flexRow}>
                        <Text style={styles.text}>오늘은</Text>
                        <Text style={[styles.text, { color: colors.orange_04 }]}>{initBoldOfRice}접시</Text>
                        <Text style={styles.text}>를 먹었나요?</Text>
                    </View>
                    <View style={[flexRowSpaceBetween, { width: '100%', marginTop: 10 }]}>
                        <Pressable
                            onPress={handleClickTrue}
                            style={{ width: '47%' }}>
                            <View
                                style={[
                                    styles.box,
                                    {
                                        borderColor: numberBoldOfRice === initBoldOfRice ? colors.orange_04 : colors.gray_G03,
                                        backgroundColor: numberBoldOfRice === initBoldOfRice ? colors.orange_01 : colors.white,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.textInput,
                                        { color: numberBoldOfRice === initBoldOfRice ? colors.orange_04 : colors.gray_G05 },
                                    ]}>
                                    {t('common.text.yes')}
                                </Text>
                            </View>
                        </Pressable>
                        <Pressable
                            onPress={handleClickFalse}
                            style={{ width: '47%' }}>
                            <View
                                style={[
                                    styles.box,
                                    {
                                        borderColor: numberBoldOfRice !== initBoldOfRice && numberBoldOfRice !== undefined ? colors.orange_04 : colors.gray_G03,
                                        backgroundColor: numberBoldOfRice !== initBoldOfRice && numberBoldOfRice !== undefined ? colors.orange_01 : colors.white,
                                    },
                                ]}>
                                <Text
                                    style={[
                                        styles.textInput,
                                        { color: numberBoldOfRice !== initBoldOfRice && numberBoldOfRice !== undefined ? colors.orange_04 : colors.gray_G05 },
                                    ]}>
                                    {t('common.text.no')}
                                </Text>
                            </View>
                        </Pressable>
                    </View>
                    {showInput && (
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.text}>{t('recordHealthData.howManyPlates')}</Text>
                            <View style={[styles.inputItem, flexRowCenter]}>
                                <View style={{ width: "50%", marginRight: 10 }}>
                                    <InputComponent
                                        value={numberBoldOfRice}
                                        textAlignVertical="center"
                                        onChangeText={handleChangeBoldOfRice}
                                        keyboardType="numeric"
                                        styleInput={{ textAlign: "center" }}
                                    />
                                </View>
                                <Text style={[styles.text, { color: colors.gray_G09 }]}> {t('planManagement.text.disk')}</Text>
                            </View>
                        </View>
                    )}
                    {error && <Text style={[styles.text, { color: colors.red }]}>{t("placeholder.err.number")}</Text>}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!numberBoldOfRice}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: numberBoldOfRice ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: numberBoldOfRice ? colors.white : colors.gray_G04 }]}>{t('recordHealthData.goToViewChart')}</Text>
                </Pressable>
            </View>
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
    },
    navigate: {
        height: 48,
        width: '50%',
    },
    active: {
        borderBottomWidth: 2,
        borderColor: colors.orange_04,
    },
    textNavigate: {
        textAlign: 'center',
        lineHeight: 48,
        fontWeight: '700',
        fontSize: 16,
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
        width: '100%',
    },
    textButton: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 60,
        fontWeight: "500",
        fontSize: 18,
    },
    title: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.gray_G07,
    },
    item: {
        paddingVertical: 24,
        backgroundColor: colors.gray_G01,
        borderRadius: 12,
        marginTop: 20,
    },
    text: {
        fontWeight: "500",
        fontSize: 18,
        color: colors.gray_G07,
    },
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
    },
    textInput: {
        textAlign: 'center',
        lineHeight: 56,
    },
    inputItem: {
        paddingVertical: 24,
        borderRadius: 12,
        backgroundColor: colors.gray_G01,
        marginTop: 10,
    },
});

export default FoodIntakeRecord;
