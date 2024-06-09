import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import colors from '../../../constant/color';

const TableExample = () => {
    const { t } = useTranslation();
    const tableHead = [
        t("planManagement.text.type"),
        t("planManagement.text.exampleFruit"),
        t("planManagement.text.consumptionAmount")
    ];
    const tableData = [
        [
            t("planManagement.text.boiled/blanchedVegetables"),
            t("planManagement.text.examplesBoiled/BlanchedVegetables"),
            `1/2${t("planManagement.text.disk")}`
        ],
        [
            t("planManagement.text.vegetables"),
            [`${t("planManagement.text.examplesVegetables")}\n${t("planManagement.text.apple/melon")}\n${t("planManagement.text.tangerine")}\n${t("planManagement.text.grape")}\n${t("planManagement.text.cannedFruit")}`],
            [`1${t("planManagement.text.disk")}\n1/2${t("planManagement.text.disk")}\n1${t("planManagement.text.fruit")}\n15${t("planManagement.text.fruit")}\n1/2${t("planManagement.text.disk")}`]
        ],
        [
            t("planManagement.text.driedFruit"),
            t("planManagement.text.grape/bananaDried"),
            `1/4${t("planManagement.text.disk")}`,
        ]
    ];

    return (
        <View>
            <Table >
                <Row
                    flexArr={[1, 2, 1]}
                    data={tableHead}
                    style={styles.head}
                    textStyle={styles.textHeader}
                />
                <Rows
                    style={{ backgroundColor: colors.gray_G01 }}
                    flexArr={[1, 2, 1]}
                    data={tableData}
                    textStyle={styles.text}
                    borderStyle={{ borderWidth: 1, borderColor: colors.gray_G03 }}
                />
            </Table>
        </View>
    );
};

const styles = StyleSheet.create({
    head: {
        height: 40,
        backgroundColor: colors.orange_02,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0
    },
    textHeader: {
        textAlign: 'center',
        color: colors.primary,
        fontWeight: '500',
        fontSize: 16,
    },
    text: {
        margin: 10,
        color: colors.gray_G06,
        fontWeight: '400',
        fontSize: 14,
        textAlign: 'left',
    }
});

export default TableExample;
