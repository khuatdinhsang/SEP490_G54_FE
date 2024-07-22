package com.smash_health.counter_step_module;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import com.smash_health.helper.ApiHelper;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


public class CounterStepReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (Intent.ACTION_BOOT_COMPLETED.equals(action)) {
            Log.d("[CounterStep]", "ActonBootCompleted");
            CounterStepBase.getInstance().initLastStateWhenActionBootCompleted();
            CounterStepBase.getInstance().createScheduleJob(context);
        }
        else {
            Log.d("[CounterStep]", "ScheduleJob");
            // Call api tới server
            new Thread(() -> {
                try {
                    CounterStepBase.getInstance().init(context);
                    Log.d("[CounterStep]", "ScheduleJob--NewThread");

                    // Get userId
                    long userId = CounterStepBase.getInstance().getUseridCounterStep();
                    if(userId != -1) {
                        String date = this.getCurrentDateFormatted();
                        long actualValue = CounterStepBase.getInstance().sumCounterStep.getLong(CounterStepBase.getInstance().sumCounterStepKey, 0);
                        Log.d("[CounterStep]", userId + " - " + date + " - " + actualValue);
                        boolean status = ApiHelper.sendRequestCounterStep(userId, date, actualValue);
                        if(status) {
                            // Call api thành công reset bước chân về 0
                            CounterStepBase.getInstance().resetSumCounterStep();
                        }
                    }
                }
                catch (Exception e) {
                    e.printStackTrace();
                    Log.e("[CounterStep]", "Error: " + e.getMessage());
                }
            }).start();
            // Tạo lại job sau khi gửi xong dù kết quả là gì
            CounterStepBase.getInstance().createScheduleJob(context);
        }
    }

    private String getCurrentDateFormatted() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(new Date());
    }
}
