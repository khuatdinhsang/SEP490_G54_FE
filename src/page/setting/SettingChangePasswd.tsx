import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SafeAreaView, StyleSheet, View, ScrollView, Pressable, Text } from 'react-native';
import ButtonComponent from '../../component/button';
import DialogSingleComponent from '../../component/dialog-single';
import HeaderNavigatorComponent from '../../component/header-navigator';
import InputComponent from '../../component/input';
import { IMAGE } from '../../constant/image';
import { paddingHorizontalScreen } from '../../styles/padding';
import colors from '../../constant/color';
import { authService } from '../../services/auth';
import { SCREENS_NAME } from '../../navigator/const';
import axios from 'axios';
import * as yup from "yup";
import { Formik } from 'formik';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import LoadingScreen from '../../component/loading';

interface typeValues {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const SettingChangePassword = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false)
  const handleSubmit = async (values: typeValues): Promise<void> => {
    setIsLoading(true)
    const data = { oldPassword: values.oldPassword, newPassword: values.newPassword };
    try {
      const res = await authService.changePassword(data);
      if (res.code == 200) {
        setIsLoading(false)
        setIsShowDialog(true)
      }
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.code == 400 || error.response.data.code == 401) {
          setError(error.response.data.message);
        }
      }
    } finally {
      setIsLoading(false)
    }
  };
  const clearField = (field: string, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue(field, '');
  };

  const changePasswordSchema = yup.object().shape({
    oldPassword: yup.string().required(t("placeholder.err.blank")).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      t("placeholder.err.passwordCorrect")
    ),
    newPassword: yup.string().required(t("placeholder.err.blank")).matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      t("placeholder.err.passwordCorrect")
    ),
    confirmNewPassword: yup
      .string()
      .required(t("placeholder.err.blank"))
      .oneOf([yup.ref('newPassword')], t("placeholder.err.notMatch"))
  });

  const handleChangeText = (field: string, setFieldValue: (field: string, value: string) => void) => (text: string) => {
    setFieldValue(field, text);
    setError('')
  };

  const handleClickDialog = () => {
    setIsShowDialog(false);
    navigation.navigate(SCREENS_NAME.SETTING.MAIN)
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNavigatorComponent
        text="비밀번호 변경"
        isIconLeft={true}
        handleClickArrowLeft={() => {
          navigation.goBack();
        }}
      />
      <Formik
        initialValues={{ oldPassword: '', newPassword: '', confirmNewPassword: '' }}
        validationSchema={changePasswordSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              <View style={{ marginTop: 15 }}>
                <View style={[styles.content]}>
                  <InputComponent
                    placeholder={t("placeholder.field.oldPassword")}
                    onPressIconRight={() => clearField('oldPassword', setFieldValue)}
                    isIconRight={true}
                    value={values.oldPassword}
                    onChangeText={handleChangeText('oldPassword', setFieldValue)}
                    label={t('common.text.oldPassword')}
                    textError={errors.oldPassword}
                    secureTextEntry={true}
                  />
                  <View style={{ marginVertical: 10 }}>
                    <InputComponent
                      placeholder={t("placeholder.field.newPassword")}
                      onPressIconRight={() => clearField('newPassword', setFieldValue)}
                      isIconRight={true}
                      value={values.newPassword}
                      onChangeText={handleChangeText('newPassword', setFieldValue)}
                      label={t('common.text.newPassword')}
                      textError={errors.newPassword}
                      secureTextEntry={true}
                    />
                  </View>
                  <View style={{ marginVertical: 10 }}>
                    <InputComponent
                      placeholder={t("placeholder.field.confirmNewPassword")}
                      onPressIconRight={() => clearField('confirmNewPassword', setFieldValue)}
                      isIconRight={true}
                      value={values.confirmNewPassword}
                      onChangeText={handleChangeText('confirmNewPassword', setFieldValue)}
                      label={t('common.text.confirmNewPassword')}
                      textError={errors.confirmNewPassword}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                {error && !isLoading && <Text style={styles.textError}>{error}</Text>}
              </View>
            </ScrollView>
            <Pressable
              disabled={(errors.confirmNewPassword || errors.oldPassword || errors.newPassword) ? true : false}
              onPress={() => handleSubmit()}
              style={[styles.button, { backgroundColor: (errors.confirmNewPassword || errors.oldPassword || errors.newPassword || !values.newPassword) ? colors.gray : colors.primary }]}
            >
              <Text style={styles.textButton}>{t("common.text.confirm")}</Text>
            </Pressable>
          </>
        )}
      </Formik>
      <DialogSingleComponent
        isOverlay={true}
        isActive={isShowDialog}
        handleClickButton={handleClickDialog}
        title="비밀번호를 변경했습니다."
        content="변경된 비밀번호를 사용해주세요"
        imageSource={IMAGE.ICON_CHECK_COLOR}
        buttonText="확인"
      />
      {isLoading && <LoadingScreen />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  content: {
    marginTop: 20,
  },
  textError: {
    color: colors.red,
    fontWeight: "500",
    fontSize: 18
  },
  textButton: {
    color: colors.white,
    textAlign: "center",
    lineHeight: 60,
    fontWeight: "500",
    fontSize: 18
  },
  button: {
    height: 60,
    borderRadius: 12,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});

export default SettingChangePassword;
