import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from './Home';
import MapScreen from './Map';
import SettingsScreen from './Settings';

const Tab = createBottomTabNavigator();

const RootScreen = ({ navigation }) => {
  return(
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
  );
};

export default RootScreen;