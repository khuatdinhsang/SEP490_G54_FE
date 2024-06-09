package com.smash_health.timer_module;

import android.app.AlarmManager;
import android.content.Context;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;

import java.util.ArrayList;

public class ScheduleAlarmModule extends ReactContextBaseJavaModule {
    private AlarmManager alarmMgr;

    public ScheduleAlarmModule(ReactApplicationContext context) {
        super(context);
        this.alarmMgr = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
     }

    @Override
    public String getName() {
        return "TimerModule";
    }

    @ReactMethod
    public void createSchedule(ReadableMap alarmData) {
        AlarmManagerBase.createScheduleAlarm(this.getReactApplicationContext(),
                this.alarmMgr,
                this.createAlarmItem(alarmData));
    }

    @ReactMethod
    public void cancelSchedule(ReadableMap alarmData) {
        String id = alarmData.getString("id");

        AlarmManagerBase.cancelSchedule(this.getReactApplicationContext(),
                this.alarmMgr,
                new AlarmItem(id));
    }

    private AlarmItem createAlarmItem(ReadableMap alarmData) {
        String id = alarmData.getString("id");
        int hour = alarmData.getInt("hour");
        int minute = alarmData.getInt("minute");
        ReadableArray daysOfWeek = alarmData.getArray("daysOfWeek");
        String title = alarmData.getString("title");
        String description = alarmData.getString("description");

        ArrayList<Integer> daysOfWeekList = new ArrayList<>();
        for (int i = 0; i < daysOfWeek.size(); i++) {
            daysOfWeekList.add(daysOfWeek.getInt(i));
        }
        return new AlarmItem(id, hour, minute, daysOfWeekList, title, description);
    }
}
