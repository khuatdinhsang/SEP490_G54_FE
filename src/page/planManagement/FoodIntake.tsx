import React, { useState } from 'react';
import { Text, View, StyleSheet, Pressable, Image, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { flexCenter, flexRow, flexRowCenter } from '../../styles/flex';
import { IMAGE } from '../../constant/image';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import ProgressHeader from '../../component/progessHeader';
import TableExample from './component/TableExample';
import InputNumber from '../../component/inputNumber';
import { planService } from '../../services/plan';
import LoadingScreen from '../../component/loading';
import { getMondayOfCurrentWeek } from '../../util';

const FoodIntake = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [sizeDisk, setSizeDisk] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    const handleSetSizeDisk = (value: string) => {
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setSizeDisk(value);
        }
    }
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.WORK_OUT);
    }

    const nextPage = async (): Promise<void> => {
        setIsLoading(true)
        if (sizeDisk) {
            try {
                const data = {
                    dishPerDay: Number(sizeDisk),
                    weekStart: getMondayOfCurrentWeek().split("T")[0],
                }
                const res = await planService.postDiet(data)
                if (res.code === 200) {
                    setIsLoading(false)
                    navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.REGISTER_MEDICATION);
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
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        isTextRight={true}
                        textRight={t("common.text.next")}
                        text={t("planManagement.text.foodIntake")}
                        textRightStyle={{ color: sizeDisk ? colors.primary : colors.gray_G04 }}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={nextPage}
                    />
                </View>
                <ProgressHeader index={[0, 1, 2]} length={5} />
                <View style={styles.content}>
                    <Text style={styles.textTitle}>{t("planManagement.text.pleaseChooseVegetable")}</Text>
                    <Text style={styles.textDescription}>{t("planManagement.text.diskSize")}</Text>
                    <View style={[flexRowCenter, { flexDirection: 'column' }]}>
                        <Image source={IMAGE.PLAN_MANAGEMENT.FORK_KNIFE} />
                        <Pressable style={styles.inputContainer}>
                            <InputNumber
                                textRight={t("planManagement.text.disk")}
                                value={sizeDisk}
                                keyboardType={"numeric"}
                                handleSetValue={handleSetSizeDisk}
                                styleInput={{ paddingLeft: 50 }}
                            />
                            {(!sizeDisk) && <View style={flexRowCenter}>
                                <View style={styles.bridge}>
                                    <View style={styles.diamond} />
                                </View>
                                <View style={[flexRow, styles.insertData]}>
                                    <Text style={styles.textInsert}>{t("planManagement.text.insertData")}</Text>
                                    <Image source={IMAGE.ICON_X} tintColor={colors.white} />
                                </View>
                            </View>}
                        </Pressable>
                    </View>
                    <View style={styles.exampleContainer}>
                        <Text style={styles.exampleFruit}>{t("planManagement.text.exampleFruit")}</Text>
                        <TableExample />
                    </View>
                </View>
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!sizeDisk}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: sizeDisk ? colors.primary : colors.gray_G02 }]}>
                    <Text style={styles.text}> {t('common.text.next')}</Text>
                </Pressable>
            </View>
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
    header: {
        paddingHorizontal: 20,
    },
    content: {
        paddingHorizontal: 20,
    },
    textTitle: {
        fontWeight: '700',
        fontSize: 17,
        color: colors.gray_G07,
        textAlign: 'center',
        marginTop: 20,
    },
    textDescription: {
        fontWeight: '400',
        fontSize: 14,
        color: colors.gray_G06,
        textAlign: 'right',
        marginBottom: 10,
    },
    inputContainer: {
        width: 170,
    },
    unitInput: {
        width: '100%',
        height: 56,
        position: 'absolute',
        paddingLeft: '30%',
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
        zIndex: 100,
    },
    insertData: {
        paddingVertical: 10,
        paddingHorizontal: 14,
        borderRadius: 8,
        backgroundColor: colors.green,
        position: 'absolute',
        zIndex: 100,
        top: 10,
    },
    textInsert: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.white,
    },
    exampleContainer: {
        marginTop: 55,
        zIndex: 1,
    },
    exampleFruit: {
        fontWeight: '500',
        fontSize: 16,
        color: colors.gray_G08,
        marginBottom: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
    },
    button: {
        height: 60,
        borderRadius: 12,
        backgroundColor: colors.primary,
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 18,
    },
    textError: {
        color: colors.red,
        fontWeight: "500",
        fontSize: 18
    }
});

export default FoodIntake;
