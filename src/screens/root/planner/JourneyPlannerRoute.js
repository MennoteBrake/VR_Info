import { useContext } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text, Button } from "react-native";
import { useTheme } from '@react-navigation/native';
import MapView, { Geojson } from 'react-native-maps';
import BottomDrawer from 'react-native-bottom-drawer-view';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { ThemeContext } from '../../../contexts/Context';
import { convertSecondsToHrsMins, dateToString } from '../../../util/Util';

const JourneyPlannerRouteScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const { data } = route.params;

  console.log(data);

  const TAB_BAR_HEIGHT = 49;
  const HEADER_HEIGHT = 60;

  const startTime = new Date(data.startTime);
  const endTime = new Date(data.endTime);
  const journeyTimes = `${dateToString(startTime)} - ${dateToString(endTime)}`;

  return(
    <SafeAreaView style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 65.5,
          longitude: 26,
          latitudeDelta: 11,
          longitudeDelta: 1
        }}
        style={styles.map}
        userInterfaceStyle={theme}
      />
      <BottomDrawer
        containerHeight={100}
        offset={TAB_BAR_HEIGHT + HEADER_HEIGHT}
        onExpanded = {() => {console.log('expanded')}}
        onCollapsed = {() => {console.log('collapsed')}}
        backgroundColor={colors.card}
        shadow={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.gestureBarContainer}>
            <View style={styles.gestureBar}></View>
          </View>
          <View>
            <View style={styles.header}>
              <Text style={[styles.headerText, { color: colors.text }]}>{journeyTimes}</Text>
              <View style={styles.headerRow}>
                <Ionicons name="time-outline" size={18} color={colors.text} />
                <Text style={[styles.headerText, { color: colors.text }]}>{convertSecondsToHrsMins(data.duration)}</Text>
              </View>
            </View>
            <View>

            </View>
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
    paddingLeft: 25,
    paddingRight: 25
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18
  },
  gestureBarContainer: {
    marginTop: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  gestureBar: {
    width: 100,
    height: 5,
    borderRadius: 20,
    backgroundColor: '#858282'
  }
 });

export default JourneyPlannerRouteScreen;
