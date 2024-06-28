import React, { useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { useTranslation } from 'react-i18next';
import ProgressHeader from '../../component/progessHeader';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import colors from '../../constant/color';
import { flexCenter, flexRow, flexRowCenter } from '../../styles/flex';
import { IMAGE } from '../../constant/image';
import { HeightDevice } from '../../util/Dimenssion';
import InputNumber from '../../component/inputNumber';
import { planService } from '../../services/plan';
import LoadingScreen from '../../component/loading';
import { getMondayOfCurrentWeek } from '../../util';

const NumberSteps = () => {
    const { t } = useTranslation();
    const [numberSteps, setNumberSteps] = useState<string>("");
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.LIST_REGISTER_MEDICATION);
    };

    const nextPage = async (): Promise<void> => {
        setIsLoading(true)
        if (numberSteps) {
            try {
                const data = {
                    plannedStepPerDay: Number(numberSteps),
                    weekStart: getMondayOfCurrentWeek().split("T")[0],
                }
                const res = await planService.postStepsNumber(data)
                if (res.code === 200) {
                    setIsLoading(false)
                    navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.SUCCESS);
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
    };
    const handleSetNumberSteps = (value: string) => {
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setNumberSteps(value);
        }
    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <HeaderNavigatorComponent
                        isTextRight={true}
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t("planManagement.text.numberSteps")}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={nextPage}
                        textRightStyle={{ color: numberSteps ? colors.primary : colors.gray_G04 }}
                    />
                </View>
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <ProgressHeader index={[0, 1, 2, 3, 4]} length={5} />
                    <Text style={styles.textPlan}>{t("planManagement.text.stepGoal")}</Text>
                    <View style={[flexCenter, { flexDirection: 'column' }]}>
                        <Image style={{ marginTop: 30, height: 100, width: 100, marginBottom: 20 }} source={IMAGE.PLAN_MANAGEMENT.SHOES} />
                        <Pressable style={{ width: 170 }}>
                            <InputNumber
                                textRight={t("common.text.step")}
                                value={numberSteps}
                                keyboardType={"numeric"}
                                handleSetValue={handleSetNumberSteps}
                                styleInput={{ paddingLeft: 50 }}
                            />
                            {(!numberSteps) && <View style={flexRowCenter}>
                                <View style={[flexRow, styles.bridge]}>
                                    <View style={styles.diamond} />
                                </View>
                                <View style={[flexRow, styles.insertData]}>
                                    <Text style={styles.textInsert}>{t("planManagement.text.insertData")}</Text>
                                    <Image source={IMAGE.ICON_X} tintColor={colors.white} />
                                </View>
                            </View>}
                        </Pressable>
                    </View>
                    {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
                </ScrollView>
            </View>
            <Pressable
                disabled={!numberSteps}
                onPress={() => nextPage()}
                style={[styles.button, { backgroundColor: numberSteps ? colors.primary : colors.gray_G02 }]}>
                <Text style={[styles.text, { color: numberSteps ? colors.white : colors.gray_G04 }]}> {t('common.text.next')}</Text>
            </Pressable>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textPlan: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: 'center',
        marginTop: 20
    },
    button: {
        height: 60,
        borderRadius: 12,
        marginHorizontal: 20,
        marginBottom: 20, // Ensure space at the bottom
        justifyContent: 'center', // Center text vertically
        alignItems: 'center', // Center text horizontally
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
    },
    bridge: {
        position: 'absolute',
        top: 5,
        left: "50%",
        transform: [{ translateX: -7.5 }]
    },
    diamond: {
        width: 15,
        height: 15,
        backgroundColor: colors.green,
        transform: [{ rotate: '45deg' }],
        zIndex: 100
    },
    insertData: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: colors.green,
        position: 'absolute',
        top: 10,
        zIndex: 100,
    },
    textInsert: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.white
    },
    textError: {
        color: colors.red,
        fontWeight: "500",
        fontSize: 18
    }
})

export default NumberSteps;
