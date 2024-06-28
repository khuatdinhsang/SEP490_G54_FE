import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import InputNumber from '../../../../component/inputNumber';
import { SCREENS_NAME } from '../../../../navigator/const';
import LoadingScreen from '../../../../component/loading';
import { getMondayOfCurrentWeek } from '../../../../util';
import { planService } from '../../../../services/plan';


const BloodPressure = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [minBloodPressure, setMinBloodPressure] = useState<string>("")
    const [maxBloodPressure, setMaxBloodPressure] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    const goBackPreviousPage = () => {
        navigation.goBack();
    }
    const viewChart = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.BLOOD_PRESSURE_CHART)
    }
    const nextPage = async (): Promise<void> => {
        setIsLoading(true)
        const dataSubmit = {
            weekStart: getMondayOfCurrentWeek().split("T")[0],
            date: new Date().toISOString().split("T")[0],
            systole: Number(maxBloodPressure),
            diastole: Number(minBloodPressure),
        }
        try {
            const res = await planService.postBloodPressure(dataSubmit)
            if (res.code === 201) {
                setIsLoading(false)
                viewChart()
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
    }
    const handleSetMaxBloodPressure = (value: string) => {
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setMaxBloodPressure(value);
        }
    }
    const handleSetMinBloodPressure = (value: string) => {
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setMinBloodPressure(value);
        }
    }


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t('common.diseases.highBlood')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('recordHealthData.bloodPressureProfile')}
                        </Text>
                    </Pressable>
                    <Pressable onPress={viewChart} style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('recordHealthData.viewChart')}
                        </Text>
                    </Pressable>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <Text style={styles.title}>{t('recordHealthData.minMaxPressure')}</Text>
                    <View style={[flexRowCenter, styles.item]}>
                        <Text style={[styles.title, { color: colors.gray_G09 }]}>{t('common.text.max')}</Text>
                        <View style={{ width: "60%", marginLeft: 20 }}>
                            <InputNumber
                                textRight='mmHG'
                                value={maxBloodPressure}
                                keyboardType={"numeric"}
                                handleSetValue={handleSetMaxBloodPressure}
                                styleInput={{ paddingLeft: 50 }}
                            />
                        </View>
                    </View>
                    <View style={[flexRowCenter, styles.item]}>
                        <Text style={[styles.title, { color: colors.gray_G09 }]}>{t('common.text.min')}</Text>
                        <View style={{ width: "60%", marginLeft: 20 }}>
                            <InputNumber
                                textRight='mmHG'
                                value={minBloodPressure}
                                keyboardType={"numeric"}
                                handleSetValue={handleSetMinBloodPressure}
                                styleInput={{ paddingLeft: 50 }}
                            />
                        </View>
                    </View>
                    {messageError && !isLoading && <Text style={[styles.title, { color: colors.red }]}>{messageError}</Text>}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={minBloodPressure && maxBloodPressure ? false : true}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: minBloodPressure && maxBloodPressure ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: minBloodPressure && maxBloodPressure ? colors.white : colors.gray_G04 }]}> {t('recordHealthData.goToViewChart')}</Text>
                </Pressable>
            </View>
            {isLoading && <LoadingScreen />}
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
    }, navigate: {
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
    }
})
export default BloodPressure