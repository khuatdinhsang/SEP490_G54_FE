import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { useTranslation } from 'react-i18next';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import ButtonComponent from '../../component/button';
import colors from '../../constant/color';
import ProgressHeader from '../../component/progessHeader';
import { paddingHorizontalScreen } from '../../styles/padding';
import { flexRowCenter } from '../../styles/flex';
import ItemAdvice from './component/ItemAdvice';
import ItemAdviceSelect from './component/ItemAdviceSelect';
import DialogSingleComponent from '../../component/dialog-single';
import WarningSelected from './component/WarningSelected';
import { IMAGE } from '../../constant/image';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import { planService } from '../../services/plan';
import { mentalData } from '../../constant/type/medical';
import LoadingScreen from '../../component/loading';
import { getMondayOfCurrentWeek } from '../../util';


const PositiveMind: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.MAIN);
    };
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    const [warning, setWarning] = useState(false);
    const [data, setData] = useState<mentalData[]>([]);
    const [selectedItems, setSelectedItems] = useState<mentalData[]>([]);
    useEffect(() => {
        const fetchListMental = async () => {
            setIsLoading(true)
            try {
                const res = await planService.getListMental()
                if (res.code === 200) {
                    setIsLoading(false)
                    setData(res.result);
                } else {
                    setMessageError("Failed to fetch questions.");
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
        };
        fetchListMental()
    }, [])

    const nextPage = async (): Promise<void> => {
        setIsLoading(true)
        if (selectedItems.length === 3) {
            const mentalRuleId = selectedItems.map(item => item.id)
            const data = {
                mentalRuleId,
                status: true,
                weekStart: getMondayOfCurrentWeek().split("T")[0],
                date: new Date().toISOString()
            }
            try {
                const res = await planService.postListMental(data)
                if (res.code === 200) {
                    setIsLoading(false)
                    navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.WORK_OUT)
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

    const handleSelectItem = (itemId: number, isAdd: boolean) => {
        if (isAdd) {
            setData(prevItems => {
                const item = prevItems.find(item => item.id === itemId);
                if (item) {
                    if (selectedItems.length >= 3) {
                        setWarning(true);
                        return prevItems;
                    }
                    setWarning(false);
                    setSelectedItems(prevSelectedItems => [...prevSelectedItems, item]);
                    return prevItems.filter(item => item.id !== itemId);
                }
                return prevItems;
            });
        } else {
            setWarning(false);
            setSelectedItems(prevSelectedItems => {
                const item = prevSelectedItems.find(item => item.id === itemId);
                if (item) {
                    setData(prevItems => [...prevItems, item]);
                    return prevSelectedItems.filter(item => item.id !== itemId);
                }
                return prevSelectedItems;
            });
        }
    };
    const closeModal = () => {
        setWarning(false);
    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            {warning && (
                <TouchableOpacity style={styles.overlay} onPress={closeModal}>
                    <WarningSelected />
                </TouchableOpacity>
            )}
            <View style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20 }}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        isTextRight={true}
                        textRightStyle={{ color: selectedItems.length === 3 ? colors.primary : colors.gray_G04 }}
                        textRight={t("common.text.next")}
                        text={t("planManagement.text.positiveMind")}
                        handleClickArrowLeft={goBackPreviousPage}
                        handleClickIconRight={nextPage}
                    />
                </View>
                <ProgressHeader index={[0]} length={5} />
                <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                    <View>
                        <Text style={styles.mentalRules}>{t("planManagement.text.mentalRules")}</Text>
                        <View style={{ marginTop: 10 }}>
                            <View style={[flexRowCenter, { marginBottom: 20 }]}>
                                <View style={styles.chooseThree}>
                                    <Text style={styles.textChooseThree}>
                                        {t('planManagement.text.bottom')}
                                        <Text style={styles.highlight}>
                                            {t('planManagement.text.three')}{' '}
                                        </Text>
                                        {t('planManagement.text.select')}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.bridge}>
                                <View style={styles.diamond}></View>
                            </View>
                            {selectedItems.length > 0 && (
                                <View style={styles.selectedItem}>
                                    {selectedItems.map((item: mentalData) => (
                                        <ItemAdviceSelect key={item.id} item={item} handleSelectItem={handleSelectItem} />
                                    ))}
                                </View>
                            )}
                            <View style={{ paddingHorizontal: 20 }}>
                                {data.map((item: mentalData) => {
                                    return (
                                        <ItemAdvice key={item.id} item={item} handleSelectItem={handleSelectItem} />
                                    );
                                })}
                            </View>
                        </View>
                        {messageError && !isLoading && <Text style={[styles.textError, { paddingHorizontal: 20 }]}>{messageError}</Text>}
                    </View>
                </ScrollView>
                <View style={styles.buttonContainer}>
                    <Pressable
                        disabled={selectedItems.length !== 3}
                        onPress={nextPage}
                        style={[styles.button, { backgroundColor: selectedItems.length === 3 ? colors.primary : colors.gray_G02 }]}>
                        <Text style={[styles.text, { color: selectedItems.length === 3 ? colors.white : colors.gray_G04 }]}>{t('common.text.next')}</Text>
                    </Pressable>
                </View>
            </View>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    mentalRules: {
        fontWeight: '700',
        fontSize: 18,
        textAlign: 'center',
        color: colors.gray_G07,
        marginTop: 10,
    },
    backgroundWarning: {
        position: 'absolute',
        top: '30%',
        left: '8%',
        zIndex: 100,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        zIndex: 10,
    },
    chooseThree: {
        backgroundColor: colors.gray_G07,
        borderRadius: 99,
        paddingVertical: 10,
        paddingHorizontal: 16,
        position: 'relative',
        alignSelf: 'baseline',
    },
    selectedItem: {
        backgroundColor: colors.gray_G02,
        marginBottom: 20,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    textChooseThree: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.white,
        textAlign: 'center',
    },
    highlight: {
        color: colors.primary,
    },
    bridge: {
        position: 'absolute',
        top: 32,
        left: '50%',
        zIndex: 10,
        transform: [{ translateX: -7.5 }]
    },
    diamond: {
        width: 15,
        height: 15,
        backgroundColor: colors.gray_G07,
        transform: [{ rotate: '45deg' }],
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 28,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 17,
        borderRadius: 12,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        paddingTop: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    warning: {
        backgroundColor: colors.black,
        opacity: 0.7,
        borderRadius: 12,
        padding: 16,
    },
    textWarning: {
        fontWeight: '700',
        fontSize: 16,
        color: colors.white,
    },
    textError: {
        color: colors.red,
        fontWeight: "500",
        fontSize: 18
    }
});

export default PositiveMind;
