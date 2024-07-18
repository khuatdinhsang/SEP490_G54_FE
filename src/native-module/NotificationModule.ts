import {NativeModules} from 'react-native';
const {NotificationModule} = NativeModules;

interface NotificationModuleInterface {
  onPress(title: string, description: string): void;
}
export default NotificationModule as NotificationModuleInterface;
