import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SCREENS_NAME } from '../../navigator/const';
import LoadingScreen from '../../component/loading';
import { weeklyReviewService } from '../../services/weeklyReviews';
import { getMondayOfCurrentWeek } from '../../util';


const MainIndexRecordHealthData = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    useEffect(() => {
        const getMadePlan = async () => {
            setIsLoading(true)
            try {
                const res = await weeklyReviewService.getMadePlan(getMondayOfCurrentWeek().split("T")[0])
                if (res.code === 200) {
                    setIsLoading(false)
                    if (res.result === 5) {
                        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN)
                    } else {
                        navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.NO_DATA)
                    }

                } else {
                    setMessageError("Failed to fetch plan");
                }
            } catch (error: any) {
                if (error?.response?.status === 400) {
                    setMessageError(error.response.data.message);
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            }
            finally {
                setIsLoading(false)
            }
        };
        getMadePlan()
    }, [])
    return (
        <View style={styles.container}>{isLoading && <LoadingScreen />}</View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default MainIndexRecordHealthData;