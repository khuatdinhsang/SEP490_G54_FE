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

const ForgotPassword = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();

    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN)
    }
    const handleSubmit = () => {
        navigation.navigate(SCREENS_NAME.FORGOT_PASSWORD.SUCCESS)
    }
    const clearField = (field: string, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue(field, '');
    };
    const fotgotPasswordSchema = yup.object().shape({
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
    });
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
                                    <View>
                                        <Text style={styles.text}>{t("common.text.resetPassword")}</Text>
                                        <View style={[flexRow, { marginTop: 10 }]}>
                                            <View style={{ width: '100%' }}>
                                                <TextInput
                                                    style={[styles.field, { borderColor: errors.password && touched.password ? colors.primary : colors.gray }]}
                                                    placeholder={t("placeholder.field.resetPassword")}
                                                    value={values.password}
                                                    onChangeText={handleChange('password')}
                                                    onBlur={handleBlur('password')}
                                                    secureTextEntry={true}
                                                />
                                                {values.password &&
                                                    <Pressable onPress={() => clearField('password', setFieldValue)}>
                                                        <Image style={styles.iconCancel} source={require('../../assets/image/login/Union.png')} />
                                                        <View style={styles.backGrIcon}></View>
                                                    </Pressable>
                                                }
                                            </View>
                                        </View>
                                        {errors.password && touched.password && <Text style={styles.textError}>{errors.password}</Text>}
                                        <View style={{ marginVertical: 10 }}>
                                            <Text style={[styles.text, { marginBottom: 10 }]}>{t("common.text.confirmPassword")}</Text>
                                            <TextInput
                                                style={[styles.field, { borderColor: errors.confirmPassword && touched.confirmPassword ? colors.primary : colors.gray, backgroundColor: colors.white }]}
                                                placeholder={t("placeholder.field.confirmResetPassword")}
                                                value={values.confirmPassword}
                                                onChangeText={handleChange('confirmPassword')}
                                                onBlur={handleBlur('confirmPassword')}
                                                secureTextEntry={true}
                                            />
                                            {values.confirmPassword &&
                                                <Pressable onPress={() => clearField('confirmPassword', setFieldValue)}>
                                                    <Image style={styles.iconCancel} source={require('../../assets/image/login/Union.png')} />
                                                    <View style={styles.backGrIcon}></View>
                                                </Pressable>
                                            }
                                        </View>
                                        {errors.confirmPassword && touched.confirmPassword && <Text style={styles.textError}>{errors.confirmPassword}</Text>}
                                    </View>
                                </View>
                            </View>
                            <Pressable disabled={errors.password || errors.confirmPassword ? true : false} onPress={() => handleSubmit()} style={[styles.button, { backgroundColor: (errors.password || errors.confirmPassword || !values.password) ? colors.gray : colors.primary }]} >
                                <Text style={styles.textButton}>{t("common.text.confirm")}</Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </SafeAreaView >
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
        right: 20,
        top: -35,
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
