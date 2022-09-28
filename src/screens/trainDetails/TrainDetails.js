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

  useEffect(() => {
    const fetchData = async () => {
      const trainData = await getTrainInfo(trainNumber);

      if(trainData.length == 0) {
        return;
      }

      setTrain(trainData[0]);
    }

    fetchData().catch(console.error);
  }, []);

  useEffect(() => {
    navigation.setOptions({ title: `${train.trainCategory} train ${train.trainNumber}`})
  }, [train]);

  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.summaryBox}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemTextSmall}>From</Text>
          <Text style={styles.summaryItemTextBig}>{train.timeTableRows[0].stationShortCode}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Ionicons name="arrow-forward" size={35} color="#ffffff"/>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryItemTextSmall}>To</Text>
          <Text style={styles.summaryItemTextBig}>{train.timeTableRows[train.timeTableRows.length-1].stationShortCode}</Text>
        </View>
      </View>
      <ScrollView style={styles.schedule}>
        {
          train.timeTableRows.map((item, index) => {
            let date = new Date(item.scheduledTime);

            if(!item.trainStopping) {
              return;
            }

            return(
              <View key={index} style={styles.scheduleRow}>
                <Text style={{width: '20%'}}>{item.stationShortCode}</Text>
                <Text style={{width: '25%'}}>{item.type}</Text>
                <Text style={{width: '10%'}}>{item.commercialTrack}</Text>
                <View style={styles.scheduleTime}>
                  <Ionicons name="time-outline" size={15} color="#000000"/>
                  <Text>{`${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`}</Text>
                </View>
              </View>
            );
          })
        }
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
  scheduleTime: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

export default TrainDetailsScreen;