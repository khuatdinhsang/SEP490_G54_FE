import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import InputNumber from '../../../../component/inputNumber';
import { SCREENS_NAME } from '../../../../navigator/const';
import LoadingScreen from '../../../../component/loading';
import { getMondayOfCurrentWeek } from '../../../../util';
import { planService } from '../../../../services/plan';
import { IMAGE } from '../../../../constant/image';
import { DateTime } from 'luxon';
import RangeBlock from '../../../../component/range-block';
import { chartService } from '../../../../services/charts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANG } from '../../../home/const';
import { authService } from '../../../../services/auth';

const Weight = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [weight, setWeight] = useState<string>("");
    const [height, setHeight] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const isEditable = route?.params?.isEditable;
    const [isEdit, setIsEdit] = useState<boolean>(isEditable);
    const [errorWeight, setErrorWeight] = useState<string>("");
    const fetchWeightAndHeight = async () => {
        setIsLoading(true);
        try {
            const langAys = await AsyncStorage.getItem("language")
            const lang = langAys === 'en' ? LANG.EN : LANG.KR
            const res = await authService.getHeightWeight(lang);
            if (res.code === 200) {
                setHeight(res.result.height)
                setMessageError("");
            } else {
                setMessageError("Failed to fetch questions.");
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
    console.log("1", height)
    useEffect(() => {
        fetchWeightAndHeight()
    }, [])
    const handleViewChart = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.WEIGHT_CHART, { isEditable: isEdit });
    };

    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    };

    const nextPage = async (): Promise<void> => {
        const numericWeight = Number(weight);
        if (isNaN(numericWeight) || numericWeight > 200) {
            setErrorWeight("Invalid value");
            return;
        }
        setIsLoading(true);
        const dataSubmit = {
            weekStart: getMondayOfCurrentWeek()?.split("T")[0],
            date: DateTime.local()?.toISODate(),
            weight: numericWeight
        };
        try {
            const res = await planService.postWeight(dataSubmit);
            if (res.code === 201) {
                setIsEdit(false);
                setWeight("");
                navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.WEIGHT_CHART, { isEditable: false });
            } else {
                setMessageError("Unexpected error occurred.");
            }
        } catch (error: any) {
            setMessageError(error?.response?.data?.message || "Unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSetWeight = (value: string) => {
        const numericRegex = /^(\d*\.?\d*)$/;
        if (numericRegex.test(value) && value.length <= 4) {
            setWeight(value);
        }
    };
    console.log("1111", Number(weight))
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t('recordHealthData.weight')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.weightProfile')}
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
                    <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                        <Text style={styles.title}>{t('recordHealthData.enterWeight')}</Text>
                        <View style={styles.item}>
                            <View style={flexRowCenter}>
                                <Text style={[styles.title, { color: colors.gray_G09 }]}>{t('recordHealthData.weight')}</Text>
                                <View style={{ width: "50%", marginLeft: 20 }}>
                                    <InputNumber
                                        textRight='kg'
                                        value={weight}
                                        keyboardType={"numeric"}
                                        handleSetValue={handleSetWeight}
                                        styleInput={{ paddingLeft: 50 }}
                                        error={errorWeight}
                                    />
                                </View>
                            </View>
                            <Text style={[styles.title, { marginTop: 20, paddingHorizontal: 20 }]}>BMI</Text>
                            <View style={{ paddingHorizontal: 20, marginTop: 50 }}>
                                <RangeBlock value={Math.round(((Number(weight)) / ((height / 100) ** 2)) * 10) / 10} minValue={18.5} maxValue={25} />
                            </View>
                        </View>
                        {messageError && !isLoading && <Text style={[styles.title, { color: colors.red }]}>{messageError}</Text>}
                    </View>
                ) : (
                    <View style={[flexCenter, { marginTop: 100 }]}>
                        <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                        <Text style={styles.textTitle}>{t('recordHealthData.recordFound')}</Text>
                        <Text style={styles.textDesc}>{t('recordHealthData.comeback')}</Text>
                        <Pressable
                            onPress={() => {
                                navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.WEIGHT_CHART, { isEditable: false });
                            }}
                            style={styles.buttonChart}>
                            <Text style={styles.textButtonChart}>{t('recordHealthData.viewChart')}</Text>
                        </Pressable>
                    </View>
                )}

            </ScrollView>
            {isEdit && <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!weight}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: weight ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: weight ? colors.white : colors.gray_G04 }]}>{t('recordHealthData.goToViewChart')}</Text>
                </Pressable>
            </View>}
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        paddingBottom: 100
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
    title: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.gray_G07
    },
    item: {
        paddingVertical: 24,
        backgroundColor: colors.gray_G01,
        borderRadius: 12,
        marginTop: 20,
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

export default Weight;
