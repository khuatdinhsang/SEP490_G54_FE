package com.smash_health.counter_step_module;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class CounterStepModule extends ReactContextBaseJavaModule {
    public CounterStepModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "CounterStepModule";
    }

    @ReactMethod
    public void init() {
        Context context = this.getReactApplicationContext();
        Intent serviceIntent = new Intent(context, CounterStepService.class);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            Log.d("[StartService]", "O");
            context.startForegroundService(serviceIntent);
        } else {
            Log.d("[StartService]", "NOT O");
            context.startService(serviceIntent);
        }
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public int stepsSinceLastReboot() {
        int val = (int) CounterStepBase.getInstance().getStepsSinceLastReboot();
//        Log.d("[GetStepsSinceLastReboot]:", "" +val);
        return val;
    }

}
