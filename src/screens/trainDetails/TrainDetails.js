import { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '@react-navigation/native';

import Spinner from '../../components/Spinner';

import { getTrainInfo } from '../../API/VR';

import {fetchStationName} from '../../db/VRIStations'

import {widthPercentageToDP} from '../../util/Util'

const TrainDetailsScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
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
  const defaultSummaryItemTextBigFontSize = 30;
  const [summaryItemTextBigFontSize, setSummaryItemTextBigFontSize] = useState(defaultSummaryItemTextBigFontSize);

  const getStationName = async (stationShortCode) =>{
    let data = await fetchStationName(stationShortCode).catch(console.error);
    return (data.length > 0) ? data[0].stationName : "";
  };

  useEffect(() => {
    const fetchData = async () => {
      const trainData = await getTrainInfo(trainNumber);

      if(trainData.length == 0) {
        return;
      }

      const stoppingAt = trainData[0].timeTableRows.filter((el) => {
        return el.trainStopping && el.commercialStop
      });

      for (let i = 0; i < stoppingAt.length; ++i)
      {
        stoppingAt[i].stationName = await getStationName(stoppingAt[i].stationShortCode);
      }

      setTrain(trainData[0]);
      setSchedule(stoppingAt);
    }

    fetchData().catch(console.error);
  }, [trainNumber]);

  useEffect(() => {
    navigation.setOptions({ title: `${train.trainCategory} train ${train.trainNumber}`})
  }, [train]);

  const onStationClick = (shortCode, stationName) => {
    navigation.navigate("Station Details", {
      shortCode: shortCode,
      stationName: stationName,
    });
  };

  const selectCorrectFontSize = (text1, text2) => 
  {
    let txt = (text1.length > text2.length) ? text1 : text2;

    let size = Math.round(widthPercentageToDP('30%') / (txt.length / 2));
    if(size < summaryItemTextBigFontSize)
    {
      setSummaryItemTextBigFontSize(size);
    }
  }

  return(
    <View style={styles.container}>
      {(!train.trainNumber || !schedule.length) ? (
        <Spinner />
      ) : (
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.summaryBox}>
            <View style={styles.summaryItem}>
              {selectCorrectFontSize(train.timeTableRows[0].stationName, train.timeTableRows[train.timeTableRows.length-1].stationName)}
              <Text style={styles.summaryItemTextSmall}>From</Text>
              <Text style={[styles.summaryItemTextBig, {fontSize:summaryItemTextBigFontSize}]} onPress={() => onStationClick(train.timeTableRows[0].stationShortCode, train.timeTableRows[0].stationName)}>{train.timeTableRows[0].stationName}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Ionicons name="arrow-forward" size={35} color="#ffffff"/>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryItemTextSmall}>To</Text>
              <Text style={[styles.summaryItemTextBig, {fontSize:summaryItemTextBigFontSize}]} onPress={() => onStationClick(train.timeTableRows[train.timeTableRows.length-1].stationShortCode, train.timeTableRows[train.timeTableRows.length-1].stationName)}>{train.timeTableRows[train.timeTableRows.length-1].stationName}</Text>
            </View>
          </View>
          <ScrollView>
            { 
              schedule.map((item, index) => {
                const scheduledTime = new Date(item.scheduledTime);
                const actualTime = new Date(scheduledTime.getTime() + item.differenceInMinutes * 60000);
                const passedStation = actualTime < new Date();
    
                return(
                  <View key={index} style={[styles.scheduleRow, (passedStation && styles.passed), { backgroundColor: colors.card, borderColor: colors.border }]}>
                    <Text style={{width: '25%', color: colors.text}} onPress={() => onStationClick(item.stationShortCode, item.stationName)}>{item.stationName}</Text>
                    <Text style={{width: '25%', color: colors.text}}>{item.type}</Text>
                    <Text style={{width: '20%', color: colors.text}}>{item.commercialTrack}</Text>
                    <View style={styles.scheduleTimeCol}>
                      <View style={styles.scheduleTime}>
                        <Ionicons name="time-outline" size={15} color={colors.text}/>
                        <Text style={{color: colors.text}}>{`${scheduledTime.getHours()}:${(scheduledTime.getMinutes() < 10 ? '0' : '') + scheduledTime.getMinutes()}`}</Text>
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
              <Text style={{color: colors.text}}>Service operated by {train.operatorShortCode}</Text>
            </View>
          </ScrollView>
        </SafeAreaView>      
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  contentContainer: {
    flex: 1
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
    fontWeight: 'bold'
  },
  scheduleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
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
