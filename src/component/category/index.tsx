import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import colors from '../../constant/color';
import { IMAGE } from '../../constant/image';
import { flexRow } from '../../styles/flex';
import { Switch } from 'react-native-switch';
interface CategoryComponentProps {
  text: string;
  handleOnPress: () => void;
  lang?: string | null,
  setLang?: (value: string) => void;
}

const CategoryComponent = (props: CategoryComponentProps) => {
  const { text, handleOnPress, lang, setLang } = props;
  const handleOnPressInner = () => {
    handleOnPress();
  };
  return (
    <Pressable onPress={handleOnPressInner} style={[styles.container, flexRow]}>
      <Text style={styles.text}>{text}</Text>
      {lang ?
        <View style={styles.iconRight} >
          <Switch
            value={lang === 'en' ? true : false}
            onValueChange={val => {
              if (setLang) {
                setLang(val ? 'en' : 'ko');
              }
            }}
            activeText={lang === 'en' ? 'KR' : 'EN'}
            inActiveText={lang === 'en' ? 'KR' : 'EN'}
            circleSize={30}
            circleBorderWidth={0}
            backgroundActive={colors.primary}
            backgroundInactive={colors.primary}
            circleActiveColor={colors.white}
            circleInActiveColor={colors.white}
            changeValueImmediately={true}
            switchLeftPx={10}
            switchRightPx={10}
          />
        </View>
        :
        <View style={styles.iconRight} >
          <Image source={IMAGE.ICON_ARROW_RIGHT_GRAY} style={styles.icon} />
        </View>
      }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 18,
  },
  text: {
    fontWeight: '500',
    fontSize: 18,
    lineHeight: 28,
    color: colors.black,
  },
  iconRight: {
    position: 'absolute',
    right: 0,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default CategoryComponent;
