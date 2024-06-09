import { Image, ImageSourcePropType, StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';
import colors from '../../constant/color';
import { flexRowCenter, flexRowSpaceBetween } from '../../styles/flex';
import { HeightDevice, WidthDevice } from '../../util/Dimenssion';
import ButtonComponent from '../button';
import Overlay from '../overlay';

interface DialogSingleProps {
  isOverlay: boolean; // true: background mau den
  isActive: boolean;
  title: string;
  content?: string;
  buttonText?: string;
  handleClickButton?: () => void;
  imageSource: ImageSourcePropType;
  btnDelete?: boolean
  textButtonCancel?: string
  textButtonConfirm?: string
  handleClickButtonCancel?: () => void;
  handleClickButtonConfirm?: (id: number) => void;
  itemSelected?: number;
}

const
  DialogSingleComponent = (props: DialogSingleProps) => {
    const {
      title,
      content,
      buttonText,
      handleClickButton,
      isOverlay,
      imageSource,
      isActive,
      btnDelete,
      textButtonCancel,
      textButtonConfirm,
      handleClickButtonCancel,
      handleClickButtonConfirm,
      itemSelected,
    } = props;

    const handleClickButtonInternal = (): void => {
      if (handleClickButton) {
        handleClickButton();
      }
    };
    const handleClickButtonLeft = (): void => {
      if (handleClickButtonCancel) {
        handleClickButtonCancel()
      }
    }
    const handleClickButtonRight = (): void => {
      if (handleClickButtonConfirm && itemSelected) {
        handleClickButtonConfirm(itemSelected)
      }
    }
    if (!isActive) {
      return null;
    }
    return (
      <View style={[styles.container, flexRowCenter]}>
        <View style={styles.body}>
          <View style={flexRowCenter}>
            <Image source={imageSource} />
          </View>
          <View style={{ marginBottom: 12 }} />
          <Text style={styles.title}>{title}</Text>
          <View style={{ marginBottom: 6 }} />
          {content && <View>
            <Text style={styles.content}>{content}</Text>
            <View style={{ marginBottom: 20 }} />
          </View>
          }
          {btnDelete ?
            <View style={[flexRowSpaceBetween, { paddingHorizontal: 30, }]}>
              <ButtonComponent
                text={textButtonCancel}
                handleClick={handleClickButtonLeft}
                backgroundColor={colors.gray_G02}
                textColor={colors.gray_G06}
                style={{ width: '48%' }}
              />
              <ButtonComponent
                text={textButtonConfirm}
                handleClick={handleClickButtonRight}
                style={{ width: '48%' }}
              />
            </View>
            :
            <ButtonComponent
              text={buttonText}
              handleClick={handleClickButtonInternal}
              style={styles.button}
            />
          }
        </View>
        {isOverlay && <Overlay visible={true} />}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    height: HeightDevice,
    width: WidthDevice,
    position: 'absolute',
    top: 0,
  },
  body: {
    backgroundColor: colors.white,
    zIndex: 10,
    paddingVertical: 20,
    paddingHorizontal: 0,
    width: WidthDevice - 20 * 2,
    borderRadius: 16,
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    lineHeight: 28,
    color: colors.black,
    textAlign: 'center',
  },
  content: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: colors.gray_G07,
    textAlign: 'center',
  },
  button: {
    marginHorizontal: 60,
  },
});
export default DialogSingleComponent;
