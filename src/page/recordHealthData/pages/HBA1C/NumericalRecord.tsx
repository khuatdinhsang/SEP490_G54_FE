import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SCREENS_NAME } from '../../../../navigator/const';
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowSpaceBetween } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import { IMAGE } from '../../../../constant/image';
import { TypeTimeMeasure, TypeValueTimeMeasure } from '../../contant';
import { planService } from '../../../../services/plan';
import { timeMeasureDone } from '../../../../constant/type/medical';
import LoadingScreen from '../../../../component/loading';

interface DataType {
    id: number;
    value: TypeTimeMeasure;
    name: string;
    type: TypeValueTimeMeasure
}

const NumericalRecord = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const chooseSelectedItem = route?.params?.chooseSelectedItem;
    const [selectedItem, setSelectedItem] = useState<DataType | null>(null);
    const initData: DataType[] = [
        { id: 1, name: t("recordHealthData.beforeBreakfast"), value: TypeTimeMeasure.BEFORE_BREAKFAST, type: TypeValueTimeMeasure.beforeBreakfast },
        { id: 2, name: t("recordHealthData.afterBreakfast"), value: TypeTimeMeasure.AFTER_BREAKFAST, type: TypeValueTimeMeasure.afterBreakfast },
        { id: 3, name: t("recordHealthData.beforeLunch"), value: TypeTimeMeasure.BEFORE_LUNCH, type: TypeValueTimeMeasure.beforeLunch },
        { id: 4, name: t("recordHealthData.afterLunch"), value: TypeTimeMeasure.AFTER_LUNCH, type: TypeValueTimeMeasure.afterLunch },
        { id: 5, name: t("recordHealthData.beforeDinner"), value: TypeTimeMeasure.BEFORE_DINNER, type: TypeValueTimeMeasure.beforeDinner },
        { id: 6, name: t("recordHealthData.afterDinner"), value: TypeTimeMeasure.AFTER_DINNER, type: TypeValueTimeMeasure.afterDinner },
    ];
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [data, setData] = useState<DataType[]>(initData);
    const [listTime, setListTime] = useState<timeMeasureDone | any>({});

    useEffect(() => {
        const getTimeMeasureDone = async () => {
            setIsLoading(true);
            try {
                const res = await planService.getTimeMeasureDone();
                if (res.code === 200) {
                    setListTime(res.result);
                    setIsLoading(false);
                    setMessageError("");
                } else {
                    setIsLoading(false);
                }
            } catch (error: any) {
                if (error?.response?.status === 400) {
                    setMessageError(error.response.data.message);
                }
            } finally {
                setIsLoading(false);
            }
        };
        getTimeMeasureDone();
    }, []);

    const goBackPreviousPage = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    };

    const nextPage = () => {
        setSelectedItem(null);
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.FILL_RECORD, { selectedItem });
    };

    const handleSelectItem = (item: DataType) => {
        if (!listTime[item.value as keyof typeof listTime]) {
            setSelectedItem(prevSelectedItem => (prevSelectedItem?.id === item.id ? null : item));
        }
    };

    const navigateChart = () => {
        navigation.replace(SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD_CHART);
    };

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
                        const isCompleted = listTime[item.type as keyof typeof listTime];
                        return (
                            <Pressable
                                onPress={() => handleSelectItem(item)}
                                key={item.id}
                                disabled={isCompleted}
                                style={[
                                    flexRowSpaceBetween,
                                    styles.item,
                                    {
                                        backgroundColor: (isSelected ? colors.orange_01 : colors.white),
                                        borderColor: isSelected ? colors.orange_04 : colors.white
                                    }
                                ]}>
                                <View style={flexRow}>
                                    <Text style={[
                                        styles.textItem,
                                        { color: isCompleted ? colors.gray_G06 : (isSelected ? colors.orange_04 : colors.gray_G07) }
                                    ]}>
                                        {item.name}
                                    </Text>
                                    {isCompleted && (
                                        <View style={styles.itemChoose}>
                                            <Text style={styles.textItemChoose}>{t("recordHealthData.recordComplete")}</Text>
                                        </View>
                                    )}
                                </View>
                                <Image
                                    source={isCompleted ? IMAGE.RECORD_DATA.ICON_CHECK : (isSelected ? IMAGE.RECORD_DATA.ICON_CHECK_ORANGE : IMAGE.RECORD_DATA.ICON_CHECK)}
                                />
                            </Pressable>
                        );
                    })}
                </View>
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={!selectedItem}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: selectedItem ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: selectedItem ? colors.white : colors.gray_G04 }]}>
                        {t('common.text.next')}
                    </Text>
                </Pressable>
            </View>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
        backgroundColor: colors.white,
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
        width: '100%',
    },
    textButton: {
        textAlign: "center",
        lineHeight: 60,
        fontWeight: "500",
        fontSize: 18,
    },
    title: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: "center",
        marginBottom: 20,
    },
    item: {
        borderRadius: 12,
        paddingVertical: 22,
        paddingHorizontal: 20,
        elevation: 3,
        backgroundColor: colors.white,
        marginBottom: 15,
        borderWidth: 1,
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
        marginLeft: 5,
    },
    textItemChoose: {
        fontWeight: "400",
        fontSize: 14,
        textAlign: "center",
        color: colors.orange_04,
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
    },
    textError: {
        fontWeight: "500",
        fontSize: 14,
        color: colors.red
    }
});

export default NumericalRecord;
