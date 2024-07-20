import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { SCREENS_NAME } from '../../navigator/const';
import LoadingScreen from '../../component/loading';
import { weeklyReviewService } from '../../services/weeklyReviews';
import { getMondayOfCurrentWeek } from '../../util';


const MainIndexMedication = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    useEffect(() => {
        const getMadePlan = async () => {
            setIsLoading(true);
            setMessageError("");
            try {
                const res = await weeklyReviewService.getMadePlan(getMondayOfCurrentWeek().split("T")[0]);
                if (res.code === 200) {
                    navigateScreen(res.result);
                } else {
                    setMessageError("Failed to fetch plan");
                }
            } catch (error: any) {
                if (error?.response?.status === 400) {
                    setMessageError(error.response.data.message);
                } else {
                    setMessageError("Unexpected error occurred.");
                }
            } finally {
                setIsLoading(false);
            }
        };
        getMadePlan();
    }, []);
    const navigateScreen = (screen: number): void => {
        switch (screen) {
            case 1:
                navigation.replace(SCREENS_NAME.PLAN_MANAGEMENT.WORK_OUT);
                break;
            case 2:
                navigation.replace(SCREENS_NAME.PLAN_MANAGEMENT.FOOD_INTAKE);
                break;
            case 3:
                navigation.replace(SCREENS_NAME.PLAN_MANAGEMENT.REGISTER_MEDICATION);
                break;
            case 4:
                navigation.replace(SCREENS_NAME.PLAN_MANAGEMENT.NUMBER_STEPS);
                break;
            case 5:
                navigation.replace(SCREENS_NAME.PLAN_MANAGEMENT.SUCCESS);
                break;
            default:
                navigation.replace(SCREENS_NAME.PLAN_MANAGEMENT.MAIN);
                break;
            case -1:
                navigation.replace(SCREENS_NAME.PLAN_MANAGEMENT.MAIN);
                break;
        }
    }
    return (
        <View style={styles.container}>{isLoading && <LoadingScreen />}</View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default MainIndexMedication;