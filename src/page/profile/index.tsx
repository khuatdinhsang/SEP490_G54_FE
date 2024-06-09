import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {paddingHorizontalScreen} from '../../styles/padding';
import {HeightDevice} from '../../util/Dimenssion';
import colors from '../../constant/color';
import HeaderNavigatorComponent from '../../component/header-navigator';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {IMAGE} from '../../constant/image';
import {
  flexCenter,
  flexRow,
  flexRowCenter,
  flexRowSpaceAround,
  flexRowSpaceBetween,
  flexRowSpaceEvenly,
} from '../../styles/flex';
import CategoryComponent from '../../component/category';
import {SCREENS_NAME} from '../../navigator/const';

const Profile = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleMyHealthMissionStatement = () => {};

  const handleClinicalSurvey = () => {};

  const handleMakeHospitalSchedule = () => {
    navigation.navigate(SCREENS_NAME.PROFILE.MAKE_HOSPITAL_SCHEDULE);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <HeaderNavigatorComponent
          text="내정보"
          handleClickArrowLeft={() => {
            navigation.goBack();
          }}
        />
        <View style={{marginTop: 20}} />
        <View style={[flexRow]}>
          <Image source={IMAGE.HOME.SIDEBAR.프로필이미지} />
          <Text style={styles.textName}>프로필이미지</Text>
        </View>
        <Text style={styles.labelSection}>나의 생체 데이터</Text>
        <View style={[styles.sectionContainer, flexRowSpaceBetween]}>
          <View style={flexCenter}>
            <Text style={styles.nameSection}>키</Text>
            <Text style={styles.valueSection}>170cm</Text>
          </View>
          <View style={flexCenter}>
            <Text style={styles.nameSection}>몸무게</Text>
            <Text style={styles.valueSection}>60kg</Text>
          </View>
          <View style={flexCenter}>
            <Text style={styles.nameSection}>암종</Text>
            <Text style={styles.valueSection}>대장암</Text>
          </View>
          <View style={flexCenter}>
            <Text style={styles.nameSection}>만성질환</Text>
            <Text style={styles.valueSection}>고혈압</Text>
          </View>
        </View>
        <View style={styles.divide} />
        <View>
          <CategoryComponent
            text="나의 건강사명서"
            handleOnPress={handleMyHealthMissionStatement}
          />
          <CategoryComponent
            text="임상설문"
            handleOnPress={handleClinicalSurvey}
          />
          <CategoryComponent
            text="병원일정정하기"
            handleOnPress={handleMakeHospitalSchedule}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: paddingHorizontalScreen * 2,
    height: HeightDevice,
  },
  name: {},
  textName: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
    marginLeft: 12,
  },
  labelSection: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray_G07,
    marginTop: 16,
    marginBottom: 12,
  },
  sectionContainer: {
    backgroundColor: colors.gray_G01,
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
  nameSection: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 20,
    color: colors.gray_G07,
    marginBottom: 4,
  },
  valueSection: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },
  divide: {
    height: 8,
    backgroundColor: colors.gray_G01,
    marginVertical: 24,
  },
});

export default Profile;
