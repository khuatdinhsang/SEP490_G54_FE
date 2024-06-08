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

const FoodIntake = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [sizeDisk, setSizeDisk] = useState<string>();

    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.WORK_OUT);
    }

    const nextPage = () => {
        if (sizeDisk) {
            navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.REGISTER_MEDICATION);
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
                <ProgressHeader index={[0, 1, 2]} length={5} style={styles.progressHeader} />
                <View style={styles.content}>
                    <Text style={styles.textTitle}>{t("planManagement.text.pleaseChooseVegetable")}</Text>
                    <Text style={styles.textDescription}>{t("planManagement.text.diskSize")}</Text>
                    <View style={[flexRowCenter, { flexDirection: 'column' }]}>
                        <Image source={IMAGE.PLAN_MANAGEMENT.FORK_KNIFE} />
                        <Pressable style={styles.inputContainer}>
                            <View style={[styles.box, { borderColor: !sizeDisk ? colors.primary : colors.gray }]}>
                                <Text style={styles.unit}>{t("planManagement.text.disk")}</Text>
                                <TextInput
                                    style={styles.unitInput}
                                    keyboardType="numeric"
                                    value={sizeDisk}
                                    onChangeText={setSizeDisk}
                                />
                            </View>
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
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!sizeDisk}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: sizeDisk ? colors.primary : colors.gray_G02 }]}>
                    <Text style={styles.text}> {t('common.text.next')}</Text>
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
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: 20,
    },
    progressHeader: {
        marginVertical: 16,
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
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
        position: 'relative',
    },
    unit: {
        lineHeight: 56,
        position: 'absolute',
        zIndex: 1000,
        right: 20,
        color: colors.black,
    },
    unitInput: {
        width: '30%',
        height: 56,
        position: 'absolute',
        marginLeft: '30%',
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
        marginTop: 30,
        zIndex: 1,
    },
    exampleFruit: {
        fontWeight: '500',
        fontSize: 16,
        color: colors.gray_G08,
        marginBottom: 20,
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
});

export default FoodIntake;
