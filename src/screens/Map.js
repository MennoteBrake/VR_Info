import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [trains, setTrains] = useState([
    {
      latlng: {
        latitude: 60.18833,
        longitude: 24.9300
      },
      title: "Train 1",
      description: "IC932"
    },
    {
      latlng: {
        latitude: 60.19534,
        longitude: 24.94028
      },
      title: "Train 2",
      description: "R"
    }
  ]);

  return(
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 65.5,
          longitude: 26,
          latitudeDelta: 11,
          longitudeDelta: 1
        }}
      >
        {
          trains.map((train, index) => {
            return(<Marker key={index} coordinate={train.latlng} title={train.title} description={train.description} />)
          })
        }
      </MapView>
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
 });

export default MapScreen;