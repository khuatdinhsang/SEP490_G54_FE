import { ParamListBase, useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexRow, flexRowCenter } from '../../styles/flex';
import colors from '../../constant/color';
import WeeklyComponent from './conponent/weeklyComponent';
import { IMAGE } from '../../constant/image';
import MonthComponent from './conponent/monthlyComponent';
import { SCREENS_NAME } from '../../navigator/const';
import LoadingScreen from '../../component/loading';
import { monthlyQuestionService } from '../../services/monthlyQuestion';
import { listMonthNumberRes } from '../../constant/type/question';
import MonthlyChart from '../../component/monthly-chart';
import { chartService } from '../../services/charts';
import { convertToChart1Monthly, convertToChart2Monthly } from '../../util';

const SF_Evaluate = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const goBackPreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconLeft={true}
                    text={t('evaluate.view')}
                    handleClickArrowLeft={goBackPreviousPage}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.scrollView}>

            </ScrollView>
            {/* {messageError && !isLoading && <Text style={styles.textError}>{messageError}</Text>} */}
            {isLoading && <LoadingScreen />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 20,
    },
    navigate: {
        height: 48,
        width: '50%',
    },
    header: {
        paddingHorizontal: 20,
    },
    textError: {
        fontSize: 14,
        color: colors.red,
        fontWeight: "500"
    }
});

export default SF_Evaluate;
