package com.smash_health;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.smash_health.counter_step_module.CounterStepModule;
import com.smash_health.modulenative.NotificationModule;
import com.smash_health.timer_module.ScheduleAlarmModule;
import com.smash_health.language.LanguageModule;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class MyAppPackage implements ReactPackage {
    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<NativeModule> createNativeModules(
            ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();

        modules.add(new CounterStepModule(reactContext));
        modules.add(new ScheduleAlarmModule(reactContext));
        modules.add(new NotificationModule(reactContext));
        modules.add(new LanguageModule(reactContext));
        return modules;
    }
}
