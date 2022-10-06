import { useContext, useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, StyleSheet, Text } from "react-native";
import { useTheme } from '@react-navigation/native';
import MapView, { Geojson } from 'react-native-maps';
import StepIndicator from 'react-native-step-indicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Polyline from '@mapbox/polyline';

import { ThemeContext } from '../../../contexts/Context';
import { convertSecondsToHrsMins, dateToString } from '../../../util/Util';

const JourneyPlannerRouteScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const { colors } = useTheme();
  const { data } = route.params;

  const [legs, setLegs] = useState([]);
  const [stepLabels, setStepLabels] = useState([]);
  const [geoJson, setGeoJson] = useState({
    "type": "FeatureCollection",
    "features": []
  });

  useEffect(() => {
    let labels = [];
    let features = [];

    data.legs.forEach((leg, index) => {
      labels.push(leg.from.name);

      if(index == data.legs.length - 1) {
        labels.push(leg.to.name);
      }

      features.push({
        "type": "Feature",
        "geometry": Polyline.toGeoJSON(leg.legGeometry.points)
      });
    });

    setLegs(data.legs);
    setStepLabels(labels);
    setGeoJson({
      "type": "FeatureCollection",
      "features": features
    });
  }, [data]);

  const label = (label) => {
    let position = (label.position > legs.length - 1) ?  legs.length - 1 : label.position;

    let renderStartTime = (label.position == legs.length) ? false : true;
    let renderEndTime = (label.position == 0) ? false : true;

    let startTime = (label.position == 0) ? legs[position].startTime : legs[position-1].endTime;
    let endTime = (label.position == legs.length) ? legs[position].endTime : legs[position].startTime

    return(
      <View>
        <Text style={[styles.place, {color: colors.text }]}>{label.label}</Text>
        {
          (renderStartTime && <Text style={[label.position == 0 && styles.startTime, { color: colors.text }]}>{dateToString(new Date(startTime))}</Text>)
        }
        {
          (renderEndTime && <Text style={[styles.startTime, { color: colors.text }]}>{dateToString(new Date(endTime))}</Text>)
        }
      </View>
    );
  }

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
      >
        <Geojson geojson={geoJson} strokeColor="#00b451" fillColor="#00b451" strokeWidth={5} />
      </MapView>
      <View style={[styles.contentContainer, { backgroundColor: colors.card }]}>
        <View>
          <View style={styles.header}>
            <Text style={[styles.headerText, { color: colors.text }]}>{journeyTimes}</Text>
            <View style={styles.headerRow}>
              <Ionicons name="time-outline" size={18} color={colors.text} />
              <Text style={[styles.headerText, { color: colors.text }]}>{convertSecondsToHrsMins(data.duration)}</Text>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.steps}>   
            <StepIndicator
              direction="vertical"
              customStyles={{
                separatorFinishedColor: '#00b451',
                stepIndicatorFinishedColor: '#00b451',
                separatorStrokeWidth: 10,
                labelAlign: 'flex-start'
              }}
              labels={stepLabels}
              renderLabel={label}
              stepCount={stepLabels.length}
              currentPosition={stepLabels.length}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    padding: 20
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
  steps: {
    height: '100%'
  },
  place: {
    fontWeight: 'bold'
  },
  startTime: {
    fontWeight: 'bold'
  }
 });

export default JourneyPlannerRouteScreen;
