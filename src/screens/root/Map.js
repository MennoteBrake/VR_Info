import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import MapView, { Marker, Geojson } from 'react-native-maps';

import { getAllTrainLocations, getTrackNotifications } from '../../API/VR';
import TrackNotificationModal from '../../components/TrackNotificationModal';

import { hasLocationPermission } from '../../permissions/Permissions';

const MapScreen = ({ navigation }) => {
  const [trains, setTrains] = useState([]);
  const [trackNotifications, setTrackNotifications] = useState({});
  const [notificationDetails, setNotificationDetails] = useState({});
  const [notificationModalVisible, setNotificationModalVisible] = useState(false);

  useEffect(() => {
    const fetchTrainData = async () => {
      const data = await getAllTrainLocations();
      setTrains(data);
    }

    const fetchTrackNotifications = async () => {
      const currentDate = new Date(new Date().setHours(3,0,0,0));
      const newDate = new Date(currentDate);
      const futureDate = new Date(newDate.setDate(newDate.getDate() + 30));

      let data = await getTrackNotifications("SENT", currentDate.toISOString(), futureDate.toISOString()).catch(console.error);
      data.features = data.features.filter(feat => {
        return feat.geometry.type == "MultiLineString" || (feat.geometry.type == "Point" && feat.properties.hasOwnProperty("organization"))
      });
      setTrackNotifications(data);
    };

    const checkPermission = async () => {
      const hasPerm = await hasLocationPermission();
    };

    fetchTrainData().catch(console.error);
    fetchTrackNotifications().catch(console.error);
    checkPermission().catch(console.error);

    const interval = setInterval(() => {
      fetchTrainData().catch(console.error);
    }, 20000);

    return () => clearInterval(interval);
  }, []);

  const onMarkerPress = (trainNumber) => {
    navigation.navigate("Train Details", {
      trainNumber: trainNumber
    });
  };

  const onGeoMarkerPress = (data) => {
    setNotificationDetails(data.feature.properties);
    setNotificationModalVisible(true);
  };

  return(
    <SafeAreaView style={styles.container}>
      <MapView
        style={(notificationModalVisible) ? styles.mapHalf : styles.mapFull}
        initialRegion={{
          latitude: 65.5,
          longitude: 26,
          latitudeDelta: 11,
          longitudeDelta: 1
        }}
        showsUserLocation={true}
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

        {(Object.keys(trackNotifications).length) ? (
          <Geojson
            geojson={trackNotifications}
            strokeColor="red"
            fillColor="red"
            strokeWidth={5}
            onPress={(data) => onGeoMarkerPress(data)}
          />
        ) : null}
      </MapView>

      <TrackNotificationModal visibility={notificationModalVisible} properties={notificationDetails} onClose={() => setNotificationModalVisible(false)}/>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapFull: {
    ...StyleSheet.absoluteFillObject,
  },
  mapHalf: {
    flex: 0.8
  }
 });

export default MapScreen;
