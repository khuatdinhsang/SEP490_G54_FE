import React, { useState } from 'react';
import * as yup from "yup";
import { Button, Image, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
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

interface LoginValues {
    email: string;
    password: string;
}

const Login = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [account, setAccount] = useState<any>('')

    const loginSchema = yup.object().shape({
        email: yup
            .string()
            .email(t("placeholder.err.email"))
            .required(t("placeholder.err.blank")),
        password: yup
            .string()
            .required(t("placeholder.err.blank"))
    });

    const handleRegister = () => {
        navigation.navigate(SCREENS_NAME.REGISTER.STEP1)
    }

    const handleSubmit = async (values: LoginValues): Promise<any> => {
        console.log("41", values)
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        console.log("43", response.data)
    }

    const clearEmail = (setFieldValue: (field: string, value: any) => void) => {
        setFieldValue('email', '');
    };

    const clearPassword = (setFieldValue: (field: string, value: any) => void) => {
        setFieldValue('password', '');
    };

    const handleFindId = () => {
        // Handle find ID logic
    }

    const handleFindPassword = () => {
        navigation.navigate(SCREENS_NAME.FORGOT_PASSWORD.VERIFY_EMAIL)
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.firstStep}>{t("common.text.firstStep")}</Text>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={loginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => {
                        console.log("ew", touched)
                        return (
                            <View>
                                <View style={{ marginTop: 40 }}>
                                    <View>
                                        <InputComponent
                                            placeholder={t("placeholder.field.email")}
                                            onPressIconRight={() => clearEmail(setFieldValue)}
                                            isIconRight={true}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
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
                                            onChangeText={handleChange('password')}
                                            label={t("authentication.password")}
                                            secureTextEntry={true}
                                            textError={errors.password}
                                        />
                                    </View>
                                </View>
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
    }
});

export default Login;
