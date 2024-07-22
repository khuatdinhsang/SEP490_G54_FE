import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ButtonComponent from '../../../../../component/button';
import HeaderNavigatorComponent from '../../../../../component/header-navigator';
import colors from '../../../../../constant/color';
import {paddingHorizontalScreen} from '../../../../../styles/padding';
import GreetingComponent from '../../../../informationHealth/components/GreetingComponent';
import Step1 from './Step1';
import Step2 from './Step2';
import DialogSingleComponent from '../../../../../component/dialog-single';
import {IMAGE} from '../../../../../constant/image';
import Done from './Done';

const Week1Day1 = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [step, setStep] = useState(1);
  const [isDialog, setIsDialog] = useState(false);

  const handleClickNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsDialog(true);
    }
  };
  const handleClickDone = () => {
    navigation.goBack();
  };

  const handleClickButtonCancelStep2 = () => {
    setIsDialog(false);
  };
  const handleClickButtonConfirmStep2 = () => {
    setIsDialog(false);
    setStep(0);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{paddingHorizontal: paddingHorizontalScreen * 2}}>
        <HeaderNavigatorComponent
          isIconLeft={true}
          text="학습하기"
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
      </View>
      <GreetingComponent text="인사말" />
      <View style={{flex: 1}}>
        {step === 1 && <Step1 />}
        {step === 2 && <Step2 />}
        {step === 0 && <Done />}
      </View>
      <View
        style={{
          paddingHorizontal: paddingHorizontalScreen * 2,
          marginBottom: 35,
        }}>
        <ButtonComponent
          text={step ? '다음' : '홈으로 돌아가기'}
          textColor={colors.white}
          handleClick={step ? handleClickNext : handleClickDone}
        />
      </View>
      {isDialog && (
        <DialogSingleComponent
          isOverlay={true}
          isActive={true}
          imageSource={IMAGE.INFORMATION_HEALTH.ICON_WARNING}
          title="정말 뒤로가시겠습니까?"
          content="입력하신 내용은 자동으로 저장됩니다."
          textButtonCancel="취소"
          textButtonConfirm="네"
          handleClickButtonCancel={handleClickButtonCancelStep2}
          handleClickButtonConfirm={handleClickButtonConfirmStep2}
          btnDelete={true}
          itemSelected={1}
        />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
  },
});
export default Week1Day1;
