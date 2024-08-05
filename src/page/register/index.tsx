import React, { useEffect, useState } from 'react';
import * as yup from "yup";
import { BackHandler, Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import { ScrollView } from 'react-native-gesture-handler';
import InputComponent from '../../component/input';
import ProgressHeader from '../../component/progessHeader';

interface RegisterValues {
    name: string,
    phoneNumber: string,
    password: string,
    confirmPassword?: string,
    numberRegHospital?: string,
    cic?: string
}
const Register = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const registerSchema = yup.object().shape({
        name: yup.string().required(t("placeholder.err.blank"))
            .test('no-only-spaces', t("placeholder.err.invalidInput"), (value) => {
                return value?.trim()?.length > 0;
            }),
        phoneNumber: yup.string().required(t("placeholder.err.blank")).matches(
            /^0\d{8,10}$/,
            t("placeholder.err.phoneNumber")
        ),
        password: yup.string().required(t("placeholder.err.blank")).matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/,
            t("placeholder.err.passwordCorrect")
        ),
        confirmPassword: yup.string().required(t("placeholder.err.blank")).oneOf([yup.ref('password')], t("placeholder.err.notMatch")),
        numberRegHospital: yup.string().required(t("placeholder.err.blank")).matches(
            /^[0-9]*$/, t("placeholder.err.number")
        ),
    });

    const handleSubmit = (values: RegisterValues): void => {
        values.cic = values.numberRegHospital;
        delete values.numberRegHospital;
        if ('confirmPassword' in values) {
            delete values.confirmPassword;
        }
        navigation.navigate(SCREENS_NAME.REGISTER.STEP2, { valuesStep1: values });
    };

    const clearField = (field: string, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue(field, '');
    };

    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Pressable onPress={loginPage}>
                <Image style={styles.buttonCancel} source={require('../../assets/image/register/icon_X.png')} />
            </Pressable>
            <ProgressHeader index={[0]} length={4} style={{ marginTop: 45 }} />
            <Formik
                initialValues={{ name: '', phoneNumber: '', password: '', confirmPassword: '', numberRegHospital: '' }}
                validationSchema={registerSchema}
                onSubmit={handleSubmit}
            >
                {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                    <View style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                            <View style={{ marginTop: 20 }}>
                                <View style={styles.header}>
                                    <Text style={[styles.hightLight, { color: colors.primary }]}>01.</Text>
                                    <Text style={[styles.hightLight, { color: colors.black }]}>{t("common.text.fillInfo")}</Text>
                                </View>
                                <InputComponent
                                    placeholder={t("placeholder.field.name")}
                                    onPressIconRight={() => clearField('name', setFieldValue)}
                                    isIconRight={true}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    label={t("common.text.name")}
                                    textError={errors.name}
                                />
                                <View style={{ marginTop: 15 }}>
                                    <InputComponent
                                        placeholder={t("placeholder.field.phoneNumber")}
                                        onPressIconRight={() => clearField('phoneNumber', setFieldValue)}
                                        isIconRight={true}
                                        value={values.phoneNumber}
                                        onChangeText={handleChange('phoneNumber')}
                                        label={t("common.text.phoneNumber")}
                                        textError={errors.phoneNumber}
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
                                        keyboardType={"numeric"}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                        <View style={styles.buttonContainer}>
                            <Pressable
                                onPress={() => handleSubmit()}
                                style={[
                                    styles.button,
                                    {
                                        backgroundColor: (errors.phoneNumber || errors.name || errors.password || errors.confirmPassword || errors.numberRegHospital)
                                            ? colors.gray
                                            : colors.primary
                                    }
                                ]}
                            >
                                <Text style={styles.text}>{t("common.text.next")}</Text>
                            </Pressable>
                        </View>
                    </View>
                )}
            </Formik>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    buttonCancel: {
        position: 'absolute',
        right: 0,
        top: 15,
    },
    hightLight: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 30,
    },
    header: {
        marginBottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    text: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18,
    },
    button: {
        height: 60,
        borderRadius: 12,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingVertical: 20,
        backgroundColor: colors.white,
    },
});

export default Register;
