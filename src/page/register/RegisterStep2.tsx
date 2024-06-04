import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import {
    Button,
    Image,
    Modal,
    Pressable,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../navigator/const';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { Formik } from 'formik';
import DatePicker from 'react-native-date-picker';
import { WidthDevice } from '../../util/Dimenssion';
import { flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import CountdownTimer from '../../component/countDownTime';
import InputComponent from '../../component/input';
import ProgressHeader from '../../component/progessHeader';
import SelectDate from '../../component/inputSelectDate';
import InputNumber from '../../component/inputNumber';

const RegisterStep2 = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const [gender, setGender] = useState<boolean>(true);
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { t, i18n } = useTranslation();
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [day, setDay] = useState<number>(new Date().getDate());
    const [isValidDate, setIsValidDate] = useState(true);
    const currentYear = new Date().getFullYear();
    const [showYearScroll, setShowYearScroll] = useState(false);
    const [showMonthScroll, setShowMonthScroll] = useState(false);
    const [showDayScroll, setShowDayScroll] = useState(false);
    const [time, setTime] = useState(0.5); // Default time in minutes
    const [checkResetTime, setCheckResetTime] = useState<boolean>(false);
    const [checkCode, setCheckCode] = useState<string>('');
    const [timeUp, setTimeUp] = useState<boolean>(false);
    useEffect(() => {
        const isValid = isValidDateForYearMonthDay(year, month, day);
        setIsValidDate(isValid);
    }, [year, month, day]);

    const handleYearChange = (newYear: number) => setYear(newYear);
    const handleMonthChange = (newMonth: number) => setMonth(newMonth);
    const handleDayChange = (newDay: number) => setDay(newDay);

    const toggleYearScroll = () => setShowYearScroll(!showYearScroll);
    const toggleMonthScroll = () => setShowMonthScroll(!showMonthScroll);
    const toggleDayScroll = () => setShowDayScroll(!showDayScroll);

    const isLeapYear = (year: number): boolean => {
        return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    };

    const getMaxDaysInMonth = (year: number, month: number) => {
        if (month === 2 && isLeapYear(year)) {
            return 29; // Leap year February
        } else if (month === 2) {
            return 28; // Regular February
        } else if ([4, 6, 9, 11].includes(month)) {
            return 30; // Months with 30 days
        } else {
            return 31; // Months with 31 days
        }
    };

    const isValidDateForYearMonthDay = (
        year: number,
        month: number,
        day: number,
    ) => {
        const maxDays = getMaxDaysInMonth(year, month);
        return day >= 1 && day <= maxDays;
    };

    // const getSelectedDate = () => {
    //     return new Date(year, month - 1, day + 1);
    // };
    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN);
    };
    const chooseGender = (value: boolean) => {
        setGender(value);
    };
    const handleSubmit = () => {
        navigation.navigate(SCREENS_NAME.REGISTER.STEP3);
    };

    const handleResetTime = () => {
        setCheckResetTime(pre => !pre);
        setTimeUp(false);
    };
    const clearField = (
        field: string,
        setFieldValue: (field: string, value: any) => void,
    ) => {
        setFieldValue(field, '');
        // if (field === 'email') {
        //     setGetCode(false);
        // }
    };
    const handleSetWeight = (value: any) => {
        if (!value) {
            if (!value) {
                setError(t('placeholder.err.blank'));
                setWeight('');
            }
            return;
        }
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setWeight(value);
            setError('');
        } else {
            setError(t('placeholder.err.number'));
        }
    };
    const handleSetHeight = (value: any) => {
        if (!value) {
            if (!value) {
                setError(t('placeholder.err.blank'));
                setHeight('');
            }
            return;
        }
        const numericRegex = /^[0-9]*$/;
        if (numericRegex.test(value)) {
            setHeight(value);
            setError('');
        } else {
            setError(t('placeholder.err.number'));
        }
    };
    const fotgotPasswordSchema = yup.object().shape({
        email: yup
            .string()
            .email(t('placeholder.err.email'))
            .required(t('placeholder.err.blank')),
        code: yup.string().required(t('placeholder.err.blank')),
    });
    const handleCheckCode = () => {
        //thanh cong
        setCheckCode('success');

        //that bai
        // setCheckCode('error')
    };
    const renderMessage = () => {
        if (timeUp) {
            return (
                <Text style={{ fontWeight: 700, fontSize: 14, color: colors.red }}>
                    {t('common.text.timeUpCode')}
                </Text>
            );
        }
        switch (checkCode) {
            case 'loading':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.green }}>
                        {t('common.text.confirmEmail')}
                    </Text>
                );
            case 'error':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.red }}>
                        {t('common.text.wrongCode')}
                    </Text>
                );
            case 'success':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.green }}>
                        {t('common.text.verificationSuccess')}
                    </Text>
                );
            case 'timeUp':
                return (
                    <Text style={{ fontWeight: 700, fontSize: 14, color: colors.red }}>
                        {t('common.text.timeUpCode')}
                    </Text>
                );
            default:
                return null;
        }
    };
    return (
        <ScrollView>
            <SafeAreaView style={[styles.container]}>
                {(showDayScroll || showMonthScroll || showYearScroll) && (
                    <View style={styles.boxShadow}></View>
                )}
                <Pressable onPress={loginPage}>
                    <Image
                        style={styles.buttonCancel}
                        source={require('../../assets/image/register/icon_X.png')}
                    />
                </Pressable>
                <ProgressHeader index={[0, 1]} length={4} style={{ marginTop: 45 }} />
                <View style={{ marginTop: 20 }}>
                    <View style={[flexRow, { marginBottom: 20 }]}>
                        <Text style={[styles.hightLight, { color: colors.primary }]}>
                            02.
                        </Text>
                        <Text style={[styles.hightLight, { color: colors.black }]}>
                            {t('common.text.fillInfo')}
                        </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.titleField}>
                            {t('common.text.dateOfBirth')}
                        </Text>
                        <View style={[flexRowSpaceBetween, { width: '100%' }]}>
                            <View style={{ width: '31%' }}>
                                <SelectDate
                                    value={year}
                                    text={t('common.text.year')}
                                    textButton={t('common.text.next')}
                                    toggleModalScroll={toggleYearScroll}
                                    handleChange={handleYearChange}
                                    showScroll={showYearScroll}
                                    length={150}
                                    type={'year'}
                                />
                            </View>
                            <View style={{ width: '31%' }}>
                                <SelectDate
                                    value={month}
                                    text={t('common.text.month')}
                                    textButton={t('common.text.next')}
                                    toggleModalScroll={toggleMonthScroll}
                                    handleChange={handleMonthChange}
                                    showScroll={showMonthScroll}
                                    length={12}
                                    type={'month'}
                                />
                            </View>
                            <View style={{ width: '31%' }}>
                                <SelectDate
                                    value={day}
                                    text={t('common.text.day')}
                                    textButton={t('common.text.next')}
                                    toggleModalScroll={toggleDayScroll}
                                    handleChange={handleDayChange}
                                    showScroll={showDayScroll}
                                    length={getMaxDaysInMonth(year, month)}
                                    type={'day'}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.textField}>{t('common.text.gender')}</Text>
                        <View style={[flexRowSpaceBetween, { width: '100%' }]}>
                            <Pressable
                                onPress={() => chooseGender(true)}
                                style={{ width: '47%' }}>
                                <View
                                    style={[
                                        styles.box,
                                        {
                                            borderColor: gender ? colors.primary : colors.gray,
                                            backgroundColor: gender ? colors.primary : 'white',
                                        },
                                    ]}>
                                    <Text
                                        style={[
                                            styles.textInput,
                                            { color: gender ? colors.white : colors.black },
                                        ]}>
                                        {t('common.text.male')}
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable
                                onPress={() => chooseGender(false)}
                                style={{ width: '47%' }}>
                                <View
                                    style={{
                                        borderRadius: 8,
                                        borderColor: !gender ? colors.primary : colors.gray,
                                        borderWidth: 1,
                                        height: 56,
                                        backgroundColor: !gender ? colors.primary : 'white',
                                    }}>
                                    <Text
                                        style={[
                                            styles.textInput,
                                            { color: !gender ? colors.white : colors.black },
                                        ]}>
                                        {t('common.text.male')}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ marginTop: 15 }}>
                        <Text style={styles.textField}>
                            {t('common.text.heightAndWeight')}
                        </Text>
                        <View style={[flexRowSpaceBetween, { width: '100%' }]}>
                            <Pressable style={{ width: '47%' }}>
                                <InputNumber
                                    textRight="cm"
                                    value={height}
                                    keyboardType="numeric"
                                    error={error}
                                    handleSetValue={handleSetHeight}
                                />
                            </Pressable>
                            <Pressable style={{ width: '47%' }}>
                                <InputNumber
                                    textRight="kg"
                                    value={weight}
                                    keyboardType="numeric"
                                    error={error}
                                    handleSetValue={handleSetWeight}
                                />
                            </Pressable>
                        </View>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
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
                            <View style={{ marginTop: 30 }}>
                                <View style={[flexRowSpaceBetween]}>
                                    <View style={{ width: '70%' }}>
                                        <InputComponent
                                            placeholder={t("placeholder.field.email")}
                                            onPressIconRight={() => clearField('email', setFieldValue)}
                                            isIconRight={true}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            label={t('common.text.email')}
                                            textError={errors.email}
                                        />
                                    </View>
                                    <Pressable
                                        disabled={errors.email ? true : false}
                                        onPress={() => {
                                            handleResetTime();
                                            setCheckCode('loading');
                                        }}
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
                                <View style={{ marginTop: 10 }}>
                                    <InputComponent
                                        placeholder={t('common.text.getCodePassword')}
                                        value={values.code}
                                        onChangeText={handleChange('code')}
                                        textError={errors.code}
                                    />
                                    {values.code && (
                                        <Pressable onPress={handleCheckCode}>
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
                                {renderMessage()}
                                {checkCode && (
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
                                        />
                                    </Text>
                                )}
                            </View>
                        )}
                    </Formik>
                </View>
                <Pressable
                    disabled={height && weight && checkCode === 'success' ? false : true}
                    onPress={() => handleSubmit()}
                    style={[
                        styles.button,
                        {
                            backgroundColor:
                                height && weight && checkCode === 'success'
                                    ? colors.primary
                                    : colors.gray,
                        },
                    ]}>
                    <Text style={styles.text}>{t('common.text.next')}</Text>
                </Pressable>
            </SafeAreaView>
        </ScrollView>
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
    navigate: {
        justifyContent: 'space-between',
        marginTop: 45,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    textEmail: {
        fontWeight: '400',
        color: colors.black,
        fontSize: 18,
    },
    textField: {
        color: colors.black,
        marginBottom: 10,
    },
    titleField: {
        color: colors.black,
        marginBottom: 10,
    },
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
    },

    textInput: {
        textAlign: 'center',
        lineHeight: 56,
    },
    boxShadow: {
        width: WidthDevice,
        position: 'absolute',
        height: '100%',
        backgroundColor: colors.black,
        opacity: 0.6,
        zIndex: 100,
    },
    textError: {
        color: colors.red,
    },
    hightLight: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 30,
    },

    field: {
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        lineHeight: 62,
        fontWeight: '500',
        fontSize: 18,
    },
    button: {
        height: 60,
        borderRadius: 12,
        marginTop: 15,
        marginBottom: 15,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    pickerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    errorText: {
        color: colors.red,
    },
    verification: {
        position: 'absolute',
        right: 20,
        top: -37,
        zIndex: 1000,
    },
});
export default RegisterStep2;
