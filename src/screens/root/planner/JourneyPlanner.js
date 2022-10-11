import { useEffect, useState } from 'react';
import { Button, SafeAreaView, View, Text, TextInput, Image, StyleSheet, ScrollView } from "react-native";
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

import JourneyPlannerRoutes from './JourneyPlannerRoutes';

const JourneyPlannerScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const [showRoutes, setShowRoutes] = useState(false);

  const onSeperatorPress = () => {
    setFrom(to);
    setTo(from);
  };

  useEffect(() => {
    setShowRoutes(false)
  }, [from, to, date]);

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', marginBottom: 50}}>
        <Text style={styles.title}>Hei!</Text>
        <Text style={styles.title}>Where would you like to go?</Text>
      </View>
      <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <View>
            <TextInput placeholder="From" onChangeText={setFrom} value={from} placeholderTextColor={colors.text} style={{color: colors.text}} />
          </View>
          <View style={styles.seperatorContainer}>
            <View style={[styles.seperator, { borderBottomColor: colors.border }]} />
            <Ionicons name="swap-vertical" size={30} color={colors.primary} onPress={onSeperatorPress} />
            <View style={[styles.seperator, { borderBottomColor: colors.border }]} />
          </View>
          <View>
            <TextInput placeholder="To" onChangeText={setTo} value={to} placeholderTextColor={colors.text} style={{color: colors.text}} />
          </View>
        </View>
        <View style={[styles.card, { width: '50%', backgroundColor: colors.card }]}>
          <Text style={{ color: colors.text }} onPress={() => setOpenDatePicker(true)}>{date.toLocaleString('en-FI', {hour12: false, timeZone: "Europe/Helsinki"})}</Text>
          <DatePicker
            modal
            open={openDatePicker}
            date={date}
            locale="en-FI"
            onConfirm={(date) => {
              setOpenDatePicker(false)
              setDate(date)
            }}
            onCancel={() => {
              setOpenDatePicker(false)
            }}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={() => setShowRoutes(true)} title="Search" />
        </View>
        {
          (showRoutes && (
            <ScrollView>
              <JourneyPlannerRoutes
                from={from}
                to={to}
                date={new Date(date.getTime() - (date.getTimezoneOffset()*60*1000)).toISOString().split('T')[0]}
                time={date.toTimeString().split(' ')[0]}
                navigation={navigation}
              />
            </ScrollView>
          ))
        }
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00b451',
    justifyContent: 'flex-end'
  },
  title: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 25
  },
  contentContainer: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: '75%',
  },
  seperatorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  seperator: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 7,
    marginBottom: 7,
    width: '40%'
  },
  card: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    padding: 10
  },
  button: {
    width: 100,
    alignSelf: 'center',
    marginTop: 10
  }
});

export default JourneyPlannerScreen;
