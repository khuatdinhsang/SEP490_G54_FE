import React, { useEffect, useRef, useState } from 'react';
import * as yup from "yup";
import { Button, FlatList, Image, Pressable, SafeAreaView, ScrollView, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import DatePicker from 'react-native-date-picker';
import { IMAGE } from '../../constant/image';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import 'moment/locale/ko';
import moment from 'moment';
import { paddingHorizontalScreen } from '../../styles/padding';
import CountdownTimer from '../../component/countDownTime';
import InputComponent from '../../component/input';
import { authService } from '../../services/auth';
import axios from 'axios';
import LoadingScreen from '../../component/loading';

interface typeValues {
    email: string,
    code: string
}
const VerifyEmail = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [time, setTime] = useState(3); // Default time in minutes
    const [checkResetTime, setCheckResetTime] = useState<boolean>(false);
    const [checkCode, setCheckCode] = useState<string>('')
    const [timeUp, setTimeUp] = useState<boolean>(false)
    // const [codeResponse, setCodeResponse] = useState<string>("")
    const [isGetCode, setIsGetCode] = useState<boolean>(false)
    const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true)
    const [isEmailExits, setIsEmailExits] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [messageError, setMessageError] = useState<string>("")

    const handleResetTime = async (values: typeValues, setFieldValue: (field: string, value: any) => void): Promise<void> => {
        setIsLoading(true)
        clearField('code', setFieldValue)
        try {
            const res = await authService.forgetPassword(values.email);
            if (res.code == 200) {
                setIsGetCode(true)
                setCheckCode("loading")
                //resetTime
                setCheckResetTime(pre => !pre);
                setTimeUp(false)
                setIsLoading(false)
                // setCodeResponse(res.result)
                setIsTimerRunning(true)
                clearField('code', setFieldValue)
                setIsEmailExits("")
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.data.code == 400) {
                    setIsEmailExits(error.response.data.message)
                }
            }
        }
        finally {
            setIsLoading(false)
        }
    };
    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    }
    const handleSubmit = (values: typeValues) => {
        if (checkCode === 'success') {
            navigation.navigate(SCREENS_NAME.FORGOT_PASSWORD.MAIN, { email: values.email, code: values.code })
        }
    }
    const clearField = (field: string, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue(field, '');
        // if (field === 'email') {
        //     setGetCode(false);
        // }
    };
    const handleChangeText = (field: string, setFieldValue: (field: string, value: string) => void) => (text: string) => {
        setFieldValue(field, text);
        setIsEmailExits('');
    };
    const fotgotPasswordSchema = yup.object().shape({
        email: yup
            .string()
            .required(
                t("placeholder.err.blank")
            ).matches(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
                t("placeholder.err.email")
            ),
        code: yup
            .string()
            .required(
                t("placeholder.err.blank")
            ),
    });
    const handleCheckCode = async (values: typeValues): Promise<void> => {
        setIsLoading(true);
        try {
            const resData = await authService.checkForgetPasswordEmail(values.email, values.code);
            console.log("re", resData)
            if (resData.code === 200) {
                setIsLoading(false);
                if (resData.result) {
                    setCheckCode('success');
                    setIsTimerRunning(false);
                } else {
                    setCheckCode('error');
                    setIsTimerRunning(true)
                }
            } else {
                setMessageError("Unexpected error occurred.");
            }
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 401) {
                setMessageError(error.response.data.message);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    const renderMessage = () => {
        if (timeUp) {
            return (
                <Text style={{ fontWeight: 700, fontSize: 14, color: colors.red }}>
                    {t("common.text.timeUpCode")}
                </Text>
            );
        }
        switch (checkCode) {
            case 'loading':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.green }}>
                        {t("common.text.confirmEmail")}
                    </Text>
                );
            case 'error':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.red }}>
                        {t("common.text.wrongCode")}
                    </Text>
                );
            case 'success':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.green }}>
                        {t("common.text.verificationSuccess")}
                    </Text>
                );
            case 'timeUp':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.red }}>
                        {t("common.text.timeUpCode")}
                    </Text>
                );
            default:
                return null;
        }
    };
    const handleGetCode = (values: boolean) => {
        setIsGetCode(values)
    }
    return (

        <Formik
            initialValues={{ email: '', code: '' }}
            validationSchema={fotgotPasswordSchema}
            onSubmit={handleSubmit}>
            {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
            }) => (
                <SafeAreaView style={styles.container} >
                    <View style={{ marginTop: 15 }}>
                        <Pressable style={styles.buttonCancel} onPress={loginPage}>
                            <Image
                                source={require('../../assets/image/register/icon_X.png')} />
                        </Pressable>
                        <Text style={[styles.text, { textAlign: 'center' }]}>{t("authentication.findPassword")}</Text>
                        <View style={styles.line}></View>

                        <View style={[styles.content]}>

                            <View style={{ marginTop: 30 }}>
                                <View style={[flexRowSpaceBetween]}>
                                    <View style={{ width: '70%' }}>
                                        <InputComponent
                                            placeholder={t("placeholder.field.email")}
                                            onPressIconRight={() => clearField('email', setFieldValue)}
                                            isIconRight={true}
                                            value={values.email}
                                            onChangeText={handleChangeText('email', setFieldValue)}
                                            label={t('common.text.email')}
                                            textError={errors.email}
                                        />
                                    </View>
                                    <Pressable
                                        disabled={errors.email ? true : false}
                                        onPress={() => handleResetTime(values, setFieldValue)}
                                        style={{
                                            width: '25%',
                                            marginTop: errors.email ? 10 : 30,
                                            height: 57,
                                            borderRadius: 12,
                                            backgroundColor:
                                                errors.email || !values.email
                                                    ? colors.gray
                                                    : colors.orange_01,
                                        }}>
                                        <Text
                                            style={{
                                                textAlign: 'center',
                                                lineHeight: 57,
                                                fontSize: 16,
                                                fontWeight: 500,
                                                color:
                                                    errors.email || !values.email
                                                        ? colors.textGray
                                                        : colors.primary,
                                            }}>
                                            {t('common.text.getCodePassword')}
                                        </Text>
                                    </Pressable>
                                </View>
                                {isEmailExits && <Text style={styles.textError}>{isEmailExits}</Text>}
                                <View style={{ marginTop: 10 }}>
                                    <InputComponent
                                        placeholder={t('common.text.getCodePassword')}
                                        value={values.code}
                                        onChangeText={handleChange('code')}
                                        textError={errors.code}
                                        isEditable={isGetCode}
                                    />
                                    {values.code && (
                                        <Pressable
                                            onPress={() => handleCheckCode(values)}>
                                            <Text
                                                style={[
                                                    styles.verification,
                                                    {
                                                        fontSize: 16,
                                                        fontWeight: 700,
                                                        color: !timeUp ? colors.red : colors.gray,
                                                    },
                                                ]}>
                                                {t('common.text.verification')}
                                            </Text>
                                        </Pressable>
                                    )}
                                </View>
                                {!isEmailExits && renderMessage()}
                                {checkCode && !isEmailExits && (
                                    <Text
                                        style={{
                                            fontWeight: 700,
                                            fontSize: 14,
                                            color:
                                                checkCode === 'success' || checkCode === 'loading'
                                                    ? colors.green
                                                    : colors.red,
                                        }}>
                                        <CountdownTimer
                                            setTimeUp={setTimeUp}
                                            time={time}
                                            checkResetTime={checkResetTime}
                                            isTimerRunning={isTimerRunning}
                                            setIsGetCode={handleGetCode}
                                        />
                                    </Text>
                                )}
                            </View>
                        </View>
                    </View>
                    <Pressable disabled={checkCode === 'success' ? false : true} onPress={() => handleSubmit()} style={[styles.button, { backgroundColor: checkCode == 'success' ? colors.primary : colors.gray }]} >
                        <Text style={styles.textButton}>{t("common.text.confirm")}</Text>
                    </Pressable>
                    {isLoading && <LoadingScreen />}
                </SafeAreaView >
            )}
        </Formik>

    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HeightDevice,
    },
    buttonCancel: {
        position: 'absolute',
        right: 20,
        zIndex: 100
    },
    text: {
        fontWeight: '400',
        color: colors.black,
        fontSize: 18,
    },
    content: {
        paddingHorizontal: paddingHorizontalScreen,
        marginTop: 20,
    },
    line: {
        marginTop: 15,
        height: 2,
        backgroundColor: colors.gray
    },
    textButton: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18
    },
    button: {
        height: 60,
        borderRadius: 12,
        position: 'absolute',
        bottom: 20,
        width: WidthDevice - 40,
        left: 20,
    },
    textError: {
        color: colors.red
    },
    iconCancel: {
        width: 10,
        height: 10,
        position: 'absolute',
        right: 20,
        top: -31,
        zIndex: 1000
    },
    verification: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        zIndex: 1000,
        lineHeight: 60,
        paddingHorizontal: 20,
        height: 60,
    },
    backGrIcon: {
        backgroundColor: colors.gray,
        width: 24,
        height: 24,
        borderRadius: 12,
        position: 'absolute',
        right: 13,
        top: -38,
    },
})

export default VerifyEmail;
