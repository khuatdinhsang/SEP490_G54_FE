import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS_NAME, SCREENS_STACK } from './const';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../component/loading';
import { NavigationContainer, ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { jwtDecode } from 'jwt-decode';

const Stack = createStackNavigator();

const isTokenExpired = (token: string) => {
  try {
    const decodedToken: { exp: number } = jwtDecode(token);
    console.log("15", decodedToken.exp * 1000);
    console.log("d", Date.now());
    return decodedToken.exp * 1000 < Date.now();
  } catch (error) {
    return true;
  }
};

const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(SCREENS_NAME.LOGIN.MAIN);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        setInitialRoute(SCREENS_NAME.HOME.MAIN);
      }
      setIsLoading(false);
    };

    checkToken();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
