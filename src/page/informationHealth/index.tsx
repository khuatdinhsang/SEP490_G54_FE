import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import { SCREENS_NAME } from '../../navigator/const';
import { flexCenter, flexRowCenter, flexRowSpaceEvenly } from '../../styles/flex';
import { paddingHorizontalScreen } from '../../styles/padding';
import { HeightDevice } from '../../util/Dimenssion';
import WeekComponent from './components/WeekComponent';
import { useCallback, useEffect, useState } from 'react';
import LoadingScreen from '../../component/loading';
import { lessonService } from '../../services/lesson';
import ModalDoneLesson from './components/ModalDoneLesson';

const InformationHealth = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [curDay, setCurDay] = useState(1);
    const [messageError, setErrorMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const toggleModal = () => {
        setShowDialog(!showDialog);
    };

    const getListLesson = async () => {
        setIsLoading(true)
        try {
            const res = await lessonService.getLessonUnLocked()
            if (res.code === 200) {
                console.log("d", res)
                setCurDay(res.result.lesson)
                setShowDialog(res.result.statusCheck)
                setErrorMessage("");
                setIsLoading(false)
            } else {
                setErrorMessage("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Unexpected error occurred.");
            }
        }
        finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getListLesson()
    }, [])
    useFocusEffect(
        useCallback(() => {
            getListLesson();
        }, [])
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: paddingHorizontalScreen * 2 }}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text="학습하기"
                    handleClickArrowLeft={() => {
                        navigation.goBack();
                    }}
                />
            </View>
            <WeekComponent />
            <View style={{ marginTop: 28 }} />
            <View style={[flexRowCenter]}>
                <Text style={styles.title}>건강경영전략에 대해 학습해봅시다</Text>
            </View>
            <View style={{ marginTop: 24 }} />
            <View style={[flexRowSpaceEvenly]}>
                <Pressable
                    style={[flexCenter, styles.imageWrap]}
                    disabled={curDay < 1}
                    onPress={() =>
                        navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY1)
                    }>
                    <Image
                        source={
                            curDay >= 1
                                ? IMAGE.INFORMATION_HEALTH.CATEGORY
                                : IMAGE.INFORMATION_HEALTH.LOCK
                        }
                    />
                    <Text
                        style={[
                            styles.textDay,
                            {
                                color: curDay >= 1 ? colors.black : colors.gray_G04,
                            },
                        ]}>
                        1일차
                    </Text>
                </Pressable>
                <Pressable
                    style={[flexCenter, styles.imageWrap]}
                    disabled={curDay < 2}
                    onPress={() => {
                        navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY2);
                    }}>
                    <Image
                        source={
                            curDay >= 2
                                ? IMAGE.INFORMATION_HEALTH.CATEGORY
                                : IMAGE.INFORMATION_HEALTH.LOCK
                        }
                    />
                    <Text
                        style={[
                            styles.textDay,
                            {
                                color: curDay >= 2 ? colors.black : colors.gray_G04,
                            },
                        ]}>
                        2일차
                    </Text>
                </Pressable>
                <Pressable
                    style={[flexCenter, styles.imageWrap]}
                    disabled={curDay < 3}
                    onPress={() => {
                        navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY3);
                    }}>
                    <Image
                        source={
                            curDay >= 3
                                ? IMAGE.INFORMATION_HEALTH.CATEGORY
                                : IMAGE.INFORMATION_HEALTH.LOCK
                        }
                    />
                    <Text
                        style={[
                            styles.textDay,
                            {
                                color: curDay >= 3 ? colors.black : colors.gray_G04,
                            },
                        ]}>
                        3일차
                    </Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 28 }} />
            <View style={[flexRowSpaceEvenly]}>
                <Pressable
                    style={[flexCenter, styles.imageWrap]}
                    disabled={curDay < 4}
                    onPress={() => {
                        navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY4);
                    }}>
                    <Image
                        source={
                            curDay >= 4
                                ? IMAGE.INFORMATION_HEALTH.CATEGORY
                                : IMAGE.INFORMATION_HEALTH.LOCK
                        }
                    />
                    <Text
                        style={[
                            styles.textDay,
                            {
                                color: curDay >= 4 ? colors.black : colors.gray_G04,
                            },
                        ]}>
                        4일차
                    </Text>
                </Pressable>
                <Pressable
                    style={[flexCenter, styles.imageWrap]}
                    disabled={curDay < 5}
                    onPress={() => {
                        navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY5);
                    }}>
                    <Image
                        source={
                            curDay >= 5
                                ? IMAGE.INFORMATION_HEALTH.CATEGORY
                                : IMAGE.INFORMATION_HEALTH.LOCK
                        }
                    />
                    <Text
                        style={[
                            styles.textDay,
                            {
                                color: curDay >= 5 ? colors.black : colors.gray_G04,
                            },
                        ]}>
                        5일차
                    </Text>
                </Pressable>
                <Pressable style={[flexCenter, styles.imageWrap]}
                    disabled={curDay < 6}
                    onPress={() => {
                        navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY6);
                    }}>

                    <Image
                        source={
                            curDay >= 6
                                ? IMAGE.INFORMATION_HEALTH.CATEGORY
                                : IMAGE.INFORMATION_HEALTH.LOCK
                        }
                    />
                    <Text
                        style={[
                            styles.textDay,
                            {
                                color: curDay >= 6 ? colors.black : colors.gray_G04,
                            },
                        ]}>
                        6일차
                    </Text>
                </Pressable>
            </View>
            <View style={{ marginTop: 28 }} />
            <View style={{ flexDirection: 'row', marginLeft: 30 }}>
                <Pressable style={[flexCenter, styles.imageWrap]}
                    disabled={curDay < 7}
                    onPress={() => {
                        navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY7);
                    }}>
                    <Image
                        source={
                            curDay >= 7
                                ? IMAGE.INFORMATION_HEALTH.CATEGORY
                                : IMAGE.INFORMATION_HEALTH.LOCK
                        }
                    />
                    <Text
                        style={[
                            styles.textDay,
                            {
                                color: curDay >= 7 ? colors.black : colors.gray_G04,
                            },
                        ]}>
                        7일차
                    </Text>
                </Pressable>
            </View>
            {showDialog && <ModalDoneLesson visible={showDialog} toggleModal={toggleModal} />}
            {isLoading && <LoadingScreen />}
            {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: paddingHorizontalScreen * 2,
        height: HeightDevice,
        backgroundColor: colors.white,
    },
    title: {
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 28,
        color: colors.black,
    },
    textDay: {
        marginTop: 10,
        fontWeight: '500',
        fontSize: 16,
        lineHeight: 24,
    },
    imageWrap: {
        width: 100,
        height: 100,
        paddingHorizontal: 24,
        paddingVertical: 24,
    },
    textError: {
        fontWeight: "500",
        color: colors.red,
        fontSize: 14
    }
});

export default InformationHealth;