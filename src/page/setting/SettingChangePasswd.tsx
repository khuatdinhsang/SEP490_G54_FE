import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import ButtonComponent from '../../component/button';
import DialogSingleComponent from '../../component/dialog-single';
import HeaderNavigatorComponent from '../../component/header-navigator';
import InputComponent from '../../component/input';
import {IMAGE} from '../../constant/image';
import {paddingHorizontalScreen} from '../../styles/padding';

const SettingChangePassword = () => {
  const {t, i18n} = useTranslation();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [textErrorConfirmPassword, setTextErrorConfirmPassword] =
    useState<string>('');

  const handleClearNewPassword = () => {
    setNewPassword('');
  };
  const handleClearConfirmPassword = () => {
    setConfirmPassword('');
  };

  const handleChangeNewPassword = (newPassword: string) => {
    setNewPassword(newPassword);
    if (newPassword.length !== 0 && newPassword === confirmPassword) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };
  const handleChangeConfirmPassword = (confirmPassword: string) => {
    setConfirmPassword(confirmPassword);
    if (newPassword !== confirmPassword) {
      setTextErrorConfirmPassword('비밀번호를 다시 확인해주세요');
      setIsDisable(true);
    } else {
      setTextErrorConfirmPassword('');
      setIsDisable(false);
    }
  };

  const handlePressChangePassword = () => {
    if (!isDisable) {
      setIsShowDialog(true);
    }
  };
  const handleClickDialog = () => {
    setIsShowDialog(false);
  };

  return (
    <View style={styles.container}>
      <HeaderNavigatorComponent
        text="비밀번호 변경"
        handleClickArrowLeft={() => {
          navigation.goBack();
        }}
      />
      <View style={{marginTop: 30}} />
      <View style={{flex: 1}}>
        <InputComponent
          placeholder="이메일을 입력해주세요"
          label="비밀번호 재설정"
          isIconRight={true}
          value={newPassword}
          onChangeText={handleChangeNewPassword}
          secureTextEntry={true}
          onPressIconRight={handleClearNewPassword}
        />
        <View style={{marginVertical: 14}} />
        <InputComponent
          placeholder="이메일을 입력해주세요"
          label="비밀번호 확인"
          isIconRight={true}
          value={confirmPassword}
          onChangeText={handleChangeConfirmPassword}
          secureTextEntry={true}
          onPressIconRight={handleClearConfirmPassword}
          textError={textErrorConfirmPassword}
        />
      </View>
      <ButtonComponent
        text="완료"
        handleClick={handlePressChangePassword}
        isDisable={isDisable}
      />
      <DialogSingleComponent
        isOverlay={true}
        isActive={isShowDialog}
        handleClickButton={handleClickDialog}
        title="비밀번호를 변경했습니다."
        content="변경된 비밀번호를 사용해주세요"
        imageSource={IMAGE.ICON_CHECK_COLOR}
        buttonText="확인"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen * 2,
    flex: 1,
    paddingBottom: 30,
  },
  switch: {
    marginVertical: 12,
  },
});

export default SettingChangePassword;
