import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow, flexRowSpaceBetween } from '../../styles/flex';
import colors from '../../constant/color';
import { Formik } from 'formik';
import * as yup from "yup";
import InputComponent from '../../component/input';
import DialogSingleComponent from '../../component/dialog-single';
import { IMAGE } from '../../constant/image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { questionService } from '../../services/question';

const AddQuestion = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [messageError, setMessageError] = useState<string>("")
    const [isShowModal, setIsShowModal] = useState<boolean>(false)
    const [typeUserQuestion, setTypeUserQuestion] = useState("ASSIGN_ADMIN")
    const goBackPreviousPage = () => {
        navigation.goBack();
    }
    const nextPage = () => {
        setIsShowModal(false)
        navigation.navigate(SCREENS_NAME.QUESTION.MAIN);
    }
    const addQuestionSchema = yup.object().shape({
        title: yup.string().required(t("questionManagement.error.title")),
        content: yup.string().required(t("questionManagement.error.content")),
    });
    const clearField = (field: string, setFieldValue: (field: string, value: any) => void) => {
        setFieldValue(field, '');
    };
    const handleSubmit = async (values: { title: string, content: string }, setFieldValue: (field: string, value: any) => void): Promise<any> => {
        const transformData = {
            typeUserQuestion: typeUserQuestion,
            title: values.title,
            body: values.content
        }
        try {
            const res = await questionService.create(transformData)
            if (res.code === 201) {
                setIsShowModal(true)
                clearField('title', setFieldValue)
                clearField('content', setFieldValue)
            }
        } catch (error: any) {
            if (error?.response?.status === 400 || error?.response?.status === 401) {
                setMessageError(error.message);
            } else {
                setMessageError("Unexpected error occurred.");
            }
        }
    }
    const navigateQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.MAIN)
    }
    const navigateRegularQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.REGULAR)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: colors.background, flex: 1 }}>
                <Formik
                    initialValues={{ title: '', content: '' }}
                    validationSchema={addQuestionSchema}
                    onSubmit={(values, { setFieldValue }) => handleSubmit(values, setFieldValue)}
                >
                    {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
                        <View style={{ flex: 1 }}>
                            <ScrollView contentContainerStyle={styles.scrollView}>
                                <View style={styles.header}>
                                    <HeaderNavigatorComponent
                                        isIconLeft={true}
                                        textRight={t("common.text.next")}
                                        text={t('questionManagement.makeQuestion')}
                                        handleClickArrowLeft={goBackPreviousPage}
                                    />
                                </View>
                                <View style={[flexRow, { backgroundColor: colors.white }]}>
                                    <Pressable
                                        onPress={navigateQuestion}
                                        style={[styles.navigate, styles.active]}>
                                        <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                                            {t('questionManagement.contactUs')}
                                        </Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={navigateRegularQuestion}
                                        style={styles.navigate}>
                                        <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                                            {t('questionManagement.regularQuestion')}
                                        </Text>
                                    </Pressable>
                                </View>

                                <View style={{ flex: 1, paddingTop: 20, paddingHorizontal: 20, }}>
                                    <Text style={{ fontWeight: "500", fontSize: 18, color: colors.black, marginBottom: 10 }}>{t('questionManagement.typeQuestion')}</Text>
                                    <View style={[flexRowSpaceBetween, { width: '100%', marginBottom: 20 }]}>
                                        <Pressable
                                            onPress={() => setTypeUserQuestion("ASSIGN_ADMIN")}
                                            style={{ width: '47%' }}>
                                            <View
                                                style={[
                                                    styles.box,
                                                    {
                                                        borderColor: typeUserQuestion === "ASSIGN_ADMIN" ? colors.primary : colors.gray,
                                                        backgroundColor: typeUserQuestion === "ASSIGN_ADMIN" ? colors.primary : 'white',
                                                    },
                                                ]}>
                                                <Text
                                                    style={[
                                                        styles.textInput,
                                                        { color: typeUserQuestion === "ASSIGN_ADMIN" ? colors.white : colors.black },
                                                    ]}>
                                                    {t('questionManagement.admin')}
                                                </Text>
                                            </View>
                                        </Pressable>
                                        <Pressable
                                            onPress={() => setTypeUserQuestion("ASSIGN_MS")}
                                            style={{ width: '47%' }}>
                                            <View
                                                style={{
                                                    borderRadius: 8,
                                                    borderColor: typeUserQuestion === "ASSIGN_MS" ? colors.primary : colors.gray,
                                                    borderWidth: 1,
                                                    height: 56,
                                                    backgroundColor: typeUserQuestion === "ASSIGN_MS" ? colors.primary : 'white',
                                                }}>
                                                <Text
                                                    style={[
                                                        styles.textInput,
                                                        { color: typeUserQuestion === "ASSIGN_MS" ? colors.white : colors.black },
                                                    ]}>
                                                    {t('questionManagement.medicalSpecialist')}
                                                </Text>
                                            </View>
                                        </Pressable>
                                    </View>

                                    <InputComponent
                                        placeholder={t("questionManagement.placeholder.title")}
                                        onPressIconRight={() => clearField('title', setFieldValue)}
                                        isIconRight={true}
                                        value={values.title}
                                        onChangeText={handleChange('title')}
                                        label={t("questionManagement.title")}
                                        textError={errors.title}
                                        styleInput={{ backgroundColor: colors.white }}
                                    />
                                    <View style={{ marginTop: 15 }}>
                                        <InputComponent
                                            placeholder={t("questionManagement.placeholder.content")}
                                            value={values.content}
                                            onChangeText={handleChange('content')}
                                            label={t("questionManagement.content")}
                                            textError={errors.content}
                                            multiline={true}
                                            textAlignVertical="top"
                                            heightLine={250}
                                            styleInput={{ backgroundColor: colors.white }}
                                        />
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={[styles.buttonContainer, { backgroundColor: colors.background }]}>
                                <Pressable
                                    disabled={(errors.title || errors.content) ? true : false}
                                    onPress={() => handleSubmit()}
                                    style={[flexCenter, styles.button, { backgroundColor: (errors.title || errors.content || !values.title) ? colors.gray_G02 : colors.primary }]}>
                                    <Text style={styles.textButton}> {t('questionManagement.write')}</Text>
                                </Pressable>
                            </View>
                        </View>
                    )}
                </Formik>
            </View>
            <DialogSingleComponent
                isOverlay={true}
                isActive={isShowModal}
                title={t("questionManagement.questionSuccess")}
                imageSource={IMAGE.QUESTION.ICON_CHECK}
                buttonText={t("common.text.confirm")}
                handleClickButton={nextPage}
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        paddingBottom: 100,
    },
    navigate: {
        height: 48,
        width: '50%'
    },
    active: {
        borderBottomWidth: 2,
        borderColor: colors.orange_04,
    },
    textNavigate: {
        textAlign: 'center',
        lineHeight: 48,
        fontWeight: '700',
        fontSize: 16
    },
    header: {
        paddingHorizontal: 20,
        backgroundColor: colors.white
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    button: {
        height: 60,
        borderRadius: 12,
        width: '100%'
    },
    textButton: {
        color: colors.white,
        textAlign: "center",
        lineHeight: 60,
        fontWeight: "500",
        fontSize: 18
    },
    textInput: {
        textAlign: 'center',
        lineHeight: 56,
    },
    box: {
        borderRadius: 8,
        borderWidth: 1,
        height: 56,
    },
})
export default AddQuestion