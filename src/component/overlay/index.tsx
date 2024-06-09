import React from 'react';
import { StyleSheet, View } from 'react-native';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import colors from '../../constant/color';

interface OverlayProps {
  visible: boolean;
}
const Overlay = ({ visible }: OverlayProps) => {
  if (visible) {
    return <View style={styles.container}></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: WidthDevice,
    backgroundColor: colors.black,
    opacity: 0.7,
    zIndex: 5,
    top: 0,
  },
});

export default Overlay;
