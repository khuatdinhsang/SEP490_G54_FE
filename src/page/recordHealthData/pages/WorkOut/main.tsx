import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { chartService } from '../../../../services/charts';
import { SCREENS_NAME } from '../../../../navigator/const';
import { getMondayOfCurrentWeek } from '../../../../util';
import LoadingScreen from '../../../../component/loading';
import colors from '../../../../constant/color';

const MainWorkOut = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t, i18n } = useTranslation();
    const [isLoading, setIsLoading] = useState(false)
    const [messageError, setMessageError] = useState<string>("")
    useEffect(() => {
        const checkIsExistDataToday = async () => {
            setIsLoading(true);
            try {
                const res = await chartService.checkIsExistActivity(getMondayOfCurrentWeek().split("T")[0]);
                if (res.result === true) {
                    setIsLoading(false);
                    setMessageError("");
                    navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.WORD_OUT_CHART, { isEditable: false })
                } else {
                    setIsLoading(false);
                    navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.WORK_OUT_RECORD, { isEditable: true })
                }
            } catch (error: any) {
                if (error?.response?.status === 400 || error?.response?.status === 401) {
                    setMessageError(error.response.data.message);
                }
            } finally {
                setIsLoading(false);
            }
        }
        checkIsExistDataToday()
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

export default MainWorkOut;