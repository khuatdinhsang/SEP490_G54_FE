import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../../../constant/color';
import {IMAGE} from '../../../constant/image';
import {flexCenter, flexRow} from '../../../styles/flex';

interface DoctorComponentProps {
  height: number;
  content: string;
}
const DoctorComponent = (props: DoctorComponentProps) => {
  const {height, content} = props;
  return (
    <View style={[styles.container, {height}]}>
      <View style={[flexRow, {flex: 1}]}>
        <Image
          source={IMAGE.INFORMATION_HEALTH.ICON_DOCTOR}
          style={styles.image}
        />
        <View
          style={[
            flexRow,
            {
              flex: 1,
            },
          ]}>
          <View style={[flexCenter]}>
            <Image
              source={IMAGE.INFORMATION_HEALTH.POLYGON_LEFT}
              style={styles.polygonLeft}
            />
          </View>
          <Text style={[styles.text]}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  image: {
    marginRight: 8,
  },
  text: {
    color: colors.blue_01,
    fontWeight: '500',
    lineHeight: 28,
    fontSize: 18,
    backgroundColor: '#F5F5FF',
    paddingVertical: 14,
    paddingLeft: 12,
    borderRadius: 16,
    height: '100%',
    paddingRight: 16,
  },
  polygonLeft: {
    width: 14,
    height: 14,
  },
});
export default DoctorComponent;
