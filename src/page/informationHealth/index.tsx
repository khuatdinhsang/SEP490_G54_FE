import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {paddingHorizontalScreen} from '../../styles/padding';
import {HeightDevice} from '../../util/Dimenssion';
import colors from '../../constant/color';
import WeekComponent from './components/WeekComponent';
import {
  flexCenter,
  flexRowCenter,
  flexRowSpaceAround,
  flexRowSpaceEvenly,
} from '../../styles/flex';
import {IMAGE} from '../../constant/image';
import {SCREENS_NAME} from '../../navigator/const';

const InformationHealth = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
      <WeekComponent />
      <View style={{marginTop: 28}} />
      <View style={[flexRowCenter]}>
        <Text style={styles.title}>건강경영전략에 대해 학습해봅시다</Text>
      </View>
      <View style={{marginTop: 24}} />
      <View style={[flexRowSpaceEvenly]}>
        <Pressable
          style={[flexCenter]}
          onPress={() =>
            navigation.navigate(SCREENS_NAME.INFORMATION_HEALTH.WEEK1DAY1)
          }>
          <Image source={IMAGE.HOME.INFORMATION_HEALTH} />
          <Text style={styles.textDay}>1일차</Text>
        </Pressable>
        <View style={[flexCenter]}>
          <Image source={IMAGE.HOME.INFORMATION_HEALTH} />
          <Text style={styles.textDay}>2일차</Text>
        </View>
        <View style={[flexCenter]}>
          <Image source={IMAGE.HOME.INFORMATION_HEALTH} />
          <Text style={styles.textDay}>3일차</Text>
        </View>
      </View>
      <View style={{marginTop: 28}} />
      <View style={[flexRowSpaceEvenly]}>
        <Pressable style={[flexCenter]}>
          <Image source={IMAGE.HOME.INFORMATION_HEALTH} />
          <Text style={styles.textDay}>4일차</Text>
        </Pressable>
        <View style={[flexCenter]}>
          <Image source={IMAGE.HOME.INFORMATION_HEALTH} />
          <Text style={styles.textDay}>5일차</Text>
        </View>
        <View style={[flexCenter]}>
          <Image source={IMAGE.HOME.INFORMATION_HEALTH} />
          <Text style={styles.textDay}>6일차</Text>
        </View>
      </View>
      <View style={{marginTop: 28}} />
      <View style={{flexDirection: 'row', marginLeft: 40}}>
        <View style={[flexCenter]}>
          <Image source={IMAGE.HOME.INFORMATION_HEALTH} />
          <Text style={styles.textDay}>7일차</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen * 2,
    height: HeightDevice,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
  },
  textDay: {
    marginTop: 10,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
});

export default InformationHealth;
