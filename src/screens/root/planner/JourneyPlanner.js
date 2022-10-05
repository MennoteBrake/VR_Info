import { useState } from 'react';
import { Button, SafeAreaView, View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';

const JourneyPlannerScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const onSeperatorPress = () => {
    setFrom(to);
    setTo(from);
  };

  return(
    <SafeAreaView style={styles.container}>
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <View>
          <TextInput placeholder="From" onChangeText={setFrom} value={from} />
        </View>
        <View style={styles.seperatorContainer}>
          <View style={[styles.seperator, { borderBottomColor: colors.border }]} />
          <Ionicons name="swap-vertical" size={30} color={colors.primary} onPress={onSeperatorPress} />
          <View style={[styles.seperator, { borderBottomColor: colors.border }]} />
        </View>
        <View>
          <TextInput placeholder="To" onChangeText={setTo} value={to}/>
        </View>
      </View>
      <View style={[styles.card, { width: '50%', backgroundColor: colors.card }]}>
        <Text onPress={() => setOpenDatePicker(true)}>{date.toLocaleString('en-FI', {hour12: false, timeZone: "Europe/Helsinki"})}</Text>
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
      <Button onPress={() => navigation.navigate("Routes", {
          from: from,
          to: to,
          date: new Date(date.getTime() - (date.getTimezoneOffset()*60*1000)).toISOString().split('T')[0],
          time: date.toTimeString().split(' ')[0]
        })} title="Search"/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  }
});

export default JourneyPlannerScreen;
