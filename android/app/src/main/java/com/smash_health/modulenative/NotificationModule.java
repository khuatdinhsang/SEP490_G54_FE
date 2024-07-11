package com.smash_health.modulenative;
import android.Manifest;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ContentResolver;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.smash_health.R;
import android.os.Bundle;
import java.util.Date;

public class NotificationModule extends ReactContextBaseJavaModule {
    private String CHANNEL_ID = "CHANNEL_ID";
    private String CHANNEL_NAME = "CHANNEL_NAME";
    private String CHANNEL_DESCRIPTION = "CHANNEL_DESCRIPTION";
    private int NOTIFICATION_CODE = 100;

    public NotificationModule(ReactApplicationContext context) {
        super(context);
        Log.d("NotificationModule", "START !!");
    }

    @Override
    public String getName() {
        return "NotificationModule";
    }

    @ReactMethod
    public void onPress(String title, String description) {
        Log.d("NotificationModule", title + "-" + description);
        this.createNotificationChannel();
        this.createNotification(title, description);
    }

    private void createNotification(String title, String description) {
        NotificationCompat.Builder builder = new NotificationCompat.Builder(getCurrentActivity(), CHANNEL_ID)
                 .setSmallIcon(R.drawable.ic_android_black_24dp)
                .setContentTitle(title)
                .setContentText(description)
                .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                .setAutoCancel(true);

        Intent intent = new Intent(getReactApplicationContext(), NotificationModule.class);
        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
        PendingIntent pendingIntent = PendingIntent.getActivity(getReactApplicationContext(), 0, intent,
                PendingIntent.FLAG_IMMUTABLE);
        builder.setContentIntent(pendingIntent);

//         Bitmap largeIcon =
//         BitmapFactory.decodeResource(getReactApplicationContext().getResources(),
//         R.raw.icon_notification);
//         builder.setLargeIcon(largeIcon);

//         MediaPlayer mediaPlayer = MediaPlayer.create(getCurrentActivity(),
//         R.raw.music_notification);
//         mediaPlayer.start();

        NotificationManager notificationManager = null;
        if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.M) {
            notificationManager = getReactApplicationContext().getSystemService(NotificationManager.class);
        }
        notificationManager.notify((int) new Date().getTime(), builder.build());

    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Check Permission
            if (ContextCompat.checkSelfPermission(getReactApplicationContext(),
                    Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(getReactApplicationContext().getCurrentActivity(),
                        new String[] { Manifest.permission.POST_NOTIFICATIONS },
                        NOTIFICATION_CODE);
            }

            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, CHANNEL_NAME,
                    NotificationManager.IMPORTANCE_DEFAULT);
            channel.setDescription(CHANNEL_DESCRIPTION);
            NotificationManager notificationManager = getReactApplicationContext()
                    .getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(channel);
        }
    }

}
