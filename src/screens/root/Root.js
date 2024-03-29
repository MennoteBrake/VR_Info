import { useContext } from 'react';
import { useTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../contexts/Context';

import StationsScreen from './Stations';
import MapScreen from './Map';
import SettingsScreen from './Settings';
import JourneyPlanner from './planner/JourneyPlanner';

const Tab = createBottomTabNavigator();

const RootScreen = () => {
  const { colors } = useTheme();
  const { theme } = useContext(ThemeContext);

  return(
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if(route.name === "Stations") {
            iconName = focused ? "search" : "search-outline";
          } else if(route.name === "Journey Planner") {
            iconName = "analytics-outline";
          } else if(route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
          } else if(route.name === "Settings") {
            iconName = focused ? "settings-sharp" : "settings-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: (theme === "dark") ? 'rgb(255, 255, 255)' : 'rgb(142,142,147)',
        tabBarActiveBackgroundColor: colors.card,
        tabBarInactiveBackgroundColor: colors.card
      })}
    >
      <Tab.Screen name="Stations" component={StationsScreen} />
      <Tab.Screen name="Journey Planner" component={JourneyPlanner} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default RootScreen;