import {StyleProp, ViewStyle} from 'react-native';

export const flexRow: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};
export const flexRowCenter: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
};
export const flexRowSpaceBetween: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
export const flexRowSpaceAround: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
};
export const flexRowSpaceEvenly: StyleProp<ViewStyle> = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
};
export const flexCenter: StyleProp<ViewStyle> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
