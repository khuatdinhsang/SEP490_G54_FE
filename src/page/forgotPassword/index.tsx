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
import { authService } from '../../services/auth';
import axios from 'axios';
import InputComponent from '../../component/input';
import LoadingScreen from '../../component/loading';
interface typeValues {
    password: string,
    confirmPassword: string
}

const ForgotPassword = ({ route }: any) => {
    const { email, code } = route.params;
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [error, setError] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    }
    const handleSubmit = async (values: typeValues): Promise<void> => {
        setIsLoading(true)
        const data = { password: values.password, email }
        console.log("da", data)
        try {
            const res = await authService.verifyForgetPassword(data);
            if (res.code == 200) {
                setIsLoading(false)
                if (res.result) {
                    navigation.navigate(SCREENS_NAME.FORGOT_PASSWORD.SUCCESS)
                }
            }
        } catch (error: any) {
            if (axios.isAxiosError(error) && error.response) {
                if (error.response.data.code == 400 || error.response.data.code == 401) {
                    setError(error.response.data.message)
                } else {
                    setError("Unexpected error occurred.");
                }
            }
        }
        finally {
            setIsLoading(false)
        }
    }

    const clearField = (field: string, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue(field, '');
    };
    const fotgotPasswordSchema = yup.object().shape({
        password: yup.string().required(t("placeholder.err.blank")).matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/,
            t("placeholder.err.passwordCorrect")
        ),
        confirmPassword: yup
            .string()
            .required(
                t("placeholder.err.blank")
            )
            .oneOf([yup.ref('password')], t("placeholder.err.notMatch"))
        ,
    });
    const handleChangeText = (field: string, setFieldValue: (field: string, value: string) => void) => (text: string) => {
        setFieldValue(field, text);
        // setIsEmailExits(''); // Clear the error message
    };
    return (
        <View>
            <SafeAreaView style={styles.container} >
                <Pressable style={styles.buttonCancel} onPress={loginPage}>
                    <Image
                        source={require('../../assets/image/register/icon_X.png')} />
                </Pressable>
                <Formik
                    initialValues={{ password: '', confirmPassword: '' }}
                    validationSchema={fotgotPasswordSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View style={{ height: HeightDevice }}>
                            <View style={{ marginTop: 15 }}>
                                <Text style={[styles.text, { textAlign: 'center' }]}>{t("authentication.findPassword")}</Text>
                                <View style={styles.line}></View>
                                <View style={[styles.content]}>
                                    <InputComponent
                                        placeholder={t("placeholder.field.resetPassword")}
                                        onPressIconRight={() => clearField('password', setFieldValue)}
                                        isIconRight={true}
                                        value={values.password}
                                        onChangeText={handleChangeText('password', setFieldValue)}
                                        label={t('common.text.resetPassword')}
                                        textError={errors.password}
                                        secureTextEntry={true}
                                    />
                                    <View style={{ marginVertical: 10 }}>
                                        <InputComponent
                                            placeholder={t("placeholder.field.confirmResetPassword")}
                                            onPressIconRight={() => clearField('confirmPassword', setFieldValue)}
                                            isIconRight={true}
                                            value={values.confirmPassword}
                                            onChangeText={handleChangeText('confirmPassword', setFieldValue)}
                                            label={t('common.text.confirmPassword')}
                                            textError={errors.confirmPassword}
                                            secureTextEntry={true}
                                        />
                                    </View>
                                    {errors.confirmPassword && touched.confirmPassword && <Text style={styles.textError}>{errors.confirmPassword}</Text>}
                                </View>
                                {error && <Text style={[styles.textError, { paddingHorizontal: 20 }]}>{error}</Text>}
                            </View>

                            <Pressable disabled={errors.password || errors.confirmPassword ? true : false} onPress={() => handleSubmit()} style={[styles.button, { backgroundColor: (errors.password || errors.confirmPassword || !values.password) ? colors.gray : colors.primary }]} >
                                <Text style={styles.textButton}>{t("common.text.confirm")}</Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </SafeAreaView >
            {isLoading && <LoadingScreen />}
        </View>
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
        top: 20,
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
    textField: {
        color: colors.black
    },
    field: {
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingRight: 50
    },
    textError: {
        color: colors.red,
        fontWeight: "500",
        fontSize: 14
    },
    iconCancel: {
        width: 10,
        height: 10,
        position: 'absolute',
        right: 20,
        top: -31,
        zIndex: 1000
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

export default ForgotPassword;
