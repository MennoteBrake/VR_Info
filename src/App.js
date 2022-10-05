import React from 'react';
import { useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ThemeProvider, ThemeContext } from './contexts/Context';

import RootScreen from './screens/root/Root';
import TrainDetailsScreen from './screens/trainDetails/TrainDetails';
import StationDetailsScreen from './screens/stationDetails/StationDetails';

import {initDB} from './db/VRIdb';
import {addStation} from './db/VRIStations';
import {getStations} from './API/VR';

const Stack = createNativeStackNavigator();

initDB()
  .then(() => {
    console.log('Database creation succeeded!');
  })
  .catch(err => {
    console.log('Database IS NOT initialized! ' + err);
  });

const App = () => {
  insertStationsToDB().catch(console.error);

  return (
    <ThemeProvider>
      <MainComponent />
    </ThemeProvider>
  );
};

const MainComponent = () => {
  const { theme } = useContext(ThemeContext);

  return(
    <SafeAreaView style={[styles.container, ((theme === "dark") && styles.darkContainer)]}>
      <StatusBar
        barStyle={(theme === "dark") ? "light-content" : "dark-content"}
        backgroundColor={(theme === "dark") ? DarkTheme.colors.background : DefaultTheme.colors.background} />
      <NavigationContainer theme={(theme === "dark") ? DarkTheme : DefaultTheme}>
        <Stack.Navigator initialRouteName="Root">
          <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Train Details" component={TrainDetailsScreen} />
          <Stack.Screen name="Station Details" component={StationDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const insertStationsToDB = async () => {
  let data = await getStations();
  {
    data.map((item, index) =>
      addStation(
        item.passengerTraffic,
        item.type,
        item.stationName,
        item.stationShortCode,
        item.stationUICCode,
        item.countryCode,
        item.longitude,
        item.latitude,
      ),
    );
  }
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
