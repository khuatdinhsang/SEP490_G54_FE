import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS_NAME, SCREENS_STACK } from './const';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../component/loading';
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
const Stack = createStackNavigator();
const isTokenExpired = (token: string) => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    if (decodedToken.exp * 1000 < Date.now()) {
      return true;
    }
    return false;
  } catch (error) {
    return true;
  }
};
const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(SCREENS_NAME.LOGIN.MAIN);
  // useResetScreenAtStartOfWeek()
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      token && !isTokenExpired(token)
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
