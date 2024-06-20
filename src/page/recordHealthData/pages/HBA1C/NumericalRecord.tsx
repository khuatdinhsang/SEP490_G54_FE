import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowSpaceBetween } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';

interface DataType {
    id: number;
    value: string;
}

const NumericalRecord = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const chooseSelectedItem = route?.params?.chooseSelectedItem
    const [selectedItem, setSelectedItem] = useState<DataType | null>(null);
    const initData: DataType[] = [
        { id: 1, value: t("recordHealthData.beforeBreakfast") },
        { id: 2, value: t("recordHealthData.afterBreakfast") },
        { id: 3, value: t("recordHealthData.beforeLunch") },
        { id: 4, value: t("recordHealthData.afterLunch") },
        { id: 5, value: t("recordHealthData.beforeDinner") },
        { id: 6, value: t("recordHealthData.afterDinner") },
    ];

    const [data, setData] = useState<DataType[]>(initData);

    const goBackPreviousPage = () => {
        navigation.goBack();
    };

    const nextPage = () => {
        setSelectedItem(null)
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.FILL_RECORD, { selectedItem });
    };

    const handleSelectItem = (item: DataType) => {
        setSelectedItem(prevSelectedItem => (prevSelectedItem?.id === item.id ? null : item));
    };
    const navigateChart = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD_CHART)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={`${t('recordHealthData.glycatedHemoglobin')}/${t('recordHealthData.cholesterol')}/${t('recordHealthData.bloodSugar')}`}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <View style={[flexRow, { backgroundColor: colors.white }]}>
                <Pressable
                    style={[styles.navigate, styles.active]}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                        {t('recordHealthData.bloodCountRecord')}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={navigateChart}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('recordHealthData.viewChart')}
                    </Text>
                </Pressable>
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
                    <Text style={styles.title}>{t('recordHealthData.chooseMeal')}/{t('recordHealthData.chooseMealTime')}</Text>
                    {data && data.map((item) => {
                        const isSelected = selectedItem?.id === item.id;
                        return (
                            <Pressable
                                onPress={() => handleSelectItem(item)}
                                key={item.id}
                                style={[flexRowSpaceBetween, styles.item, { backgroundColor: isSelected ? colors.orange_01 : colors.white, borderColor: isSelected ? colors.orange_04 : colors.white }]}>
                                <View style={flexRow}>
                                    <Text style={[styles.textItem, { color: isSelected ? colors.orange_04 : colors.gray_G07 }]}>{item.value}</Text>
                                    {item.id === chooseSelectedItem?.id && <View style={styles.itemChoose}>
                                        <Text style={styles.textItemChoose}>{item.value}</Text>
                                    </View>}
                                </View>
                                <Image source={isSelected ? IMAGE.RECORD_DATA.ICON_CHECK_ORANGE : IMAGE.RECORD_DATA.ICON_CHECK} />
                            </Pressable>
                        );
                    })}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!selectedItem}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: selectedItem ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: selectedItem ? colors.white : colors.gray_G04 }]}> {t('common.text.next')}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
        backgroundColor: colors.white
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
    title: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: "center",
        marginBottom: 20
    },
    item: {
        borderRadius: 12,
        paddingVertical: 22,
        paddingHorizontal: 20,
        elevation: 3,
        backgroundColor: colors.white,
        marginBottom: 15,
        borderWidth: 1
    },
    textItem: {
        fontWeight: "500",
        fontSize: 20,
    },
    itemChoose: {
        backgroundColor: colors.orange_01,
        borderRadius: 999,
        paddingVertical: 3,
        paddingHorizontal: 12,
        marginLeft: 5
    },
    textItemChoose: {
        fontWeight: "400",
        fontSize: 14,
        textAlign: "center",
        color: colors.orange_04
    }
});

export default NumericalRecord;
