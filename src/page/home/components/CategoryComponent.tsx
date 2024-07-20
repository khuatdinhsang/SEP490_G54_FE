import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexRow, flexRowSpaceAround } from '../../../styles/flex';
import Guide from './GuideDown';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SCREENS_NAME } from '../../../navigator/const';

interface CategoryProps {
  guide: boolean;
}

const CategoryComponent = ({ guide }: CategoryProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <View style={styles.container}>
      <View style={flexRow}>
        <Image source={IMAGE.HOME.CATEGORY} style={styles.unitIcon} />
        <Text style={styles.unitTitle}>카테고리</Text>
      </View>
      <View style={[guide ? styles.specialCategory : {}]}>
        {guide && (
          <Guide
            title={'카테고리'}
            description={'사용자님이 주로 사용하실 메뉴를 보여줍니다.'}
          />
        )}
        <View style={[flexRowSpaceAround, styles.categoryItemRow]}>
          <Pressable
            onPress={() => navigation.navigate(SCREENS_NAME.PLAN_MANAGEMENT.MAIN_INDEX)}
          >
            <Image
              source={IMAGE.HOME.CATEGORY1}
              style={styles.categoryItemIcon}
            />
            <Text style={styles.categoryItemText}>실천계획 관리</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(SCREENS_NAME.RECORD_HEALTH_DATA.MAIN_INDEX)}
          >
            <Image
              source={IMAGE.HOME.CATEGORY2}
              style={styles.categoryItemIcon}
            />
            <Text style={styles.categoryItemText}>건강수치 기록</Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate(SCREENS_NAME.EVALUATE.WEEKLY)}
          >
            <Image
              source={IMAGE.HOME.CATEGORY3}
              style={styles.categoryItemIcon}
            />
            <Text style={styles.categoryItemText}>평가/결과 보기</Text>
          </Pressable>
        </View>
        <View style={[flexRowSpaceAround, styles.categoryItemRow]}>
          <View>
            <Image
              source={IMAGE.HOME.CATEGORY4}
              style={styles.categoryItemIcon}
            />
            <Text style={styles.categoryItemText}>건강정보 학습</Text>
          </View>
          <View>
            <Pressable onPress={() => navigation.navigate(SCREENS_NAME.QUESTION.MAIN)}>
              <Image
                source={IMAGE.HOME.CATEGORY5}
                style={styles.categoryItemIcon}
              />
            </Pressable>
            <Text style={styles.categoryItemText}>문의작성</Text>


          </View>
          <Pressable onPress={() => { navigation.navigate(SCREENS_NAME.PROFILE.MAKE_HOSPITAL_SCHEDULE) }}>
            <Image
              source={IMAGE.HOME.CATEGORY6}
              style={styles.categoryItemIcon}
            />
            <Text style={styles.categoryItemText}>병원일정 설정</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  unitTitle: {
    marginLeft: 2,
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
  },
  unitIcon: {
    width: 20,
    height: 20,
  },
  categoryItemRow: {
    marginVertical: 10,
  },
  categoryItemIcon: {
    marginBottom: 10,
    width: 90,
    height: 90,
  },
  categoryItemText: {
    textAlign: 'center',
    color: colors.black,
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 24,
  },
  specialCategory: {
    backgroundColor: colors.white,
    zIndex: 10,
    borderRadius: 15,
  },
});

export default CategoryComponent;
