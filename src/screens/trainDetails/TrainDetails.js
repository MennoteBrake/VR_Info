import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Ionicons from 'react-native-vector-icons/Ionicons';

import { getTrainInfo } from '../../API/VR';

const TrainDetailsScreen = ({ route, navigation }) => {
  const { trainNumber } = route.params;

  const [train, setTrain] = useState({
    trainNumber: 0,
    timeTableRows: [
      {
        stationShortCode: "UNK"
      },
      {
        stationShortCode: "UNK"
      }
    ]
  });
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const trainData = await getTrainInfo(trainNumber);

      if(trainData.length == 0) {
        return;
      }

      const stoppingAt = trainData[0].timeTableRows.filter((el) => {
        return el.trainStopping && el.commercialStop
      });

      setTrain(trainData[0]);
      setSchedule(stoppingAt);
    }

    fetchData().catch(console.error);
  }, [trainNumber]);

  useEffect(() => {
    navigation.setOptions({ title: `${train.trainCategory} train ${train.trainNumber}`})
  }, [train]);

  const onStationClick = (shortCode) => {
    navigation.navigate("Station Details", {
      shortCode: shortCode
    });
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemTextSmall}>From</Text>
          <Text style={styles.summaryItemTextBig} onPress={() => onStationClick(train.timeTableRows[0].stationShortCode)}>{train.timeTableRows[0].stationShortCode}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Ionicons name="arrow-forward" size={35} color="#ffffff"/>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemTextSmall}>To</Text>
          <Text style={styles.summaryItemTextBig} onPress={() => onStationClick(train.timeTableRows[train.timeTableRows.length-1].stationShortCode)}>{train.timeTableRows[train.timeTableRows.length-1].stationShortCode}</Text>
        </View>
      </View>
      <ScrollView>
        { 
          schedule.map((item, index) => {
            const date = new Date(item.scheduledTime);
            const passed = date < new Date();

            return(
              <View key={index} style={[styles.scheduleRow, passed && styles.passed]}>
                <Text style={{width: '15%'}} onPress={() => onStationClick(item.stationShortCode)}>{item.stationShortCode}</Text>
                <Text style={{width: '25%'}}>{item.type}</Text>
                <Text style={{width: '20%'}}>{item.commercialTrack}</Text>
                <View style={styles.scheduleTimeCol}>
                  <View style={styles.scheduleTime}>
                    <Ionicons name="time-outline" size={15} color="#000000"/>
                    <Text>{`${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`}</Text>
                  </View>
                  <View>
                    {(item.differenceInMinutes > 0) ? (
                      <Text style={styles.delay}>{`+${item.differenceInMinutes}`}</Text>
                    ) : (
                      <Text style={styles.onTime}>On time</Text>
                    )}
                  </View>
                </View>
              </View>
            );
          })
        }
        <View style={styles.footer}>
          <Text>Service operated by {train.operatorShortCode}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  summaryBox: {
    backgroundColor: '#00b451',
    height: 150,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryItemTextSmall: {
    color: '#ffffff',
    fontWeight: '500'
  },
  summaryItemTextBig: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e2e2',
    padding: 20
  },
  passed: {
    opacity: 0.5
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
  footer: {
    marginTop: 10,
    alignItems: 'center'
  }
});

export default TrainDetailsScreen;
