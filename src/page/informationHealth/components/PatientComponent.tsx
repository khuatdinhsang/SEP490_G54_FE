import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../../constant/color';
import { IMAGE } from '../../../constant/image';
import { flexCenter, flexRow } from '../../../styles/flex';

interface PatientComponentProps {
  height: number;
  content: string;
}
const PatientComponent = (props: PatientComponentProps) => {
  const { height, content } = props;
  return (
    <View style={[styles.container, { height }]}>
      <View style={[flexRow, { flex: 1 }]}>
        <Image source={IMAGE.INFORMATION_HEALTH.PATIENT} style={styles.image} />
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
          <Text style={[styles.text, { flex: 1 }]}>{content}</Text>
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
    color: colors.red,
    fontWeight: '500',
    lineHeight: 28,
    fontSize: 18,
    backgroundColor: '#FFF3F4',
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
export default PatientComponent;
