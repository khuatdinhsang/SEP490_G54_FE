import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { flexRow, flexRowSpaceBetween } from '../../../styles/flex';
import colors from '../../../constant/color';
import { useTranslation } from 'react-i18next';
import { IMAGE } from '../../../constant/image';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../../navigator/const';

interface WeeklyComponentProps {
    isNew?: boolean;
    timeRender: string;
    time: string;
}

const WeeklyComponent = (props: WeeklyComponentProps) => {
    const { isNew, timeRender, time } = props;
    const { t } = useTranslation();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const detailEvaluate = () => {
        navigation.navigate(SCREENS_NAME.EVALUATE.DETAIL_WEEKLY, { timeRender, time });
    };

    return (
        <Pressable
            onPress={detailEvaluate}
            style={[flexRow, styles.item, styles.shadowBox]}>
            <View style={[flexRow, styles.textContainer]}>
                <Image source={IMAGE.EVALUATE.NOTE} />
                <Text style={styles.textTime}>{timeRender}</Text>
                <Text style={styles.textDescription}>
                    {t('evaluate.weeklyEvaluationResults')}
                </Text>
            </View>
            {isNew && <Text style={styles.new}>{t('common.text.new')}</Text>}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    textTime: {
        fontWeight: '700',
        fontSize: 18,
        color: colors.gray_G07,
        marginRight: 5,
    },
    item: {
        paddingHorizontal: 16,
        paddingVertical: 18,
        borderRadius: 12,
        backgroundColor: colors.white,
        marginBottom: 15,
    },
    shadowBox: {
        shadowColor: '#6D6D6D',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.12,
        shadowRadius: 22,
        elevation: 3,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
    },

    textDescription: {
        fontWeight: '500',
        color: colors.gray_G07,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
    new: {
        color: colors.white,
        fontWeight: '500',
        fontSize: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 999,
        backgroundColor: colors.orange_04,
    },
});

export default WeeklyComponent;
