import {createStackNavigator} from '@react-navigation/stack';
import {SCREENS_NAME, SCREENS_STACK} from './const';
import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../component/loading';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const Stack = createStackNavigator();
const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(SCREENS_NAME.LOGIN.MAIN);
  // useResetScreenAtStartOfWeek()
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      token
        ? setInitialRoute(SCREENS_NAME.HOME.MAIN)
        : setInitialRoute(SCREENS_NAME.LOGIN.MAIN);
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }
  //  initialRouteName={initialRoute}
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      {SCREENS_STACK.map(screen => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
        />
      ))}
    </Stack.Navigator>
  );
};
export default Navigator;
