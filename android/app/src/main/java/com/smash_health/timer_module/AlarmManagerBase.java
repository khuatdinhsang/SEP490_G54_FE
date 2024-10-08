package com.smash_health.timer_module;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import java.util.Calendar;

public class AlarmManagerBase {
    private static PendingIntent createPendingIntent(Context context, String id, String title, String description) {
        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.putExtra(AlarmItem.AlarmIDKey, id);
        intent.putExtra("title", title);
        intent.putExtra("description", description);
        return PendingIntent.getBroadcast(context, id.hashCode(), intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
    }

    public static void createScheduleAlarm(Context context, AlarmManager alarmManager, AlarmItem alarmItem) {
        // Log thông tin cơ bản về báo thức
        String log = alarmItem.getId() + " " + alarmItem.getTitle() + " " + alarmItem.getHour() + " " + alarmItem.getMinute();

        for (int dayOfWeek : alarmItem.getDaysOfWeek()) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTimeInMillis(System.currentTimeMillis());
            calendar.set(Calendar.DAY_OF_WEEK, dayOfWeek);
            calendar.set(Calendar.HOUR_OF_DAY, alarmItem.getHour());
            calendar.set(Calendar.MINUTE, alarmItem.getMinute());
            calendar.set(Calendar.SECOND, 0);

            // Kiểm tra nếu thời gian đó đã qua trong tuần này, chuyển sang tuần kế tiếp
            if (calendar.before(Calendar.getInstance())) {
                calendar.add(Calendar.DATE, 7);
            }

            // Tạo PendingIntent riêng cho mỗi ngày
            String idUnique = alarmItem.getId() + "-" + dayOfWeek;
            PendingIntent pendingIntent = createPendingIntent(context, idUnique, alarmItem.getTitle(), alarmItem.getDescription());

            // Hủy báo thức cũ nếu có
            alarmManager.cancel(pendingIntent);

            // Đặt báo thức
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                alarmManager.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
            } else {
                alarmManager.setExact(AlarmManager.RTC_WAKEUP, calendar.getTimeInMillis(), pendingIntent);
            }
        }
    }

    public static void cancelSchedule(Context context, AlarmManager alarmManager, AlarmItem alarmItem) {
        PendingIntent pendingIntent = createPendingIntent(context, alarmItem.getId(), alarmItem.getTitle(), alarmItem.getDescription());
        alarmManager.cancel(pendingIntent);
    }
}
