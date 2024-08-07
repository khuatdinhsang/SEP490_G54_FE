import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputShareComponent from '../../../components/InputShareComponent';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import { setClosePerson1EvaluationRedux, setClosePerson1MessageRedux, setClosePerson2EvaluationRedux, setClosePerson2MessageRedux } from '../../../../../store/closePerson.slice';
import { lessonService } from '../../../../../services/lesson';

interface Step2_2Props {
    closePersonEvaluation: string
    closePersonMessage: string,
    setIsDisabled: (value: boolean) => void,
    user: number,
    setClosePersonEvaluation: (value: string) => void,
    setClosePersonMessage: (value: string) => void,
    setIsLoading: (value: boolean) => void
}
const Step2_2 = (props: Step2_2Props) => {
    const { closePersonEvaluation, closePersonMessage, setIsDisabled,
        user, setClosePersonEvaluation, setClosePersonMessage, setIsLoading } = props
    const { t } = useTranslation();
    const [comment, setComment] = useState<string>(closePersonEvaluation)
    const [errComment, setErrComment] = useState<string>("")
    const [messagePositive, setMessagePositive] = useState<string>(closePersonMessage)
    const [errMessagePositive, setErrMessagePositive] = useState<string>("")
    const [messageError, setMessageError] = useState<string>("")
    const dispatch = useDispatch()
    useEffect(() => {
        const isDisable = (comment && messagePositive && !errComment?.length && !errMessagePositive?.length) ? false : true;
        setIsDisabled(isDisable);
    }, [comment, messagePositive, setIsDisabled]);


    useEffect(() => {
        const getDataLesson3 = async () => {
            setIsLoading(true)
            try {
                const res = await lessonService.getLesson3()
                if (res.code === 200) {
                    setIsLoading(false)
                    setMessageError("");
                    if (user === 1) {
                        if (!closePersonEvaluation) setComment(res.result.closePerson1Evaluation)
                        if (!closePersonMessage) setMessagePositive(res.result.closePerson1Message)
                    } else {
                        if (!closePersonEvaluation) setComment(res.result.closePerson2Evaluation)
                        if (!closePersonMessage) setMessagePositive(res.result.closePerson2Message)
                    }
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
        getDataLesson3()
    }, [])
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.container]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ marginTop: 10 }} />
                    <Text style={styles.text}>
                        {t("lesson.positiveMessage")}
                    </Text>
                    <View style={{ marginTop: 24 }}>
                        <Text style={styles.label}>{t("lesson.wordAboutMe")}</Text>
                        <TextInput
                            value={comment}
                            style={[styles.input, { height: 120 }]}
                            onChangeText={(text) => {
                                setErrComment("");
                                if (text?.trim()?.length === 0) {
                                    setErrComment(t("placeholder.err.invalidInput"));
                                    setComment("")
                                    user === 1 ? dispatch(setClosePerson1EvaluationRedux("")) : dispatch(setClosePerson2EvaluationRedux(""))
                                }
                                user === 1 ? dispatch(setClosePerson1EvaluationRedux(text)) : dispatch(setClosePerson2EvaluationRedux(text))
                                setComment(text);
                                setClosePersonEvaluation(text)
                            }}
                            textAlignVertical='top'
                            placeholder={t("lesson.example3")}
                            multiline={true}
                            maxLength={200}
                        />
                        {errComment && <Text style={styles.textError}>{errComment}</Text>}
                        <View style={{ marginTop: 20 }} />
                        <Text style={styles.label}>{t("lesson.wordOfPositive")}</Text>
                        <TextInput
                            style={[styles.input, { height: 120 }]}
                            value={messagePositive}
                            textAlignVertical='top'
                            onChangeText={(text) => {
                                setErrMessagePositive("");
                                if (text?.trim()?.length === 0) {
                                    setErrMessagePositive(t("placeholder.err.invalidInput"));
                                    setMessagePositive("")
                                    user === 1 ? dispatch(setClosePerson1MessageRedux("")) : dispatch(setClosePerson2MessageRedux(""))

                                }
                                setMessagePositive(text);
                                setClosePersonMessage(text)
                                user === 1 ? dispatch(setClosePerson1MessageRedux(text)) : dispatch(setClosePerson2MessageRedux(text))
                            }}
                            placeholder={t("lesson.example4")}
                            multiline={true}
                            maxLength={200}
                        />
                    </View>
                    {errMessagePositive && <Text style={styles.textError}>{errMessagePositive}</Text>}
                    {messageError && <Text style={styles.textError}>{messageError}</Text>}
                    <View style={{ marginTop: 32 }} />
                    <View style={{ paddingBottom: 40 }} />
                </ScrollView>
            </View>
        </TouchableWithoutFeedback>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: 24,
        paddingHorizontal: paddingHorizontalScreen * 2,
        backgroundColor: colors.white,
    },
    text: {
        fontWeight: '500',
        fontSize: 18,
        lineHeight: 28,
        color: colors.gray_G07,
    },
    input: {
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderColor: colors.gray_G03,
        borderWidth: 1,
        borderRadius: 8,
        color: colors.black,
    },
    textError: {
        color: colors.red,
        fontWeight: "500",
        fontSize: 14
    },
    label: {
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 28,
        color: colors.black,
        marginBottom: 12,
    },
});
export default Step2_2;
