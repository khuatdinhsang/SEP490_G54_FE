import ReactNative from 'react-native';

const {CounterStepModule} = ReactNative.NativeModules;
interface ICounterStepModule {
  init(): void;
  stepsSinceLastReboot(): number;
}

export default CounterStepModule as ICounterStepModule;
