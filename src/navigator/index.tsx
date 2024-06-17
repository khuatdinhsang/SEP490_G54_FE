import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS_NAME, SCREENS_STACK } from './const';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../component/loading';

const Stack = createStackNavigator();
const Navigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState(SCREENS_NAME.LOGIN.MAIN);

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
    <Stack.Navigator initialRouteName={SCREENS_NAME.RECORD_HEALTH_DATA.NUMBER_STEPS_CHART} screenOptions={{ headerShown: false }}>
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
