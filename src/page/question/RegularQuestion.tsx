import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow } from '../../styles/flex';
import colors from '../../constant/color';
import RegularQuestionComponent from './component/RegularQuestion';
import { questionService } from '../../services/question';
import { questionRegular } from '../../constant/type/question';
import LoadingScreen from '../../component/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANG } from '../home/const';
const RegularQuestion = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [messageError, setMessageError] = useState<string>("")
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    const nextPage = () => {

    }
    const [listQuestion, setListQuestion] = useState<questionRegular[]>([])
    useEffect(() => {
        const getListQuestion = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const langAys = await AsyncStorage.getItem("language")
                const lang = langAys === 'en' ? LANG.EN : LANG.KR
                const resData = await questionService.getListQuestionRegular(lang);
                if (resData.code === 200) {
                    setIsLoading(false);
                    setListQuestion(resData.result)
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
        getListQuestion();
    }, []);
    console.log("49", listQuestion)
    const handleDetailQuestion = (id: number) => {
        navigation.navigate(SCREENS_NAME.QUESTION.DETAIL, { questionId: id })
    }
    const navigateQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.MAIN)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.header}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t('questionManagement.makeQuestion')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={flexRow}>
                    <Pressable
                        onPress={navigateQuestion}
                        style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('questionManagement.contactUs')}
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('questionManagement.regularQuestion')}
                        </Text>
                    </Pressable>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 30 }}>
                    {listQuestion && listQuestion.map((item) => {
                        return (
                            <RegularQuestionComponent key={item.id} question={item} />
                        )
                    })}
                </View>
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
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
    textError: {
        fontSize: 14,
        fontWeight: "500",
        color: colors.red
    }
})
export default RegularQuestion