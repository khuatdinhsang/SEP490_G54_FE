import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../component/loading';
import { SCREENS_NAME, SCREENS_STACK } from './const';
import { NavigationContainer } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import { authService } from '../services/auth';

const Stack = createStackNavigator();

const Navigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(SCREENS_NAME.LOGIN.MAIN);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decoded: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp < currentTime;
    } catch (error) {
      return true;
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken') ?? "";
      if (accessToken) {
        if (isTokenExpired(accessToken)) {
          try {
            const response = await authService.refreshToken(refreshToken, accessToken);
            if (response.data.code === 200) {
              const newAccessToken = response.data.result.accessToken;
              const newRefreshToken = response.data.result.refreshToken
              await AsyncStorage.setItem('accessToken', newAccessToken);
              await AsyncStorage.setItem('refreshToken', newRefreshToken);
              setInitialRoute(SCREENS_NAME.HOME.MAIN);
            }
          }
          catch (err) {
            setInitialRoute(SCREENS_NAME.LOGIN.MAIN);
          }
        } else {
          setInitialRoute(SCREENS_NAME.HOME.MAIN);
        }
      } else {
        setInitialRoute(SCREENS_NAME.LOGIN.MAIN);
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
