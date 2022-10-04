import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import RootScreen from './screens/root/Root';
import TrainDetailsScreen from './screens/trainDetails/TrainDetails';
import StationDetailsScreen from './screens/stationDetails/StationDetails';

import {initDB} from './db/VRIdb';
import {addStation} from './db/VRIStations';
import {getStations} from './API/VR';

const Stack = createNativeStackNavigator();

const App = () => {
  initDB();
  insertStationsToDB().catch(console.error);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen
          name="Root"
          component={RootScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Train Details" component={TrainDetailsScreen} />
        <Stack.Screen name="Station Details" component={StationDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const insertStationsToDB = async () => {
  let data = await getStations();
  if (data.length == 0) {
    data = [];
  }
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

export default App;
