import { useContext } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ApolloProvider } from '@apollo/client';
import { client } from './API/GraphQL';

import { ThemeProvider, ThemeContext } from './contexts/Context';

import RootScreen from './screens/root/Root';
import TrainDetailsScreen from './screens/trainDetails/TrainDetails';
import StationDetailsScreen from './screens/stationDetails/StationDetails';
import JourneyPlannerRouteScreen from './screens/root/planner/JourneyPlannerRoute';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ThemeProvider>
      <ApolloProvider client={client}>
        <MainComponent />
      </ApolloProvider>
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
          <Stack.Screen name="Route" component={JourneyPlannerRouteScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
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
