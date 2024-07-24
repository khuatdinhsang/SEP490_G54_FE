import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import colors from '../../../../../constant/color';
import { paddingHorizontalScreen } from '../../../../../styles/padding';
import StepComponent from '../../../../informationHealth/components/StepComponent';
import DoctorComponent from '../../../components/DoctorComponent';
import InputShareComponent from '../../../components/InputShareComponent';
import InputComponent from '../../../../../component/input';
import { useTranslation } from 'react-i18next';

interface Step3Props {
  onSubmit: (values: { address: string, time: string }) => void,
  setIsDisabled: (value: boolean) => void
}
const Step3 = (props: Step3Props) => {
  const { onSubmit, setIsDisabled } = props
  const { t } = useTranslation()
  const [address, setAddress] = useState<string>('');
  const [errAddress, setErrAddress] = useState<string>("")
  const [time, setTime] = useState<string>('');
  const [errTime, setErrTime] = useState<string>('');
  // setErrAddress(t("placeholder.err.invalidInput"))
  useEffect(() => {
    onSubmit({ address, time })
    const isDisabled = (address && time && !errAddress.length && !errTime.length) ? false : true
    setIsDisabled(isDisabled)
  }, [time, address, setIsDisabled])
  return (
    <View style={[styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StepComponent
          textLeft="Step3"
          text="최상의 환경, 방해 환경 작성하기"
        />
        <View style={{ marginTop: 32 }} />
        <DoctorComponent
          height={115}
          content="나의 건강에 도움이 되는 최상의 환경과 나의 건강에 방해가 되는 방해 환경을 적어봅시다."
        />
        <View style={{ marginTop: 30 }} />
        <Text style={styles.text}>
          <Text style={{ fontWeight: '700' }}>{'최상의 환경\n'}</Text>머무는 동안
          계획에 집중하고 잘 실천할 수 있는 장소, 시간, 사람을 작성해보세요
        </Text>
        <View style={{ marginTop: 32 }} />
        <InputComponent
          value={address}
          onChangeText={(value) => {
            setErrAddress("")
            if (value.trim().length === 0) {
              setErrAddress(t("placeholder.err.invalidInput"))
              setAddress("")
            }
            setAddress(value)
          }}
          placeholder="예시) 사무실, 학교 등"
          label="장소"
          heightLine={50}
          textError={errAddress}
        />
        <View style={{ marginTop: 15 }} />
        <InputComponent
          value={time}
          onChangeText={(value) => {
            setErrTime("")
            if (value.trim().length === 0) {
              setErrTime(t("placeholder.err.invalidInput"))
              setTime("")
            }
            setTime(value)
          }}
          placeholder="예시) 점심 이후 등"
          label="시간"
          heightLine={50}
          textError={errTime}
        />
        <View style={{ paddingBottom: 40 }} />
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    paddingHorizontal: paddingHorizontalScreen * 2,
    backgroundColor: colors.white,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.gray_G07,
  },
});
export default Step3;
