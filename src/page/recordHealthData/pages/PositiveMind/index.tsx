import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter } from '../../../../styles/flex';
import colors from '../../../../constant/color';
import InputNumber from '../../../../component/inputNumber';
import ItemAdvice from '../../../planManagement/component/ItemAdvice';
import Advice from '../../component/Advice';
import { SCREENS_NAME } from '../../../../navigator/const';
import { planService } from '../../../../services/plan';
import { getMondayOfCurrentWeek } from '../../../../util';
import { mentalData } from '../../../../constant/type/medical';
import LoadingScreen from '../../../../component/loading';
import { IMAGE } from '../../../../constant/image';


const PositiveMindRecord = ({ route }: any) => {

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
    const [data, setData] = useState<mentalData[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const isEditable = route?.params?.isEditable;
    const [isEdit, setIsEdit] = useState<boolean>(isEditable)
    useEffect(() => {
        const fetchDataMentalRecord = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const res = await planService.getListMentalRecords(getMondayOfCurrentWeek().split("T")[0]);
                if (res.code === 200) {
                    setIsLoading(false);
                    setMessageError("");
                    setData(res.result);
                } else {
                    setMessageError("Unexpected error occurred.");
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
        fetchDataMentalRecord();
    }, []);
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN);
    }
    const nextPage = async (): Promise<void> => {
        setIsLoading(true)
        try {
            const data = {
                date: new Date().toISOString(),
                status: true,
                mentalRuleId: selectedItems
            }
            const res = await planService.putMentalRecords(data)
            if (res.code === 200) {
                setMessageError("");
                setIsLoading(false)
                setIsEdit(false)
                navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.POSITIVE_MIND_CHART, { isEditable: false });

            } else {
                setMessageError("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400) {
                setMessageError(error.response.data.message);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        }
        finally {
            setIsLoading(false)
        }
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
    const viewChart = () => {
        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.POSITIVE_MIND_CHART, { isEditable: isEdit });
    }
    console.log("a", isEdit)
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
                    onPress={viewChart}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('recordHealthData.viewChart')}
                    </Text>
                </Pressable>
            </View>
            {isEdit ?
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                        <Text style={styles.title}> {t('recordHealthData.selectEveryThing')}</Text>
                        {data.map((item: mentalData) => {
                            const isSelected = selectedItems.includes(item.id);
                            return (
                                <Advice key={item.id} item={item} handleSelectItem={handleSelectItem} isSelected={isSelected} />
                            );
                        })}
                        {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
                    </View>
                </ScrollView>
                :
                <View style={[flexCenter, { marginTop: 100 }]}>
                    <Image source={IMAGE.RECORD_DATA.ICON_FACE_SMILES} />
                    <Text style={styles.textTitle}>{t('recordHealthData.haven\'tEnteredAnyNumbers')}</Text>
                    <Text style={styles.textDesc}>{t('recordHealthData.enterNumberFirst')}</Text>
                    <Pressable
                        onPress={() => {
                            navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.POSITIVE_MIND_CHART, { isEditable: false });
                        }}
                        style={styles.buttonChart}>
                        <Text style={styles.textButtonChart}>{t('recordHealthData.enterRecord')}</Text>
                    </Pressable>
                </View>
            }
            {isEdit && <View style={styles.buttonContainer}>
                <Pressable
                    disabled={selectedItems.length > 0 ? false : true}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: selectedItems.length > 0 ? colors.primary : colors.gray_G02 }]}>
                    <Text style={[styles.textButton, { color: selectedItems.length > 0 ? colors.white : colors.gray_G04 }]}> {t('recordHealthData.goToViewChart')}</Text>
                </Pressable>
            </View>
            }
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
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G07,
        textAlign: "center",
        marginBottom: 20
    },
    textError: {
        fontSize: 14,
        color: colors.red,
        fontWeight: "500"
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
})
export default PositiveMindRecord