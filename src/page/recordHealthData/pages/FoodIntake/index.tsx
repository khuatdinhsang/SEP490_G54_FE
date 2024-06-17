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

const FoodIntakeRecord = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [weight, setWeight] = useState<string>("")
    const handleViewChart = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.WEIGHT_CHART)
    }
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    const nextPage = () => {
        handleViewChart()
    }
    const handleSetWeight = (value: string) => {
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setWeight(value);
        }
    }

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
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <Text style={styles.title}>{t('recordHealthData.enterWeight')}</Text>
                    <View style={[flexRowCenter, styles.item]}>
                        <Text style={[styles.title, { color: colors.gray_G09 }]}>{t('recordHealthData.weight')}</Text>
                        <View style={{ width: "50%", marginLeft: 20 }}>
                            <InputNumber
                                textRight='kg'
                                value={weight}
                                keyboardType={"numeric"}
                                handleSetValue={handleSetWeight}
                                styleInput={{ paddingLeft: 50 }}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={weight ? false : true}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: weight ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: weight ? colors.white : colors.gray_G04 }]}> {t('recordHealthData.goToViewChart')}</Text>
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
export default FoodIntakeRecord