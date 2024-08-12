import React, { useEffect, useState } from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import 'moment/locale/ko';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IMAGE } from '../../constant/image';

const RegisterSuccess = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        const setLocaleAndTime = async () => {
            const lang = await AsyncStorage.getItem('language');
            if (lang === 'en') {
                moment.locale('en');
            } else {
                moment.locale('ko');
            }
            const time = moment().format('A hh:mm');
            setFormattedTime(time);
        };

        setLocaleAndTime();
    }, []);

    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN);
    };

    const handleSubmit = () => {
        loginPage();
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Pressable onPress={loginPage}>
                    <Image
                        style={styles.buttonCancel}
                        source={require('../../assets/image/register/icon_X.png')}
                    />
                </Pressable>
                <View style={{ marginTop: 150, paddingHorizontal: 30 }}>
                    <Text style={{ marginBottom: 10, fontWeight: '700', fontSize: 20, textAlign: 'center', color: colors.black }}>
                        {t("common.text.thankForTime")}
                    </Text>
                    <Text style={{ fontWeight: '500', fontSize: 18, textAlign: 'center', color: colors.black }}>
                        {t("common.text.memberApproval")}
                    </Text>
                    <View style={{ marginTop: 20, position: 'relative' }}>
                        <Image source={IMAGE.REGISTER.EMAIL_POLYGON} />
                        <Image source={IMAGE.REGISTER.EMAIL_RECTANGLE} />
                        <View style={{ elevation: 5, left: 20, top: 20, position: 'absolute', backgroundColor: colors.white, borderRadius: 16, height: 200, width: '90%' }}>
                            <View style={{ marginTop: 30, marginLeft: 20, backgroundColor: colors.orange_03, width: '60%', borderRadius: 7, padding: 10 }}>
                                <Text style={{ color: colors.white }}>{t("common.text.completeRegistration")}</Text>
                                <Text style={{ position: 'absolute', fontWeight: '400', fontSize: 8, right: -40, bottom: 0 }}>{formattedTime}</Text>
                            </View>
                        </View>
                        <Image
                            style={{ position: 'absolute', bottom: 0, zIndex: 100 }}
                            source={IMAGE.REGISTER.EMAIL_UNION}
                        />
                    </View>
                    <Text style={{ fontWeight: 500, fontSize: 16, color: colors.primary, textAlign: 'center', marginTop: 40 }}>
                        {t("common.text.loginAgain1")}
                    </Text>
                </View>
                <Pressable onPress={handleSubmit} style={[styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={styles.textButton}>{t("common.text.goBackLogin")}</Text>
                </Pressable>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        height: HeightDevice,
    },
    buttonCancel: {
        position: 'absolute',
        right: 0,
        top: 15,
    },
    textButton: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 62,
        fontWeight: "500",
        fontSize: 18,
    },
    button: {
        height: 60,
        borderRadius: 12,
        position: 'absolute',
        bottom: 20,
        width: WidthDevice - 40,
        left: 20,
    },
});

export default RegisterSuccess;
