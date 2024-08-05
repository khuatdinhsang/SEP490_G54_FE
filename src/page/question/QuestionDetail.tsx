import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow } from '../../styles/flex';
import colors from '../../constant/color';
import InputComponent from '../../component/input';
import { questionResponse } from './const';
import { questionService } from '../../services/question';
import LoadingScreen from '../../component/loading';

const QuestionDetail = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const questionId = route?.params?.questionId;
    const [questionDetail, setQuestionDetail] = useState<questionResponse>()
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const fetchDetailQuestion = async () => {
        setIsLoading(true)
        try {
            const res = await questionService.getDetailQuestion(questionId);
            console.log("Res", res);
            if (res.code === 200) {
                setErrorMessage("");
                setIsLoading(false)
                setQuestionDetail(res.result);
            } else {
                setErrorMessage("Failed to fetch questions.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Unexpected error occurred.");
            }
        } finally {
            setIsLoading(false)
        }
    };
    useEffect(() => {
        fetchDetailQuestion()
    }, [questionId])
    console.log(questionDetail)
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    const nextPage = () => {
        navigateQuestion()
    }
    const navigateQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.MAIN)
    }
    const navigateRegularQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.REGULAR)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={[styles.header, { backgroundColor: colors.white }]}>
                    <HeaderNavigatorComponent
                        isIconLeft={true}
                        textRight={t("common.text.next")}
                        text={t('questionManagement.makeQuestion')}
                        handleClickArrowLeft={goBackPreviousPage}
                    />
                </View>
                <View style={[flexRow, { backgroundColor: colors.white }]}>
                    <Pressable
                        onPress={navigateQuestion}
                        style={[styles.navigate, styles.active]}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                            {t('questionManagement.contactUs')}
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={navigateRegularQuestion}
                        style={styles.navigate}>
                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                            {t('questionManagement.regularQuestion')}
                        </Text>
                    </Pressable>
                </View>
                <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 20, }}>
                    <InputComponent
                        value={questionDetail?.title?.trim()}
                        label={t("questionManagement.title")}
                        styleInput={{ backgroundColor: colors.white }}
                        multiline={true}
                        textAlignVertical="center"
                        isEditable={false}
                    />
                    <View style={{ marginTop: 15 }}>
                        <InputComponent
                            value={questionDetail?.body?.trim()}
                            label={t("questionManagement.content")}
                            styleInput={{ backgroundColor: colors.white, paddingBottom: 20 }}
                            multiline={true}
                            isEditable={false}
                        />
                    </View>
                    {questionDetail?.answer &&
                        <View style={{ marginTop: 15 }}>
                            <InputComponent
                                value={questionDetail?.answer.trim()}
                                label={t("questionManagement.answerResponse")}
                                styleInput={{ backgroundColor: colors.white, paddingBottom: 20 }}
                                multiline={true}
                                isEditable={false}
                            />
                        </View>
                    }
                    {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    disabled={false}
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={styles.textButton}> {t('common.text.confirm')}</Text>
                </Pressable>
            </View>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
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
    },
})
export default QuestionDetail