import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './screens/Home';
import MapScreen from './screens/Map';
import SettingsScreen from './screens/Settings';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if(route.name === "Home") {
              iconName = focused ? "ios-information-circle" : "ios-information-circle-outline";
            } else if(route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if(route.name === "Settings") {
              iconName = focused ? "settings-sharp" : "settings-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgb(0,122,255)',
          tabBarInactiveTintColor: 'rgb(142,142,147)',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;