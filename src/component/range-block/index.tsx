import {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import colors from '../../constant/color';
import {IMAGE} from '../../constant/image';
import {flexCenter, flexRowCenter} from '../../styles/flex';

const ratio = 140 / 300;
const midPoint = 85;
interface RangeBlockProps {
  value?: number;
}

const RangeBlock = (props: RangeBlockProps) => {
  const {value} = props;
  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>();
  const [textWidth, setTextWidth] = useState<number | undefined>();
  const [rangeWidth, setRangeWidth] = useState<number>(0);
  const [spaceFromMid, setSpaceFromMid] = useState<number>(0);

  useEffect(() => {
    if (dynamicWidth) {
      const okRangeWidth = dynamicWidth * ratio;
      setRangeWidth(okRangeWidth);
    }
  }, [dynamicWidth]);

  useEffect(() => {
    if (rangeWidth && textWidth) {
      if (!value) {
        setSpaceFromMid(0);
        return;
      }
      const spacePerUnit = rangeWidth / 30;
      const spaceFromMid =
        (value - midPoint) * spacePerUnit + rangeWidth / 2 - textWidth / 2;
      setSpaceFromMid(spaceFromMid);
    }
  }, [rangeWidth, value, textWidth]);

  return (
    <View
      style={[styles.contain, flexRowCenter]}
      onLayout={event => {
        const {x, y, width, height} = event.nativeEvent.layout;
        setDynamicWidth(width);
      }}>
      <View style={[styles.rangeWrapper, {width: rangeWidth}]}>
        <Text style={styles.textLeft}>70</Text>
        <Text style={styles.textRight}>100</Text>
        <View
          style={[styles.textMainWrapper, flexCenter, {left: spaceFromMid}]}>
          <Text
            style={[styles.textMain]}
            numberOfLines={1}
            onLayout={event => {
              const {x, y, width, height} = event.nativeEvent.layout;
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
    backgroundColor: colors.black,
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 99,
  },
});
export default RangeBlock;
