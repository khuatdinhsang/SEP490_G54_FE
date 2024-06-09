package com.smash_health.timer_module;

import java.util.ArrayList;

public class AlarmItem {
    public static String AlarmIDKey = "AlarmID";
    private String id;
    private int hour;
    private int minute;
    private ArrayList<Integer> daysOfWeek;
    private String title;
    private String description;

    public AlarmItem(String id) {
        this.id = id;
    }

    public AlarmItem(String id, int hour, int minute, ArrayList<Integer> daysOfWeek, String title, String description) {
        this.id = id;
        this.hour = hour;
        this.minute = minute;
        this.daysOfWeek = daysOfWeek;
        this.title = title;
        this.description = description;
    }

    public AlarmItem() {
    }

    public String getId() {
        return id;
    }

    public int getHour() {
        return hour;
    }

    public int getMinute() {
        return minute;
    }

    public ArrayList<Integer> getDaysOfWeek() {
        return daysOfWeek;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
