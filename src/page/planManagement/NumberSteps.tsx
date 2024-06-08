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

const NumberSteps = () => {
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.LIST_REGISTER_MEDICATION);
    };

    const nextPage = () => {
        if (numberSteps) {
            navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.SUCCESS);
        }
    };

    const [numberSteps, setNumberSteps] = useState<string>();

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
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <ProgressHeader index={[0, 1, 2, 3, 4]} length={5} style={{ marginVertical: 16 }} />
                    <Text style={styles.textPlan}>{t("planManagement.text.stepGoal")}</Text>
                    <View style={[flexCenter, { flexDirection: 'column' }]}>
                        <Image style={{ marginTop: 30, height: 100, width: 100, marginBottom: 20 }} source={IMAGE.PLAN_MANAGEMENT.SHOES} />
                        <Pressable style={{ width: 170 }}>
                            <View
                                style={[styles.box, {
                                    borderColor: !numberSteps ? colors.primary : colors.gray
                                }]}>
                                <Text style={styles.unit}>{t("common.text.step")}</Text>
                                <TextInput
                                    style={styles.unitInput}
                                    keyboardType="numeric"
                                    value={numberSteps}
                                    onChangeText={setNumberSteps}
                                />
                            </View>
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
                </ScrollView>
            </View>
            <Pressable
                disabled={!numberSteps}
                onPress={() => nextPage()}
                style={[styles.button, { backgroundColor: numberSteps ? colors.primary : colors.gray_G02 }]}>
                <Text style={[styles.text, { color: numberSteps ? colors.white : colors.gray_G04 }]}> {t('common.text.next')}</Text>
            </Pressable>
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
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    unit: {
        position: 'absolute',
        right: 20,
        color: colors.black,
    },
    unitInput: {
        width: '70%',
        height: 56,
        textAlign: 'center'
    },
    bridge: {
        position: 'absolute',
        top: 5,
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
})

export default NumberSteps;
