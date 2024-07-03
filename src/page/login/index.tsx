import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { ActivityIndicator, Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import InputComponent from '../../component/input';
import { flexRowCenter } from '../../styles/flex';
import { useAppDispatch } from '../../store/store';
import { loginUser } from '../../store/user.slice';
import { ResponseForm } from '../../constant/type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../component/loading';

interface LoginValues {
    email: string;
    password: string;
}
const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>('')
    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .required(
                t("placeholder.err.blank")
            ).matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                t("placeholder.err.email")
            ),
        password: yup
            .string()
            .required(t("placeholder.err.blank"))
    });


    const handleRegister = () => {
        navigation.navigate(SCREENS_NAME.REGISTER.STEP1)
    }
    const clearEmail = (setFieldValue: (field: string, value: any) => void) => {
        setFieldValue('email', '');
    };

    const clearPassword = (setFieldValue: (field: string, value: any) => void) => {
        setFieldValue('password', '');
    };
    const handleSubmit = async (values: LoginValues, resetForm: () => void): Promise<void> => {
        setIsLoading(true)
        try {
            const res = await dispatch(loginUser({ email: values.email, password: values.password, deviceToken: "dBAKdQ2yTujIB-xuK994ur:APA91bFWyD25dEPSvhIrhJB-tg_YSa_LtrmVvxbxU6_oRwmBUe_Za9OQwfOf6A6Pg084eK753P-dw0avvV3ZP76dgEnewjIqlIndmOv1pxFcAh6jm4llurRBLG2IlZQUTi_gK7Z2u-Un" })).unwrap()
            if (res.code == 200) {
                setIsLoading(false);
                resetForm()
                navigation.navigate(SCREENS_NAME.HOME.MAIN)

            }
        } catch (error: any) {
            if (error.code == 400 || error.code == 401) {
                setMessageError(error.message)
            }
        } finally {
            setIsLoading(false)
        }

    }



    const handleFindId = () => {
        // Handle find ID logic
    }

    const handleFindPassword = () => {
        navigation.navigate(SCREENS_NAME.FORGOT_PASSWORD.VERIFY_EMAIL)
    }
    const handleChangeText = (field: string, setFieldValue: (field: string, value: string) => void) => (text: string) => {
        setFieldValue(field, text);
        setMessageError(''); // Clear the error message
    };
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.firstStep}>{t("common.text.firstStep")}</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
                        return (
                            <View>
                                <View style={{ marginTop: 40 }}>
                                    <View>
                                        <InputComponent
                                            placeholder={t("placeholder.field.email")}
                                            onPressIconRight={() => clearEmail(setFieldValue)}
                                            isIconRight={true}
                                            value={values.email}
                                            onChangeText={handleChangeText('email', setFieldValue)}
                                            label={t("authentication.email")}
                                            textError={errors.email}
                                        />
                                    </View>
                                    <View style={{ marginTop: 20 }}>
                                        <InputComponent
                                            placeholder={t("placeholder.field.password")}
                                            onPressIconRight={() => clearPassword(setFieldValue)}
                                            isIconRight={true}
                                            value={values.password}
                                            onChangeText={handleChangeText('password', setFieldValue)}
                                            label={t("authentication.password")}
                                            secureTextEntry={true}
                                            textError={errors.password}
                                        />
                                    </View>
                                </View>

                                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
                                <View style={{ marginTop: 30 }}>
                                    <Pressable onPress={() => handleSubmit()} style={[styles.button, { backgroundColor: colors.primary }]}>
                                        <Text style={styles.text}>{t("authentication.login")}</Text>
                                    </Pressable>
                                    <Pressable onPress={handleRegister} style={[styles.button, { backgroundColor: colors.black }]}>
                                        <Text style={styles.text}>{t("authentication.register")}</Text>
                                    </Pressable>
                                    <View style={flexRowCenter}>
                                        <Pressable onPress={handleFindId}>
                                            <Text> {t("authentication.findId")}  |  </Text>
                                        </Pressable>
                                        <Pressable onPress={handleFindPassword}>
                                            <Text>{t("authentication.findPassword")}</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </ScrollView>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    firstStep: {
        fontWeight: '700',
        width: 240,
        fontSize: 28,
        lineHeight: 40,
        marginTop: 80,
        color: colors.black
    },
    button: {
        height: 62,
        borderRadius: 12,
        marginBottom: 20
    },
    text: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18
    },
    textError: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.red
    },
});

export default Login;
