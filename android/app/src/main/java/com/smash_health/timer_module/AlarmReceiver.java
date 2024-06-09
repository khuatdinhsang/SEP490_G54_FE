package com.smash_health.timer_module;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.core.app.NotificationCompat;

import com.smash_health.R;

import java.util.Date;

public class AlarmReceiver extends BroadcastReceiver {
    private final String CHANNEL_ID = "ALARM_RECEIVER_ID";
    private final String CHANNEL_NAME = "ALARM_RECEIVER_NAME";
    private final String CHANNEL_DESCRIPTION = "ALARM_RECEIVER_DESCRIPTION";

    @Override
    public void onReceive(Context context, Intent intent) {

        String CHANNEL_ID = "ALARM_RECEIVER_CHANNEL_ID";
        String CHANNEL_NAME = "ALARM_RECEIVER_CHANNEL_NAME";
        String CHANNEL_DESCRIPTION = "ALARM_RECEIVER_CHANNEL_DESCRIPTION";

        if(intent == null) {
            return;
        }

        String id = intent.getStringExtra(AlarmItem.AlarmIDKey);
        String title = intent.getStringExtra("title");
        String description = intent.getStringExtra("description");

        this.createNotificationChannel(context);
        this.createNotificationMessage(context, title, description);

    }

    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            int importance = NotificationManager.IMPORTANCE_DEFAULT;
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME, importance);
            channel.setDescription(CHANNEL_DESCRIPTION);

            NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

    private void createNotificationMessage(Context context, String contentTitle, String contentText) {
        Notification notification =
                new NotificationCompat.Builder(context, CHANNEL_ID)
                        .setSmallIcon(R.drawable.ic_android_black_24dp)
                        .setContentTitle(contentTitle)
                        .setContentText(contentText)
                        .build();

        NotificationManager notificationManager = context.getSystemService(NotificationManager.class);
        notificationManager.notify((int) new Date().getTime(), notification);
    }
}
