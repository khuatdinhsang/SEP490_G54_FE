import {View} from 'react-native';
import HeaderNavigatorComponent from '../../component/header-navigator';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const InformationHealth = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View>
      <HeaderNavigatorComponent
        isIconLeft={true}
        text="설정"
        handleClickArrowLeft={() => {
          navigation.goBack();
        }}
      />
    </View>
  );
};
export default InformationHealth;
