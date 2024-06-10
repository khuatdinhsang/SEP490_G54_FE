package com.smash_health.counter_step_module;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.Log;

public class CounterStepBase {
    private final String TAG = "STEP_COUNT_LISTENER";
    private SensorManager sensorManager;
    private Sensor sensor;
    private SensorEventListener listener;
    private long stepsSinceLastReboot;
    private static CounterStepBase counterStepBase = null;

    public void init(Context context) {
        sensorManager = (SensorManager) context.getSystemService(Context.SENSOR_SERVICE);
        sensor = sensorManager.getDefaultSensor(Sensor.TYPE_STEP_COUNTER);
        initListener();
    }

    private CounterStepBase() {

    }

    public static CounterStepBase getInstance() {
        if(counterStepBase == null) {
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
                Log.d(TAG, "[StepSinceLastReboot]: " + stepsSinceLastReboot);
            }
            @Override
            public void onAccuracyChanged(Sensor sensor, int accuracy) {
                Log.d(TAG, "[AccuracyChangedTo]: " + accuracy);
            }
        };
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
        return stepsSinceLastReboot;
    }
}
