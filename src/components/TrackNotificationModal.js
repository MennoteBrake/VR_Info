import { Text, View, StyleSheet } from "react-native";
import GestureRecognizer from 'react-native-swipe-gestures';

const TrackNotificationModal = ({ visibility, properties, onClose }) => {
  const capitalizeString = (text) => {
    if(!text) return;

    text = text.replaceAll("_", " ").toLowerCase();
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const startDate = new Date(properties.startDate);
  const endDate = new Date(properties.endDate);

  const startDateTime = (startDate.getHours() < 10 ? '0' : '') + startDate.getHours() + ":" + (startDate.getMinutes() < 10 ? '0' : '') + startDate.getMinutes();
  const endDateTime = (endDate.getHours() < 10 ? '0' : '') + endDate.getHours() + ":" + (endDate.getMinutes() < 10 ? '0' : '') + endDate.getMinutes();

  return(
    <GestureRecognizer onSwipeDown={() => onClose()} style={[styles.container, (visibility) && styles.visible]}>
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
          <Text>{`From ${startDate.toLocaleDateString("en-FI", { weekday: 'long' })} ${startDateTime} to ${endDate.toLocaleDateString("en-FI", { weekday: 'long' })} ${endDateTime}`}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Carried out by</Text>
          <Text>{properties.organization}</Text>
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
    backgroundColor: '#ffffff',
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
