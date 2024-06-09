import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow, flexRowSpaceBetween } from '../../styles/flex';
import colors from '../../constant/color';
import QuestionComponent from './component/Question';
import { dataQuestion } from './const';


const ListQuestion = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const initData = [
        { id: 1, date: '2023.10.07', content: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁.어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', title: '확인해주세요', answer: '', status: 0 },
        { id: 2, date: '2023.10.07', content: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', title: '확인해주세요', answer: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', status: 1 },
        { id: 3, date: '2023.10.07', content: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', title: '확인해주세요', answer: '', status: 0 },
        { id: 4, date: '2023.10.07', content: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁.어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', title: '확인해주세요', answer: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', status: 1 },
        { id: 5, date: '2023.10.07', content: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', title: '확인해주세요', answer: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', status: 1 },
        { id: 6, date: '2023.10.07', content: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', title: '확인해주세요', answer: '', status: 0 },
        { id: 7, date: '2023.10.07', content: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', title: '확인해주세요', answer: '어플리케이션 알림이 오지 않습니다. 확인해주세요. 답변부탁', status: 1 },
    ]
    const [listQuestion, setListQuestion] = useState<dataQuestion[]>(initData)
    const goBackPreviousPage = () => {
        navigation.goBack();
    }
    const nextPage = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.ADD)
    }
    const handleDetailQuestion = (id: number) => {
        navigation.navigate(SCREENS_NAME.QUESTION.DETAIL, { questionId: id })
    }
    const navigateQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.LIST)
    }
    const navigateRegularQuestion = () => {
        navigation.navigate(SCREENS_NAME.QUESTION.REGULAR)
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={[styles.header, { backgroundColor: colors.white }]}>
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
                <View style={{ paddingHorizontal: 20, marginTop: 20, }}>
                    {listQuestion && listQuestion.map((item) => {
                        return (
                            <QuestionComponent key={item.id} question={item} handleDetailQuestion={handleDetailQuestion} />
                        )
                    })}
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={nextPage}
                    style={[flexCenter, styles.button, { backgroundColor: colors.primary }]}>
                    <Text style={styles.textButton}> {t('questionManagement.write')}</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        paddingBottom: 80,
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
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: colors.background
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

})
export default ListQuestion