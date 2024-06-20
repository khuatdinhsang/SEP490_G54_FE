import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import { flexRow, flexRowCenter } from '../../styles/flex';
import colors from '../../constant/color';
import WeeklyComponent from './conponent/weeklyComponent';
import { IMAGE } from '../../constant/image';
import { SCREENS_NAME } from '../../navigator/const';

const WeeklyEvaluate = () => {
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const { t } = useTranslation();

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
            <View style={flexRow}>
                <Pressable style={[styles.navigate, styles.active]}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G10 }]}>
                        {t('evaluate.week')}
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.MONTHLY)}
                    style={styles.navigate}>
                    <Text style={[styles.textNavigate, { color: colors.gray_G04 }]}>
                        {t('evaluate.month')}
                    </Text>
                </Pressable>
            </View>
            {true ? <ScrollView style={styles.scrollView}>
                <View style={styles.content}>
                    <View style={{ marginBottom: 20 }}>
                        <WeeklyComponent isNew={true} time="10/2-10/8" />
                        <WeeklyComponent isNew={true} time="10/2-10/8" />
                        <WeeklyComponent time="10/2-10/8" />
                        <WeeklyComponent isNew={true} time="10/2-10/8" />
                        <WeeklyComponent time="10/2-10/8" />
                        <WeeklyComponent time="10/2-10/8" />
                        <WeeklyComponent isNew={true} time="10/2-10/8" />
                        <WeeklyComponent time="10/2-10/8" />
                        <WeeklyComponent isNew={true} time="10/2-10/8" />
                        {/* Other WeeklyComponent instances can be added here */}
                    </View>
                </View>
            </ScrollView>
                :
                <View style={[flexRowCenter, { flexDirection: 'column', flex: 1 }]}>
                    <Image source={IMAGE.EVALUATE.CATEGORY} />
                    <Text style={[styles.textNavigate, { color: colors.gray_G08 }]}>{t("evaluate.noReview")}</Text>
                </View>
            }

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
    },
    navigate: {
        height: 48,
        width: '50%',
    },
    active: {
        borderBottomWidth: 2,
        borderColor: colors.orange_04,
    },
    textNavigate: {
        textAlign: 'center',
        lineHeight: 48,
        fontWeight: '700',
        fontSize: 16,
    },
    header: {
        paddingHorizontal: 20,
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 30,
    },
});

export default WeeklyEvaluate;
