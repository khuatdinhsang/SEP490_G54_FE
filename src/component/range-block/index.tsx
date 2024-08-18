import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import { flexCenter, flexRowCenter } from '../../styles/flex';

const ratio = 140 / 300;

interface RangeBlockProps {
  value?: number;
  minValue?: number;
  maxValue?: number;
}

const RangeBlock = (props: RangeBlockProps) => {
  const { value, minValue = 0, maxValue = 100 } = props;
  const [dynamicWidth, setDynamicWidth] = useState<number>(0);
  const [textWidth, setTextWidth] = useState<number>(0);
  const [rangeWidth, setRangeWidth] = useState<number>(0);
  const [spaceFromStart, setSpaceFromStart] = useState<number>(0);

  useEffect(() => {
    if (dynamicWidth > 0) {
      setRangeWidth(dynamicWidth * ratio);
    }
  }, [dynamicWidth]);

  useEffect(() => {
    if (rangeWidth > 0 && textWidth > 0 && minValue !== undefined && maxValue !== undefined && value !== undefined) {
      const range = maxValue - minValue;
      const adjustedValue = Math.max(minValue, Math.min(value, maxValue));
      const percentage = (adjustedValue - minValue) / range;
      const calculatedSpaceFromStart = percentage * rangeWidth;
      setSpaceFromStart(calculatedSpaceFromStart - textWidth / 2);
    }
  }, [rangeWidth, value, textWidth, minValue, maxValue]);

  return (
    <View
      style={[styles.contain, flexRowCenter]}
      onLayout={event => {
        const { width } = event.nativeEvent.layout;
        setDynamicWidth(width);
      }}>
      <View style={[styles.rangeWrapper, { width: rangeWidth }]}>
        <Text style={styles.textLeft}>{minValue}</Text>
        <Text style={styles.textRight}>{maxValue}</Text>
        <View
          style={[styles.textMainWrapper, flexCenter, { left: spaceFromStart }]}>
          <Text
            style={[styles.textMain]}
            numberOfLines={1}
            onLayout={event => {
              const { width } = event.nativeEvent.layout;
              setTextWidth(width);
            }}>
            {value ?? '?'}
          </Text>
          <Image source={IMAGE.POLYGON3} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contain: {
    height: 10,
    backgroundColor: colors.gray_G03,
    borderRadius: 8,
  },
  rangeWrapper: {
    position: 'absolute',
    top: 0,
    height: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
  },
  textLeft: {
    position: 'absolute',
    left: 0,
    top: 10,
    color: colors.gray_G05,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  textRight: {
    position: 'absolute',
    right: 0,
    top: 10,
    color: colors.gray_G05,
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
  },
  textMainWrapper: {
    position: 'absolute',
    bottom: 15,
  },
  textMain: {
    color: colors.white,
    backgroundColor: colors.gray_G07,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 99,
    bottom: -1
  },
});

export default RangeBlock;
