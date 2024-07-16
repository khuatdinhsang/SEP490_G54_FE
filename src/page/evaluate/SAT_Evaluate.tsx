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
import DescriptionColor from './conponent/descriptionColor';

const SAT_Evaluate = ({ route }: any) => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();
    const time = route?.params?.time
    const [messageError, setErrorMessage] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false)
    const goBackPreviousPage = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <HeaderNavigatorComponent
                    isIconXRight={true}
                    text={`${time}월 결과`}
                    handleClickIconRight={goBackPreviousPage}
                />
            </View>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} style={styles.scrollView}>
                <View style={[styles.content, styles.shadowBox]}>
                    <Text style={styles.textTitle}>건강 경영 전략</Text>
                    <Text style={[styles.textAva, { marginTop: 10, marginBottom: 20 }]}>종합</Text>
                    <DescriptionColor />
                </View>
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
    },
    shadowBox: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#6D6D6D',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 22,
        elevation: 3,
    },
    content: {
        backgroundColor: colors.white,
        borderRadius: 16,
        marginTop: 20
    },
    textTitle: {
        fontWeight: "700",
        fontSize: 20,
        color: colors.gray_G10,
        textAlign: 'center'
    },
    textAva: {
        fontWeight: "700",
        fontSize: 18,
        color: colors.gray_G08
    }
});

export default SAT_Evaluate;
