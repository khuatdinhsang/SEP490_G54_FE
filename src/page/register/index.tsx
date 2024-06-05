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
import InputComponent from '../../component/input';
import ProgressHeader from '../../component/progessHeader';

const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const registerSchema = yup.object().shape({
        name: yup
            .string()
            .required(
                t("placeholder.err.blank")
            ),
        email: yup
            .string()
            .email(t("placeholder.err.email"))
            .required(
                t("placeholder.err.blank")
            ),
        password: yup
            .string()
            .required(
                t("placeholder.err.blank")
            ),

        confirmPassword: yup
            .string()
            .required(
                t("placeholder.err.blank")
            )
            .oneOf([yup.ref('password')], t("placeholder.err.notMatch"))
        ,
        numberRegHospital: yup
            .string()
            .required(
                t("placeholder.err.blank")
            ),
    });
    const handleSubmit = (values: any): void => {
        navigation.navigate(SCREENS_NAME.REGISTER.STEP2)
    }
    const clearField = (field: string, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue(field, '');
    };
    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.container} >
                <Pressable onPress={loginPage}>
                    <Image style={styles.buttonCancel} source={require('../../assets/image/register/icon_X.png')} />
                </Pressable>
                <ProgressHeader index={[0]} length={4} style={{ marginTop: 45 }} />
                <Formik
                    initialValues={{ name: '', email: '', password: '', confirmPassword: '', numberRegHospital: '' }}
                    validationSchema={registerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View style={{ marginTop: 20 }}>
                            <View style={{ marginBottom: 20, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[styles.hightLight, { color: colors.primary }]}>01.</Text>
                                <Text style={[styles.hightLight, { color: colors.black }]} >{t("common.text.fillInfo")}</Text>
                            </View>
                            <View >
                                <InputComponent
                                    placeholder={t("placeholder.field.name")}
                                    onPressIconRight={() => clearField('name', setFieldValue)}
                                    isIconRight={true}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    label={t("common.text.name")}
                                    textError={errors.name}
                                />
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <InputComponent
                                    placeholder={t("placeholder.field.email")}
                                    onPressIconRight={() => clearField('email', setFieldValue)}
                                    isIconRight={true}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    label={t("authentication.email")}
                                    textError={errors.email}
                                />
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <InputComponent
                                    placeholder={t("placeholder.field.password")}
                                    onPressIconRight={() => clearField('password', setFieldValue)}
                                    isIconRight={true}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    label={t("authentication.password")}
                                    secureTextEntry={true}
                                    textError={errors.password}
                                />
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <InputComponent
                                    placeholder={t("placeholder.field.confirmPassword")}
                                    onPressIconRight={() => clearField('confirmPassword', setFieldValue)}
                                    isIconRight={true}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    label={t("common.text.confirmPassword")}
                                    secureTextEntry={true}
                                    textError={errors.confirmPassword}
                                />
                            </View>
                            <View style={{ marginTop: 15 }}>
                                <InputComponent
                                    placeholder={t("placeholder.field.numberRegHospital")}
                                    onPressIconRight={() => clearField('numberRegHospital', setFieldValue)}
                                    isIconRight={true}
                                    value={values.numberRegHospital}
                                    onChangeText={handleChange('numberRegHospital')}
                                    label={t("common.text.numberRegHospital")}
                                    textError={errors.numberRegHospital}
                                />
                            </View>
                            <Pressable onPress={() => handleSubmit()} style={[styles.button, { backgroundColor: (errors.name || errors.email || errors.password || errors.confirmPassword || errors.numberRegHospital) ? colors.gray : colors.primary }]} >
                                <Text style={styles.text}>{t("common.text.next")}</Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </SafeAreaView >
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    buttonCancel: {
        position: 'absolute',
        right: 0,
        top: 15
    },
    hightLight: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 30,
    },
    text: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18
    },
    button: {
        height: 62,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 15
    },
})

export default Register;
