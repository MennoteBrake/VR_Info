import { useContext } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Button } from "react-native";
import { useTheme } from '@react-navigation/native';
import MapView, { Geojson } from 'react-native-maps';
import BottomDrawer from 'react-native-bottom-drawer-view';

import { ThemeContext } from '../../../contexts/Context';

const JourneyPlannerRouteScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const { data } = route.params;

  console.log(data);

  const TAB_BAR_HEIGHT = 49;
  const HEADER_HEIGHT = 60;

  return(
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.map}
      />
      <BottomDrawer
        containerHeight={100}
        offset={TAB_BAR_HEIGHT + HEADER_HEIGHT}
        onExpanded = {() => {console.log('expanded')}}
        onCollapsed = {() => {console.log('collapsed')}}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.text}>Get directions to your location</Text>
          <View style={styles.buttonContainer}>
            <Button title="first button" />
            <Button title="second button" />
          </View>
        </View>
      </BottomDrawer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  text: {
    paddingHorizontal: 5
  }
 });

export default JourneyPlannerRouteScreen;
