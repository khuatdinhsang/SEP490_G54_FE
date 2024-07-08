import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexCenter, flexRow, flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import colors from '../../constant/color';
import InputNumber from '../../component/inputNumber';
import WeeklyComponent from './conponent/weeklyComponent';
import { IMAGE } from '../../constant/image';
import { ResponseWeeklyReview } from '../../constant/type/weekly';
import { weeklyReviewService } from '../../services/weeklyReviews';
import LoadingScreen from '../../component/loading';
import { convertMinutesToHoursAndMinutes, renderIconWeeklyReview, renderTextWeeklyReview } from '../../util';

const WeeklyEvaluateDetail = ({ route }: any) => {
    const time = route?.params?.time;
    const timeRender = route?.params?.timeRender;
    console.log(time, timeRender)
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false);
    const [messageError, setMessageError] = useState<string>("");
    const [data, setData] = useState<ResponseWeeklyReview>()
    const goBackPreviousPage = () => {
        navigation.goBack()
    }
    useEffect(() => {
        const getData = async (): Promise<void> => {
            setIsLoading(true);
            try {
                const resData = await weeklyReviewService.getDetailWeeklyReviews(time.split("T")[0]);
                if (resData.code === 200) {
                    setIsLoading(false);
                    console.log("ré", resData.result)
                    setData(resData.result)
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } catch (error: any) {
                if (error?.response?.status === 400 || error?.response?.status === 401) {
                    setMessageError(error.response.data.message);
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        getData();
    }, []);
    console.log("51", data?.totalPoint)
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={timeRender}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <ScrollView style={styles.scrollView} >
                <View style={styles.content}>
                    <Text style={styles.text}>{t('evaluate.general')}</Text>
                    <View style={[flexRow, styles.congratulation, styles.shadowBox]}>
                        <View style={flexRowCenter}>
                            <Image style={{ marginRight: 10 }} source={IMAGE.EVALUATE.LAYER} />
                            <Text style={[styles.textEvaluate, { fontSize: 20 }]}>{t(`${renderTextWeeklyReview(data?.totalPoint ?? 0)}`)}</Text>
                        </View>
                        <View style={[flexRow, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                            <Text style={styles.textDesc}>{t('evaluate.congratulation')}</Text>
                            <Text style={styles.textDesc}>{t('evaluate.successfulWeek')}</Text>
                        </View>
                    </View>
                    <View style={[flexRowSpaceBetween, { marginTop: 30 }]}>
                        <Text style={styles.text}>{t('evaluate.activitySummary')}</Text>
                        <Text style={styles.textTime}>{timeRender}</Text>
                    </View>
                    <View style={[styles.shadowBox, styles.summary]}>
                        <Text style={styles.text}>{t('evaluate.relatedDiabetes')}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.hba1cPoint ?? 0)} />
                            <View style={[flexRow, { flexDirection: 'column', alignItems: 'flex-start' }]} >
                                <Text style={styles.textDesc}>이번주 {data?.hba1cTotalRecord}번의 당화혈색소 기록 중</Text>
                                <Text style={styles.textDesc}>{data?.hba1cSafeRecord}번이 조절 범위내에 있었어요</Text>
                            </View>
                        </View>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.cholesterolPoint ?? 0)} />
                            <View style={[flexRow, { flexDirection: 'column', alignItems: 'flex-start' }]} >
                                <Text style={styles.textDesc}>이번주 {data?.cholesterolTotalRecord}번의 당화혈색소 기록 중</Text>
                                <Text style={styles.textDesc}>{data?.cholesterolSafeRecord}번이 조절 범위내에 있었어요</Text>
                            </View>
                        </View>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.bloodSugarPoint ?? 0)} />
                            <View style={[flexRow, { flexDirection: 'column', alignItems: 'flex-start' }]} >
                                <Text style={styles.textDesc}>이번주 {data?.bloodSugarTotalRecord}번의 당화혈색소 기록 중</Text>
                                <Text style={styles.textDesc}>{data?.bloodSugarSafeRecord}번이 조절 범위내에 있었어요</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.shadowBox, styles.summary]}>
                        <Text style={styles.text}>{t("common.diseases.highBlood")}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.bloodPressurePoint ?? 0)} />
                            <View style={[flexRow, { flexDirection: 'column', alignItems: 'flex-start' }]} >
                                <Text style={styles.textDesc}>이번주 {data?.totalBloodPressureRecord}번의 당화혈색소 기록 중</Text>
                                <Text style={styles.textDesc}>{data?.safeBloodPressureRecord}번이 조절 범위내에 있었어요</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.shadowBox, styles.summary, { paddingRight: 20 }]}>
                        <Text style={styles.text}>{t('recordHealthData.weight')}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.weightPoint ?? 0)} />
                            <View style={styles.weight}>
                                <Text style={[styles.textDesc, { textAlign: 'center' }]}>{t('common.text.average')} {data?.averageWeightRecordPerWeek}kg</Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.shadowBox, styles.summary, { paddingRight: 20 }]}>
                        <Text style={styles.text}>{t('planManagement.text.positiveMind')}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.mentalPoint ?? 0)} />
                            <Text style={[styles.textDesc, { flex: 1 }]}>하루 평균 긍정적 마음 {data?.averageMentalRecordPerWeek}개를수행하였습니다</Text>
                        </View>
                    </View>
                    <View style={[styles.shadowBox, styles.summary, { paddingRight: 20 }]}>
                        <Text style={styles.text}>{t('planManagement.text.workout')}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.activityPoint ?? 0)} />
                            <Text style={[styles.textDesc, { flex: 1 }]}>고강도 운동 {convertMinutesToHoursAndMinutes(data?.heavyActivity ?? 0)} / 중강도 운동 {convertMinutesToHoursAndMinutes(data?.mediumActivity ?? 0)}/ 저강도 운동 {convertMinutesToHoursAndMinutes(data?.lightActivity ?? 0)}</Text>
                        </View>
                        {data?.heavyActivity === 0 && data?.mediumActivity === 0 &&
                            <View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={styles.textWarning}>저강도 운동만 한다면 운동의 효과가 떨어져요. 다음주 부터는 중강도, 고강도 운동을 함께해봐요!</Text>
                                    <View style={[flexRow, styles.bridge]}>
                                        <View style={styles.diamond} />
                                    </View>
                                </View>
                                <View style={[flexRowCenter, { marginTop: 20 }]}>
                                    <Image source={IMAGE.EVALUATE.DOCTOR} />
                                </View>
                            </View>
                        }
                    </View>
                    <View style={[styles.shadowBox, styles.summary, { paddingRight: 20 }]}>
                        <Text style={styles.text}>{t('planManagement.text.foodIntake')}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.dietPoint ?? 0)} />
                            <Text style={[styles.textDesc, { flex: 1 }]}>하루 평균 {data?.averageDietRecordPerWeek}접시를 섭취하였습니다</Text>
                        </View>
                    </View>
                    <View style={[styles.shadowBox, styles.summary, { paddingRight: 20 }]}>
                        <Text style={styles.text}>{t('planManagement.text.takingMedication')}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.medicinePoint ?? 0)} />
                            <Text style={[styles.textDesc, { flex: 1 }]}>약을 먹는 날 {data?.medicineDateTotal}일 중 {data?.medicineDateDone}일 동안 약을 모두 섭취하였습니다.</Text>
                        </View>
                    </View>
                    <View style={[styles.shadowBox, styles.summary, { paddingRight: 20 }]}>
                        <Text style={styles.text}>{t('planManagement.text.numberSteps')}</Text>
                        <View style={[flexRow, { marginTop: 10 }]}>
                            <Image style={{ marginRight: 10 }} source={renderIconWeeklyReview(data?.stepPoint ?? 0)} />
                            <Text style={[styles.textDesc, { flex: 1 }]}>하루 평균 {data?.averageStepRecordPerWeek}보를 걸었습니다</Text>
                        </View>
                    </View>
                </View>
                {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>}
            </ScrollView>
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 20,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30
    },
    text: {
        fontWeight: "700",
        fontSize: 20,
        color: colors.gray_G10
    },
    textDesc: {
        fontWeight: "500",
        fontSize: 16,
        color: colors.gray_G07
    },
    congratulation: {
        borderRadius: 12,
        paddingVertical: 12,
        backgroundColor: colors.white,
        paddingLeft: 20,
        marginTop: 10
    },
    shadowBox: {
        shadowColor: '#6D6D6D',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 22,
        elevation: 3,
    },
    textTime: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.gray_G08
    },
    summary: {
        paddingVertical: 20,
        paddingLeft: 24,
        backgroundColor: colors.white,
        borderRadius: 12,
        marginTop: 20
    },
    weight: {
        paddingVertical: 10,
        backgroundColor: colors.gray_G01,
        flex: 1,
        borderRadius: 8
    },
    textWarning: {
        borderRadius: 16,
        paddingVertical: 10,
        paddingLeft: 14,
        color: colors.blue_01,
        backgroundColor: colors.blue,
        fontWeight: "500",
        fontSize: 16
    },
    bridge: {
        position: 'absolute',
        bottom: -6,
        left: "50%",
        transform: [{ translateX: -7.5 }]
    },
    diamond: {
        width: 15,
        height: 15,
        backgroundColor: colors.blue,
        transform: [{ rotate: '45deg' }],
        zIndex: 100,
    },
    textError: {
        fontWeight: '500',
        fontSize: 18,
        color: colors.red
    },
    textEvaluate: {
        position: 'absolute',
        fontWeight: '700',

        color: colors.white,
        transform: [{ translateX: -4.5 }],
    }
})
export default WeeklyEvaluateDetail