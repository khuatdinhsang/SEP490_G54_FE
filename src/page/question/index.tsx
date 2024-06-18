import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow } from '../../styles/flex';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import { questionService } from '../../services/question';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import QuestionComponent from './component/Question';
import { questionResponse } from './const';


const Question = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [listQuestion, setListQuestion] = useState<questionResponse[]>([])
    const [messageError, setMessageError] = useState<string>("")
    const goBackPreviousPage = () => {
        navigation.goBack();
    }
    const fetchListQuestion = async () => {
        try {
            const res = await questionService.getListQuestionByUser();
            console.log("Res", res);
            if (res.code === 200) {
                setListQuestion(res.result || []);
            } else {
                setMessageError("Failed to fetch questions.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 401) {
                setMessageError(error.message);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        }
    };
    useFocusEffect(
        useCallback(() => {
            fetchListQuestion();
        }, [])
    );
    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.ADD);
    }
    const navigateQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.MAIN)
    }
    const navigateRegularQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.REGULAR)
    }
    const handleDetailQuestion = (id: number) => {
        navigation.navigate(SCREENS_NAME.QUESTION.DETAIL, { questionId: id })
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
                    <Pressable onPress={navigateQuestion} style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('questionManagement.contactUs')}
                        </Text>
                    </Pressable>
                    <Pressable onPress={navigateRegularQuestion} style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('questionManagement.regularQuestion')}
                        </Text>
                    </Pressable>
                </View>
                <View style={{ paddingHorizontal: 20, marginTop: 20, }}>
                    {listQuestion.length > 0 ?
                        listQuestion.map((item) => {
                            return (
                                <QuestionComponent key={item.id} question={item} handleDetailQuestion={handleDetailQuestion} />
                            )
                        })
                        :
                        <View style={[flexCenter, { height: '80%' }]}>
                            <Image source={IMAGE.QUESTION.TEXT} />
                            <Text style={styles.textTitle}>{t('questionManagement.noRequest')}</Text>
                            <Text style={styles.textDesc}>{t('questionManagement.typeToRequest')}</Text>
                        </View>}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={styles.textButton}> {t('questionManagement.write')}</Text>
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
    textTitle: {
        fontWeight: '700',
        fontSize: 20,
        color: colors.gray_G10,
        textAlign: "center",
    },
    textDesc: {
        fontWeight: '400',
        fontSize: 16,
        color: colors.gray_G06,
        textAlign: "center",
    },
})
export default Question