import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

import { ApolloProvider } from '@apollo/client';
import { client } from './API/GraphQL';

import { ThemeProvider, ThemeContext } from './contexts/Context';

import RootScreen from './screens/root/Root';
import TrainDetailsScreen from './screens/trainDetails/TrainDetails';
import StationDetailsScreen from './screens/stationDetails/StationDetails';
import JourneyPlannerRouteScreen from './screens/root/planner/JourneyPlannerRoute';

import { initDB } from './db/VRIdb';
import { addStation } from './db/VRIStations';
import { getStations } from './API/VR';
import { addSetting, fetchAllSettings, fetchSetting, darkThemeSettingName } from './db/AppSettings';

const Stack = createNativeStackNavigator();

const NewDarkTheme = {
  ...DarkTheme,
  colors:{
    ...DarkTheme.colors,
    stationIcon: '#adadad',
  }
}

const LightTheme = {
  ...DefaultTheme,
  colors:{
    ...DefaultTheme.colors,
    stationIcon: '#adadad'
  }
}

initDB()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const App = () => {
  useEffect(() => {
    insertStationsToDB()
    .catch((err) => console.log(err));
  }, []);

  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <MainComponent />
      </ApolloProvider>
    </ThemeProvider>
  );
};

const MainComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      const r = await initSettingsDB();
      setReady(r);
    };

    init();
  }, []);

  useEffect(() => {
    if(!ready) return;

    fetchSetting(darkThemeSettingName)
    .then((setting) => {
      setTheme(setting[0].enabled ? "dark" : "light");
      SplashScreen.hide();
    })
    .catch(console.error);
  }, [ready]);

  return(
    <SafeAreaView style={[styles.container, ((theme === "dark") && styles.darkContainer)]}>
      <StatusBar
        barStyle={(theme === "dark") ? "light-content" : "dark-content"}
        backgroundColor={(theme === "dark") ? NewDarkTheme.colors.background : LightTheme.colors.background} />
      <NavigationContainer theme={(theme === "dark") ? NewDarkTheme : LightTheme}>
        <Stack.Navigator initialRouteName="Root">
          <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Train Details" component={TrainDetailsScreen} />
          <Stack.Screen name="Station Details" component={StationDetailsScreen} />
          <Stack.Screen name="Route" component={JourneyPlannerRouteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const insertStationsToDB = async () => {
  const stationPostfix = " asema";
  const stations = await getStations();
  stations.forEach((station) => {
    addStation(
      station.passengerTraffic,
      station.type,
      (station.stationName.replace(stationPostfix, "")),
      station.stationShortCode,
      station.stationUICCode,
      station.countryCode,
      station.longitude,
      station.latitude,
    ).catch(console.error)
  });
};

const initSettingsDB = async () => {
  let settingsLength = 0;

  await fetchAllSettings().then((settings) => {
    settingsLength = settings.length
  })
  .catch(console.error);

  if (settingsLength < 1)
  {
    await addSetting(darkThemeSettingName, true).catch(console.error);
  }

  return true;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(255, 255, 255)'
  },
  darkContainer: {
    backgroundColor: 'rgb(18, 18, 18)'
  }
});

export default App;
