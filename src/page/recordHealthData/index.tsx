import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import { SCREENS_NAME } from '../../navigator/const';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import RecordComponent from './component/Record';
import { recordData } from './contant';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { weeklyReviewService } from '../../services/weeklyReviews';
import { getMondayOfCurrentWeek } from '../../util';
import LoadingScreen from '../../component/loading';


const RecordHealthData = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const goBackPreviousPage = () => {
        navigation.navigate(SCREENS_NAME.HOME.MAIN)
    }
    const initData = [
        {
            id: 1,
            title: `${t('recordHealthData.glycatedHemoglobin')},${t('recordHealthData.cholesterol')},${t('recordHealthData.bloodSugar')}`,
            image: IMAGE.RECORD_DATA.BLOOD,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.NUMERICAL_RECORD
        }, {
            id: 2,
            title: t('recordHealthData.bloodPressure'),
            image: IMAGE.RECORD_DATA.THERMOMETER,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_BLOOD_PRESSURE
        }, {
            id: 3,
            title: t('recordHealthData.weight'),
            image: IMAGE.RECORD_DATA.CHART,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WEIGHT
        }, {
            id: 4,
            title: t('planManagement.text.positiveMind'),
            image: IMAGE.RECORD_DATA.HEART_ORANGE,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_POSITIVE_MIND
        }, {
            id: 5,
            title: t('planManagement.text.workout'),
            image: IMAGE.PLAN_MANAGEMENT.HUMAN,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_WORK_OUT
        }, {
            id: 6,
            title: t('recordHealthData.diet'),
            image: IMAGE.PLAN_MANAGEMENT.VEGETABLE,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_FOOD_INTAKE
        }, {
            id: 7,
            title: t('planManagement.text.takingMedication'),
            image: IMAGE.PLAN_MANAGEMENT.MEDICATION1,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_MEDICATION
        }, {
            id: 8,
            title: t('planManagement.text.numberSteps'),
            image: IMAGE.PLAN_MANAGEMENT.SHOES,
            screen: SCREENS_NAME.RECORD_HEALTH_DATA.NUMBER_STEPS_CHART
        }
    ]
    // const currentScreen = useSelector((state: RootState) => state.screen.currentScreen);
    const [listRecord, setListRecord] = useState<recordData[]>(initData)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const handleNavigate = (screen: string) => {
        navigation.navigate(screen)
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={t('recordHealthData.record')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <ScrollView contentContainerStyle={styles.scrollView}>
                <View style={styles.content}>
                    <View style={[flexRowCenter, { marginBottom: 40 }]}>
                        <Text style={styles.textContent}>{t('recordHealthData.myToday')}</Text>
                        <Text style={[styles.textContent, { color: colors.orange_04 }]}>{t('recordHealthData.healthActives')}</Text>
                        <Text style={styles.textContent}>{t('recordHealthData.letRecord')}</Text>
                    </View>
                    <View style={[flexRowSpaceBetween, { flexWrap: 'wrap' }]}>
                        {listRecord && listRecord.map((item) => {
                            return (
                                <RecordComponent key={item.id} record={item} handleNavigate={handleNavigate} />
                            )
                        })}
                    </View>
                </View>
            </ScrollView>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    scrollView: {
        paddingBottom: 20
    },
    header: {
        backgroundColor: colors.white,
        paddingHorizontal: 20
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 30
    },
    textContent: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.gray_G07
    },
})
export default RecordHealthData