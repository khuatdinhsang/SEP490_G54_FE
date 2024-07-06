package com.smash_health.counter_step_module;

import android.app.ForegroundServiceStartNotAllowedException;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;

import com.smash_health.R;

public class CounterStepService extends Service {
    private final String CHANNEL_ID = "COUNTER_STEP";
    private final String CHANNEL_NAME = "COUNTER_STEP_NAME";
    private final String CHANNEL_DESCRIPTION = "COUNTER_STEP_DESCRIPTION";

    @Override
    public void onCreate() {
        this.createNotificationChannel();
        CounterStepBase.getInstance().init(this.getApplicationContext());
        CounterStepBase.getInstance().registerListener();
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        // Toast.makeText(this, "[ServiceStarting]", Toast.LENGTH_SHORT).show();
        this.startForeground();
        return START_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }

    @Override
    public void onDestroy() {
        CounterStepBase.getInstance().unregisterListener();
        Toast.makeText(this, "[ServiceDone]", Toast.LENGTH_SHORT).show();
    }

    private void startForeground() {
        try {
            Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                    .setSmallIcon(R.drawable.ic_android_black_24dp)
                    .setContentTitle("Ứng dụng sẽ hoạt động nền")
                    .setContentText("Đếm số bước chân của bạn ...")
                    .build();
            startForeground(1, notification);
        } catch (Exception e) {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S
                    && e instanceof ForegroundServiceStartNotAllowedException) {
            }
        }
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, importance);
            channel.setDescription(CHANNEL_DESCRIPTION);

            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }
}
