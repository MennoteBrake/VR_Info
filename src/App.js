import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RootScreen from './screens/root/Root';
import TrainDetailsScreen from './screens/trainDetails/TrainDetails';
import StationDetailsScreen from './screens/stationDetails/StationDetails';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Root">
        <Stack.Screen name="Root" component={RootScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Train Details" component={TrainDetailsScreen} />
        <Stack.Screen name="Station Details" component={StationDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
