import {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Spinner from '../../components/Spinner';
import { useTheme } from '@react-navigation/native';

import { getStation } from '../../API/VR';
import { deleteFavoriteStation, checkIfFavoriteExists, addFavoriteStation, } from '../../db/FavoriteStations';
import { fetchStationName } from '../../db/VRIStations';
import { dateToString } from '../../util/Util';

const StationDetailsScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { shortCode, stationName } = route.params;
  const [departures, setDepartures] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const getStationName = async (stationShortCode) =>{
    let data = await fetchStationName(stationShortCode).catch(console.error);
    return (data.length > 0) ? data[0].stationName : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      const stationData = await getStation(shortCode, 0, 0, 0, 15);

      if (stationData.length == 0) {
        return;
      }

      let dep = [];
      stationData.map((train, index) => {
        return train.timeTableRows.map(item => {
          if (
            item.stationShortCode !== shortCode ||
            item.type !== 'DEPARTURE'
          ) {
            return;
          }

          let departureDate = new Date(item.scheduledTime);
          dep.push({
            trainNumber: train.trainNumber,
            trainType: train.trainType,
            commuterLineID: train.commuterLineID,
            operator: train.operatorShortCode,
            track: item.commercialTrack,
            destination:
              train.timeTableRows[train.timeTableRows.length - 1]
                .stationShortCode,
            departureDate: departureDate,
            delayed: item.differenceInMinutes > 0,
            differenceInMinutes: item.differenceInMinutes,
            destinationStationName: "",
          });
        });
      });

      dep.sort((a, b) => {
        return new Date(a.departureDate) - new Date(b.departureDate);
      });

      for(let i = 0; i < dep.length; ++i)
      {
        dep[i].destinationStationName = await getStationName(dep[i].destination);
      }

      setDepartures(dep);
    };

    const checkIfFavorite = async () => {
      let data = await checkIfFavoriteExists(shortCode).catch(console.error);
      setIsFavorite(data);
    };

    checkIfFavorite();
    fetchData().catch(console.error);
  }, [stationName]);

  useEffect(() => {
    navigation.setOptions({title: stationName});
  }, [stationName]);

  const onDestinationPress = (destination, destinationStationName) => {
    navigation.push('Station Details', {
      shortCode: destination,
      stationName: destinationStationName,
    });
  };

  const onDeparturePress = trainNumber => {
    navigation.push('Train Details', {
      trainNumber: trainNumber,
    });
  };

  const onFavoritePress = async () => {
    if (!isFavorite) {
      addFavoriteStation(shortCode).catch(console.error);
      setIsFavorite(true);
    } else {
      deleteFavoriteStation(shortCode).catch(console.error);
      setIsFavorite(false);
    }
  };

  return (
    <View style={styles.container}>
      {!departures.length ? (
        <Spinner />
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Departures</Text>
            <TouchableOpacity
              style={styles.favoriteIcon}
              onPress={onFavoritePress}>
              <Ionicons
                name={isFavorite ? 'star' : 'star-outline'}
                size={32}
                color={'white'}></Ionicons>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {
              departures.map((departure, index) => {
                return(
                  <View key={index} style={[styles.departures, {backgroundColor: colors.card, borderColor: colors.border}]}>
                    <Text style={{width: '25%', color: colors.text}} onPress={() => onDestinationPress(departure.destination, departure.destinationStationName)}>{departure.destinationStationName}</Text>
                    <Text style={{width: '20%', color: colors.text}} onPress={() => onDeparturePress(departure.trainNumber)}>{(departure.commuterLineID) ? departure.commuterLineID : `${departure.trainType}${departure.trainNumber}`}</Text>
                    <Text style={{width: '10%', color: colors.text}}>{departure.track}</Text>
                    <View style={styles.scheduleTimeCol}>
                      <View style={styles.scheduleTime}>
                        <Ionicons name="time-outline" size={15} color={colors.text} />
                        <Text style={{ color: colors.text }}>{dateToString(departure.departureDate)}</Text>
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
                );
              })
            }
          </ScrollView>
        </SafeAreaView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#00b451',
    height: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  departures: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 20,
  },
  scheduleTimeCol: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  scheduleTime: {
    flexDirection: 'row',
  },
  delay: {
    color: '#d11919',
  },
  onTime: {
    color: '#00b451',
  },
  favoriteIcon: {
    paddingLeft: '5%',
  },
});

export default StationDetailsScreen;
