import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useQuery } from "@apollo/client";
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { JOURNEY_ITINERARY_QUERY } from '../../../API/GraphQL';

import Spinner from "../../../components/Spinner";

const JourneyPlannerRoutesScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { from, to, date, time } = route.params;
  const { data, loading, error } = useQuery(JOURNEY_ITINERARY_QUERY, {
    variables: {
      latFrom: 61.002222,
      lonFrom: 24.478333,
      latTo: 60.171944,
      lonTo: 24.941389,
      date: date,
      time: time
    },
    fetchPolicy: 'network-only',
  });

  if(error) {
    console.log(error.message);
    Alert.alert("Error", "Something went wrong. Please try again.", [{ text: "OK", onPress: () => navigation.goBack() }]);
  }

  const convertSecondsToHrsMins = (seconds) => {
    let mins = seconds / 60;
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    h = h < 10 ? '0' + h : h;
    m = Math.floor(m);
    m = m < 10 ? '0' + m : m;
    return `${h}:${m}`;
  }

  return(
    <View style={styles.container}>
      {
        (loading) ? (
          <Spinner />
        ) : (
          <SafeAreaView style={styles.contentContainer}>
            {
              data.plan.itineraries.map((itinerary, index) => {
                const startTime = new Date(itinerary.startTime);
                const endTime = new Date(itinerary.endTime);
                const journeyTimes = `${startTime.getHours()}:${(startTime.getMinutes() < 10 ? '0' : '') + startTime.getMinutes()} - ${endTime.getHours()}:${(endTime.getMinutes() < 10 ? '0' : '') + endTime.getMinutes()}`;

                return(
                  <TouchableOpacity
                    key={index}
                    style={[styles.card, { backgroundColor: colors.card }]}
                    onPress={() => navigation.navigate("Route", {
                      data: itinerary
                    })}
                  >
                    <View style={styles.header}>
                      <Text style={[styles.headerText, { color: colors.text }]}>{journeyTimes}</Text>
                      <Text style={[styles.headerText, { color: colors.text }]}>{convertSecondsToHrsMins(itinerary.duration)}</Text>
                    </View>
                    <View style={styles.legs}>
                      {
                        itinerary.legs.map((leg, index) => {
                          let icon = "help-circle-outline";
                          if(leg.mode === "WALK") {
                            icon = "walk";
                          } else if(leg.mode === "RAIL") {
                            icon = "train";
                          }

                          return(
                            <View key={index} style={[
                              styles.leg,
                              (leg.mode === "WALK" && styles.walk),
                              (leg.mode === "RAIL" && styles.rail),
                              { width: (leg.duration / itinerary.duration) * 100 + '%' }
                            ]}
                            >
                              <Ionicons name={icon} size={20} color="#ffffff" />
                              <Text style={styles.legText}>{convertSecondsToHrsMins(leg.duration)}</Text>
                            </View>
                          );
                        })
                      }
                    </View>
                  </TouchableOpacity>
                );
              })
            }
          </SafeAreaView>
        )
      }
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  headerText: {
    fontWeight: 'bold'
  },
  card: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    borderRadius: 10,
    padding: 10
  },
  legs: {
    flexDirection: 'row',
    height: 25
  },
  leg: {
    flexShrink: 1,
    alignItems: 'center',
    flexDirection: 'row',
    minWidth: 70,
  },
  legText: {
    color: '#ffffff',
    fontWeight: 'bold'
  },
  walk: {
    backgroundColor: '#e2e2e2'
  },
  rail: {
    backgroundColor: '#00b451'
  }
});

export default JourneyPlannerRoutesScreen;