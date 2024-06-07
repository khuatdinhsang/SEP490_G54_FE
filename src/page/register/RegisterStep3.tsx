import React, { useEffect, useState } from 'react';
import { Button, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import colors from '../../constant/color';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import { flexRow, flexRowSpaceBetween } from '../../styles/flex';
import { IMAGE } from '../../constant/image';
import CategoryDisease from './component/CategoryDisease';
import { SCREENS_NAME } from '../../navigator/const';
import ProgressHeader from '../../component/progessHeader';

type dataTypes = {
    title: string,
    data: {
        id: number,
        name: string
    }[]
}[]
const RegisterStep3 = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const { t } = useTranslation();
    const [data, setData] = useState<dataTypes>([
        {
            title: t("common.diseases.chronic"),
            data: [
                { id: 1, name: t("common.diseases.cholesterol") },
                { id: 2, name: t("common.diseases.highBlood") },
                { id: 3, name: t("common.diseases.diabetes") },
                { id: 4, name: t("common.diseases.osteoporosis") },
                { id: 5, name: t("common.diseases.kidney") },
            ]
        },
        {
            title: t("common.diseases.chronicRespiratory"),
            data: [
                { id: 6, name: t("common.diseases.congestedLungs") },
                { id: 7, name: t("common.diseases.asthma") },
                { id: 8, name: t("common.diseases.pulmonaryFibrosis") },
                { id: 9, name: t("common.diseases.tuberculosis") },
                { id: 10, name: t("common.diseases.others") },
            ]
        },
        {
            title: t("common.diseases.chronicArthritis"),
            data: [
                { id: 11, name: t("common.diseases.rheumatoidArthritis") },
                { id: 12, name: t("common.diseases.gout") },
                { id: 13, name: t("common.diseases.gout") },
                { id: 14, name: t("common.diseases.osteoarthritis") },
            ]
        }
    ]);
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
    const loginPage = () => {
        navigation.navigate(SCREENS_NAME.LOGIN.MAIN);
    };
    const handleSelectItem = (itemId: number) => {
        setSelectedItems((prevSelectedItems) => {
            if (prevSelectedItems.includes(itemId)) {
                return prevSelectedItems.filter(item => item !== itemId);
            } else {
                return [...prevSelectedItems, itemId];
            }
        });
    };
    const handleSubmit = () => {
        if (selectedItems.length > 0) {
            navigation.navigate(SCREENS_NAME.REGISTER.STEP4);
        }
    };
    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
                <SafeAreaView style={styles.container}>
                    <Pressable onPress={loginPage}>
                        <Image
                            style={styles.buttonCancel}
                            source={require('../../assets/image/register/icon_X.png')}
                        />
                    </Pressable>
                    <ProgressHeader index={[0, 1, 2]} length={4} style={{ marginTop: 45 }} />
                    <View style={{ marginTop: 20 }}>
                        <View style={[flexRow, { marginBottom: 30, width: 200, alignItems: 'flex-start' }]}>
                            <Text style={[styles.hightLight, { color: colors.primary }]}>03.</Text>
                            <Text style={[styles.hightLight, { color: colors.black }]}>
                                {t("common.text.fillIllness")}
                            </Text>
                        </View>
                    </View>
                    <View>
                        {data &&
                            data.map((section: any) => (
                                <CategoryDisease
                                    key={section.title}
                                    section={section}
                                    handleSelectItem={handleSelectItem}
                                    selectedItems={selectedItems}
                                />
                            ))}
                    </View>
                </SafeAreaView>
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={handleSubmit}
                    style={[
                        styles.button,
                        { backgroundColor: selectedItems.length !== 0 ? colors.primary : colors.gray },
                    ]}>
                    <Text style={styles.text}>{t("common.text.next")}</Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1
    },
    buttonCancel: {
        position: 'absolute',
        right: 0,
        top: 15,
    },
    hightLight: {
        fontWeight: '700',
        fontSize: 22,
        lineHeight: 30,
    },
    field: {
        borderColor: colors.primary,
        borderWidth: 1,
        marginTop: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    text: {
        color: colors.white,
        textAlign: 'center',
        lineHeight: 62,
        fontWeight: '500',
        fontSize: 18,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: colors.white,
        paddingVertical: 20,
    },
    button: {
        height: 60,
        borderRadius: 12,
        justifyContent: 'center',
    },
});

export default RegisterStep3;