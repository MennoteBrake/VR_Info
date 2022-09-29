import { useState, useEffect } from 'react';
import { 
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet
} from "react-native";

import Ionicons from 'react-native-vector-icons/Ionicons';

import { getStation } from '../../API/VR';

const StationDetailsScreen = ({ route, navigation }) => {
  const { shortCode } = route.params;

  const [departures, setDepartures] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("hello");
      const stationData = await getStation(shortCode, 0, 0, 0, 15);

      if(stationData.length == 0) {
        return;
      }

      let dep = [];
      stationData.map((train, index) => {
        return(
          train.timeTableRows.map((item) => {
            if(item.stationShortCode !== shortCode || item.type !== "DEPARTURE") {
              return;
            }

            let departureDate = new Date(item.scheduledTime);
            dep.push({
              trainNumber: train.trainNumber,
              trainType: train.trainType,
              commuterLineID: train.commuterLineID,
              operator: train.operatorShortCode,
              track: item.commercialTrack,
              destination: train.timeTableRows[train.timeTableRows.length - 1].stationShortCode,
              departureDate: departureDate,
              delayed: (item.differenceInMinutes > 0),
              differenceInMinutes: item.differenceInMinutes
            });
          })
        );
      });

      dep.sort((a, b) => {
        return new Date(a.departureDate) - new Date(b.departureDate);
      });

      setDepartures(dep);
    }

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: shortCode})
  }, []);

  const onDestinationPress = (destination) => {
    navigation.push("Station Details", {
      shortCode: destination
    });
  };

  const onDeparturePress = (trainNumber) => {
    navigation.push("Train Details", {
      trainNumber: trainNumber
    });
  };

  return(
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          Departures
        </Text>
      </View>
      <ScrollView>
        {
          (departures.length) ? (
            departures.map((departure) => {
              return(
                <View style={styles.departures}>
                  <Text onPress={() => onDestinationPress(departure.destination)}>{departure.destination}</Text>
                  <Text onPress={() => onDeparturePress(departure.trainNumber)}>{(departure.commuterLineID) ? departure.commuterLineID : `${departure.trainType}${departure.trainNumber}`}</Text>
                  <Text>{departure.track}</Text>
                  <View style={styles.scheduleTimeCol}>
                    <View style={styles.scheduleTime}>
                      <Ionicons name="time-outline" size={15} color="#000000"/>
                      <Text>{`${departure.departureDate.getHours()}:${(departure.departureDate.getMinutes() < 10 ? '0' : '') + departure.departureDate.getMinutes()}`}</Text>
                    </View>
                    <View style={styles.scheduleDifference}>
                      {(departure.delayed) ? (
                        <Text style={styles.delay}>{`+${departure.differenceInMinutes}`}</Text>
                      ) : (
                        <Text style={styles.onTime}>On time</Text>
                      )}
                    </View>
                  </View>
                </View>
              )
            })
          ) : (
            <Text>No departures</Text>
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#00b451',
    height: 100,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold'
  },
  departures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 20
  },
  scheduleTimeCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  scheduleTime: {
    flexDirection: 'row'
  },
  delay: {
    color: '#d11919'
  },
  onTime: {
    color: '#00b451'
  },
});

export default StationDetailsScreen;
