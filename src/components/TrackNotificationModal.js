import { Text, View, StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';
import GestureRecognizer from 'react-native-swipe-gestures';

/**
 * Displays a view with detailed information of the track notification
 * @param {*} visibility Whether or not the modal is visible
 * @param {*} properties Properties of the notification 
 * @param {*} onClose Method that gets called when the user swipes down to close it
 * @returns 
 */
const TrackNotificationModal = ({ visibility, properties, onClose }) => {
  const { colors } = useTheme();

  const capitalizeString = (text) => {
    if(!text) return;

    text = text.replaceAll("_", " ").toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const startDate = new Date(properties.startDate);
  const endDate = new Date(properties.endDate);

  // convert to correct time notation, e.g. 12:1 should be 12:01
  const startDateTime = (startDate.getHours() < 10 ? '0' : '') + startDate.getHours() + ":" + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes();
  const endDateTime = (endDate.getHours() < 10 ? '0' : '') + endDate.getHours() + ":" + (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes();

  let renderStartDate = `From ${startDate.toLocaleDateString("en-FI", { weekday: 'long' })} ${startDateTime}`;
  let renderEndDate = "";
  if(properties.endDate)
  {
    renderEndDate = ` to ${endDate.toLocaleDateString("en-FI", { weekday: 'long' })} ${endDateTime}`;
  }

  return(
    <GestureRecognizer onSwipeDown={() => onClose()} style={[styles.container, (visibility) && styles.visible, { backgroundColor: colors.card }]}>
      <View style={styles.gestureBarContainer}>
        <View style={styles.gestureBar}></View>
      </View>
      <View style={styles.content}>
        <View>
          <Text style={styles.smallHeader}>Traffic restriction</Text>
          <Text style={styles.limitation}>{capitalizeString(properties.limitation)}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>When</Text>
          <Text style={{ color: colors.text }}>{`${renderStartDate} ${renderEndDate}`}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Carried out by</Text>
          <Text style={{ color: colors.text }}>{properties.organization}</Text>
        </View>
      </View>
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  gestureBarContainer: {
    marginTop: 5,
    alignItems: 'center'
  },
  gestureBar: {
    width: 100,
    height: 5,
    borderRadius: 20,
    backgroundColor: '#858282'
  },
  container: {
    flex: 0.5,
    marginTop: 'auto',
    display: 'none',
    paddingBottom: 20
  },
  visible: {
    display: 'flex'
  },
  content: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between'
  },
  smallHeader: {
    marginBottom: 5,
    fontWeight: '700',
    color: '#858282'
  },
  limitation: {
    color: '#ff8800',
    fontWeight: '700',
    fontSize: 25,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#00b451',
    marginBottom: 10
  }
});

export default TrackNotificationModal;
