import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../../../constant/color';
import {IMAGE} from '../../../constant/image';
import {flexRowCenter} from '../../../styles/flex';

interface GuideProps {
  title: string;
  description: string;
}

const GuideDown = ({title, description}: GuideProps) => {
  return (
    <View style={[flexRowCenter]}>
      <View style={guideStyles.container}>
        <View style={guideStyles.containerContent}>
          <Text style={guideStyles.textFirst}>{title}</Text>
          <Text style={guideStyles.textSecond}>{description}</Text>
        </View>
        <View style={[flexRowCenter]}>
          <Image
            source={IMAGE.HOME.GUIDE.POLYGON3}
            style={guideStyles.polygon}
          />
        </View>
      </View>
    </View>
  );
};

const guideStyles = StyleSheet.create({
  container: {
    zIndex: 10,
    position: 'absolute',
    top: -95,
  },
  containerContent: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 15,
  },
  textFirst: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
  },
  textSecond: {
    color: colors.black,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
  },
  polygon: {
    width: 12,
    height: 10,
  },
});

export default GuideDown;
