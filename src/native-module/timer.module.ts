import ReactNative from 'react-native';

const {TimerModule} = ReactNative.NativeModules;

export class TimerItem {
  id: string;
  hour: number;
  minute: number;
  daysOfWeek: number[];
  title: string;
  description: string;

  constructor(
    id: string,
    hour: number,
    minute: number,
    daysOfWeek: number[],
    title: string,
    description: string,
  ) {
    this.id = id;
    this.hour = hour;
    this.minute = minute;
    this.daysOfWeek = daysOfWeek;
    this.title = title;
    this.description = description;
  }
}

interface ITimerModule {
  createSchedule(time: TimerItem): void;
  cancelSchedule(time: TimerItem): void;
}

export default TimerModule as ITimerModule;
