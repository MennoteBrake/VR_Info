# VR Info

## Project description
This is a mobile app for Android and iOS where you can plan your journey with the trains of [VR.fi](https://www.vr.fi/en).

This app uses real-time data provided by Finland's railway network operators. Using that data, the app provides the user with a map of all active trains, their schedule and route.
It also provides useful information such as planned maintenance works and upcoming departures from any given station.

## Setup and installation

### Android
Because this app uses the a map to display the location of the trains, you need to a Google Cloud API key.

#### Google Cloud setup
First you need to login or create an account for Google Cloud. After that you need to create a new project. For this project you need to enable the following API's

- Maps SDK for Android
- Maps Embed API

After that, you need to create credentials for the app to use the API's. To do this,
- Click on the navigation menu, and navigate to "APIs & Services" and then "Credentials".
- Click Create credentials at the top of the screen, and choose API key.
- This will create a new API key, and copy this key. We will use this later in the code.
- After creating the API key we need to restrict it to the API's that we have enabled. To do this, click on the API key, and under "API restrictions" select "Restrict key".
- Here you have to select the API's you want to restrict the key to, and select "Maps SDK for Android" and "Maps Embed API"
- You can also restrict the key even further to the app you are going to create, using the "Application restrictions" setting for Android apps, but we are not going into that in this install. 
- Click save and the API key is created and restricted. (Creating the API key and restricting it can sometimes take some time, so it could be that you have to wait a little bit before the key works.)

#### Setting up the API key in the code. 
After creating the API key in Google Cloud, you have to add the key to the code. You have to do this in the following file:

- `VR_INFO/android/app/src/main/AndroidManifest.xml`

In this file change YOUR API KEY HERE with the API key. 
``` 
<meta-data
    android:name="com.google.android.geo.API_KEY"
    android:value="YOUR API KEY HERE"/>
```

#### Deployment for development and testing
```
git clone git@github.com:MennoteBrake/VR_Info.git
npm install
npx react-native run-android
```

---------------
### iOS
```
git clone git@github.com:MennoteBrake/VR_Info.git
npm install
npx pod-install ios
npx react-native run-ios
```
