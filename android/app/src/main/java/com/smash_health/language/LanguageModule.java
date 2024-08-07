package com.smash_health.language;

import android.content.Context;
import android.content.SharedPreferences;
import android.content.res.Configuration;
import android.os.Build;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Locale;

public class LanguageModule extends ReactContextBaseJavaModule {

    public LanguageModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "LanguageModule";
    }

    @ReactMethod
    public void getLanguage(Callback successCallback) {
        SharedPreferences prefs = getReactApplicationContext().getSharedPreferences("app_prefs",
                Context.MODE_PRIVATE);
        String language = prefs.getString("language", Locale.getDefault().getLanguage());
        successCallback.invoke(language);
    }

    @ReactMethod
    public void setLanguage(String languageCode, Callback successCallback) {
        if (getReactApplicationContext() != null) {
            Locale locale = new Locale(languageCode);
            Locale.setDefault(locale);
            Configuration config = new Configuration();
            config.setLocale(locale);

            Context appContext = getReactApplicationContext().getApplicationContext();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
                appContext.createConfigurationContext(config);
            } else {
                appContext.getResources().updateConfiguration(config, appContext.getResources().getDisplayMetrics());
            }

            // Save language to SharedPreferences
            SharedPreferences prefs = getReactApplicationContext().getSharedPreferences("app_prefs",
                    Context.MODE_PRIVATE);
            SharedPreferences.Editor editor = prefs.edit();
            editor.putString("language", languageCode);
            editor.apply();

            // Emit an event to notify JavaScript code
            getReactApplicationContext()
                    .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                    .emit("languageChanged", languageCode);

            successCallback.invoke("Language set to " + languageCode);
        } else {
            successCallback.invoke("Failed to set language");
        }
    }
}
