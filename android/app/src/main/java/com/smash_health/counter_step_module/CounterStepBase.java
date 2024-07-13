package com.smash_health.counter_step_module;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.os.SystemClock;
import android.util.Log;

import com.smash_health.timer_module.AlarmReceiver;

import java.text.SimpleDateFormat;
import java.util.Date;

public class CounterStepBase {
    private final String TAG = "STEP_COUNT_LISTENER";
    private SensorManager sensorManager;
    private Sensor sensor;
    private SensorEventListener listener;
    private long stepsSinceLastReboot;
    private static CounterStepBase counterStepBase = null;

    public SharedPreferences lastCounterStep, sumCounterStep, dayState;
    public String
            // Lưu lại bước chân cuối cùng lần trước để lần sau cộng độ hiệu chênh lệch vào tổng
            lastCounterStepKey = "lastCounterStepKey",
            // Lưu lại tổng chênh lệch bước chân trong ngày,
                // nếu call api thành công thì sẽ reset về 0
                // call nhiều lần trong ngày để dữ liệu không bị mất mát
            sumCounterStepKey = "sumCounterStepKey",
            // Lưu lại ngày của sumCounterStep,
                // nếu sang ngày mới thì sẽ reset sum về 0, đặt lại dayState
            dayStateKey = "dayStateKey";
    private SharedPreferences userId;
    private String userIdKey = "userIdKey";

    public void init(Context context) {
        sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        initListener();
        this.initSharedPreferences(context);
    }

    public void initSharedPreferences(Context context) {
        lastCounterStep = context.getSharedPreferences(lastCounterStepKey, Context.MODE_PRIVATE);
        sumCounterStep = context.getSharedPreferences(sumCounterStepKey, Context.MODE_PRIVATE);
        dayState = context.getSharedPreferences(dayStateKey, Context.MODE_PRIVATE);
        userId = context.getSharedPreferences(userIdKey, Context.MODE_PRIVATE);
    }
    private CounterStepBase() {

    }

    public static CounterStepBase getInstance() {
        if (counterStepBase == null) {
            counterStepBase = new CounterStepBase();
        }
        return counterStepBase;
    }

    private void initListener() {
        listener = new SensorEventListener() {
            @Override
            public void onSensorChanged(SensorEvent event) {
                if (event == null) return;
                stepsSinceLastReboot = (long) event.values[0];
                calculateCounterStep(stepsSinceLastReboot);
            }
            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {
                Log.d(TAG, "[AccuracyChangedTo]: " + accuracy);
            }
        };
        Log.d(TAG,"[SensorListenerRegistered]");
    }

    public void registerListener() {
        if (sensor != null) {
            boolean supportedAndEnabled = sensorManager.registerListener(listener, sensor, SensorManager.SENSOR_DELAY_UI);
            Log.d(TAG, "[SensorListenerRegistered]");
        }
    }

    public void unregisterListener() {
        sensorManager.unregisterListener(listener);
        Log.d(TAG, "[SensorListenerUnregistered]");
    }

    public long getStepsSinceLastReboot() {
//        return stepsSinceLastReboot;
        // Không lấy số bước chân từ lần khởi động gần nhất
        // Lấy tổng số bước chân đã tính được lưu ở [local] + [server-api]

        // Kiểm tra xem sum có phải của ngày hôm nay không, nếu không phải reset về 0
        String lastDate = dayState.getString(dayStateKey, "");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String currentDate = sdf.format(new Date());

        if (!currentDate.equals(lastDate)) {
            SharedPreferences.Editor editor = sumCounterStep.edit();
            editor.putLong(sumCounterStepKey, 0);
            editor.commit();

            SharedPreferences.Editor editorDayState = dayState.edit();
            editorDayState.putString(dayStateKey, currentDate);
            editorDayState.commit();

            return 0;
        }
        return this.sumCounterStep.getLong(sumCounterStepKey, 0);
    }

    public void initLastStateWhenActionBootCompleted() {
        // InitialValue CounterStep:
        SharedPreferences.Editor editor = this.lastCounterStep.edit();
        editor.putLong(lastCounterStepKey, this.stepsSinceLastReboot);
    }

    private void calculateCounterStep(long curState) {
        // Kiểm tra xem sum có phải của ngày hôm nay không, nếu không phải reset về 0
        String lastDate = dayState.getString(dayStateKey, "");
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String currentDate = sdf.format(new Date());

        if (!currentDate.equals(lastDate)) {
            SharedPreferences.Editor editor = sumCounterStep.edit();
            editor.putLong(sumCounterStepKey, 0);
            editor.commit();

            SharedPreferences.Editor editorDayState = dayState.edit();
            editorDayState.putString(dayStateKey, currentDate);
            editorDayState.commit();
        }

        // Get last state step:
        Long lastState = lastCounterStep.getLong(lastCounterStepKey, -1);
        // Nếu Value = -1 => First goto app
        if (lastState != -1) {
            long sumCounter = sumCounterStep.getLong(sumCounterStepKey, 0);
            long changeState = curState - lastState;

            if(changeState > 0) {
                sumCounter += (curState - lastState);
                // Edit lại sum counter
                SharedPreferences.Editor editorTotalCounterStep = sumCounterStep.edit();
                editorTotalCounterStep.putLong(sumCounterStepKey, sumCounter);
                editorTotalCounterStep.commit();
            }
        }
        SharedPreferences.Editor editor = lastCounterStep.edit();
        editor.putLong(lastCounterStepKey, curState);
        editor.commit();
    }

    public void createScheduleJob(Context context) {
        Log.d("[CounterStep]", "CreateScheduleJob");
        String id = "create-schedule-job";
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        Intent intent = new Intent(context, CounterStepReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(context, id.hashCode(), intent, PendingIntent.FLAG_UPDATE_CURRENT);

        // Đặt alarm mỗi 1 phút (60 * 1000 milliseconds)
        long intervalMillis = 60 * 1000;
        long triggerAtMillis = SystemClock.elapsedRealtime() + intervalMillis;
        alarmManager.setExactAndAllowWhileIdle(AlarmManager.ELAPSED_REALTIME_WAKEUP, triggerAtMillis, pendingIntent);
    }

    public void resetSumCounterStep() {
        SharedPreferences.Editor editor = sumCounterStep.edit();
        editor.putLong(sumCounterStepKey, 0);
        editor.commit();
    }

    public long getUseridCounterStep() {
        long id = this.userId.getLong(userIdKey, -1);
        return id;
    }

    public void setUserIdCounterStep(Integer id) {
        SharedPreferences.Editor editor = userId.edit();
        editor.putLong(userIdKey, id.longValue());
        editor.commit();
        return;
    }
}


