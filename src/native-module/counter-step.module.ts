import ReactNative from 'react-native';

const {CounterStepModule} = ReactNative.NativeModules;
interface ICounterStepModule {
  init(): void;
  stepsSinceLastReboot(): number;
  setUserIdCounterStep(id: number): void;
}

export default CounterStepModule as ICounterStepModule;
