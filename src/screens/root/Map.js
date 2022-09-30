import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import { getAllTrainLocations } from '../../API/VR';

const MapScreen = ({ navigation }) => {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTrainLocations();
      setTrains(data);
    }

    fetchData().catch(console.error);

    const interval = setInterval(() => {
      fetchData().catch(console.error);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const onMarkerPress = (trainNumber, departureDate) => {
    navigation.navigate("Train Details", {
      trainNumber: trainNumber
    });
  };

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
          trains && (
            trains.map((train, index) => {
              return(
                <Marker
                  key={index}
                  coordinate={
                    {
                      latitude: train.location.coordinates[1],
                      longitude: train.location.coordinates[0]
                    }}
                  title={`Train ${train.trainNumber}`}
                  description={`Speed: ${train.speed} km/h`}
                  image={{uri: 'train_pin'}}
                  onCalloutPress={() => onMarkerPress(train.trainNumber)} />
              );
            })
          )
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
