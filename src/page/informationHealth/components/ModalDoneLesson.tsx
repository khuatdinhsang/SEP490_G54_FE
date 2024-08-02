import React from 'react';
import { Image, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import colors from '../../../constant/color';
import { WidthDevice } from '../../../util/Dimenssion';
import { IMAGE } from '../../../constant/image';


export interface propsType {
    visible: boolean,
    toggleModal: () => void
}
const ModalDoneLesson = ({ visible, toggleModal }: propsType) => {
    const { t } = useTranslation();

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                toggleModal();
            }}>
            <View style={styles.overlay}>
                <View style={styles.modalView}>
                    <Pressable
                        style={styles.buttonCancelDate}
                        onPress={toggleModal}>
                        <Image source={IMAGE.REGISTER.ICON_X} />
                    </Pressable>
                    <View style={{ marginTop: 50 }}>
                        <Text style={styles.textTitle}>{t("lesson.todayLearning")}</Text>
                        <Text style={[styles.textTitle, { marginBottom: 10 }]}>{t("lesson.pressAgain")}</Text>
                        <Image source={IMAGE.ICON_LESSON} />
                    </View>
                    <Pressable
                        onPress={toggleModal}
                        style={styles.button}>
                        <Text style={styles.textButton}>{t("lesson.backToHome")}</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalView: {
        height: '40%',
        backgroundColor: colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        alignItems: 'center',
        position: 'relative',
        width: '100%',
        paddingHorizontal: 20
    },
    buttonCancelDate: {
        position: 'absolute',
        top: 15,
        right: 15,
        zIndex: 100,
    },
    textTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: colors.gray_G08,
        textAlign: 'center',
    },
    button: {
        backgroundColor: colors.gray_G08,
        borderRadius: 12,
        paddingVertical: 17,
        width: "100%"
    },
    textButton: {
        color: colors.white,
        fontSize: 18,
        fontWeight: "500",
        textAlign: 'center'
    }
});

export default ModalDoneLesson;
