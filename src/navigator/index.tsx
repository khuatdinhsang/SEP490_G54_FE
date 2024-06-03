import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS_NAME, SCREENS_STACK } from './const';

const Stack = createStackNavigator();
const Navigator = () => {
    return (
        <Stack.Navigator initialRouteName={SCREENS_NAME.HOME.MAIN} screenOptions={{ headerShown: false }}>
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
