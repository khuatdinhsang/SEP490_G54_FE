import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import InputNumber from '../../../../component/inputNumber';
import ItemAdvice from '../../../planManagement/component/ItemAdvice';
import Advice from '../../component/Advice';
import { SCREENS_NAME } from '../../../../navigator/const';

type dataType = {
    id: number;
    name: string;
};
const PositiveMindRecord = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const initData = [
        { id: 1, name: t("planManagement.advice.worry") },
        { id: 2, name: t("planManagement.advice.felling") },
        { id: 3, name: t("planManagement.advice.share") },
        { id: 4, name: t("planManagement.advice.regret") },
        { id: 5, name: t("planManagement.advice.negativeMind") },
        { id: 6, name: t("planManagement.advice.negativeMind") },
        { id: 7, name: t("planManagement.advice.negativeMind") },
        { id: 8, name: t("planManagement.advice.negativeMind") },
    ];
    const [data, setData] = useState<dataType[]>(initData);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.POSITIVE_MIND_CHART)
    }
    const handleSelectItem = (itemId: number) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter(item => item !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    textRight={t("common.text.next")}
                    text={t('planManagement.text.positiveMind')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={flexRow}>
                <Pressable style={[styles.navigate, styles.active]}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                        {t('recordHealthData.positiveMindProfile')}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={nextPage}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('recordHealthData.viewChart')}
                    </Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    <Text style={styles.title}> {t('recordHealthData.selectEveryThing')}</Text>
                    {data.map((item: dataType) => {
                        const isSelected = selectedItems.includes(item.id);
                        return (
                            <Advice key={item.id} item={item} handleSelectItem={handleSelectItem} isSelected={isSelected} />
                        );
                    })}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={selectedItems.length > 0 ? false : true}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: selectedItems.length > 0 ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: selectedItems.length > 0 ? colors.white : colors.gray_G04 }]}> {t('recordHealthData.goToViewChart')}</Text>
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
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: "center",
        marginBottom: 20
    },
})
export default PositiveMindRecord