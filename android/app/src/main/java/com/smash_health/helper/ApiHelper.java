package com.smash_health.helper;

import android.util.Log;

import org.json.JSONObject;

import java.io.IOException;

import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ApiHelper {
    private static final OkHttpClient client = new OkHttpClient();

    public static boolean sendRequestCounterStep(long userId, String date, long actualValue) throws IOException {
        String urlString = "http://54.179.151.16/api/step-records/update-cont";
        // String urlString = "http://10.0.2.2:8080/api/step-records/update-cont";

        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("userId", userId);
            jsonObject.put("date", date);
            jsonObject.put("actualValue", actualValue);
        } catch (Exception e) {
            Log.e("[ApiHelper]", "JSON creation error: " + e.getMessage());
        }
        String jsonInputString = jsonObject.toString();

        MediaType JSON = MediaType.get("application/json; charset=utf-8");
        RequestBody body = RequestBody.create(jsonInputString, JSON);
        Request request = new Request.Builder()
                .url(urlString)
                .put(body)
                .build();

        try (Response response = client.newCall(request).execute()) {
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected code " + response);
            }
            Log.d("[ApiHelper]", "Response: " + response.body().string());
        }
        return true;
    }
}
