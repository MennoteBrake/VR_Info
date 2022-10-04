import { useState } from 'react';
import { SafeAreaView, View, Text, Switch, StyleSheet} from 'react-native';
import { getReadableVersion } from 'react-native-device-info';

const SettingsScreen = () => {
  const [switchDarkmode, toggleSwitchDarkmode] = useState(false);
  const [switchPassenger, toggleSwitchOnlyPassenger] = useState(false);
  const [switchNonStopping, toggleSwitchNonStopping] = useState(false);

  return(
    <SafeAreaView>
      <View style={styles.groupWrapper}>
        <Text style={styles.groupHeader}>Dark Appearance</Text>
        <View style={styles.group}>
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>Dark Appearance</Text>
            <Switch onValueChange={() => toggleSwitchDarkmode(previousState => !previousState)} value={switchDarkmode} />
          </View>
        </View>
      </View>

      <View style={styles.groupWrapper}>
        <Text style={styles.groupHeader}>Trains</Text>
        <View style={styles.group}>
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>Only passenger trains</Text>
            <Switch onValueChange={() => toggleSwitchOnlyPassenger(previousState => !previousState)} value={switchPassenger} />
          </View>
          <View style={styles.hr} />
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>Show non-stopping trains</Text>
            <Switch onValueChange={() => toggleSwitchNonStopping(previousState => !previousState)} value={switchNonStopping} />
          </View>
        </View>
      </View>
      <View style={styles.version}>
        <Text>Version {getReadableVersion()}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  groupWrapper: {
    margin: 20,
    marginBottom: 10
  },
  groupHeader: {
    fontSize: 12,
    textTransform: 'uppercase',
    marginBottom: 5,
    opacity: 0.5,
    marginLeft: 10
  },
  group: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
  },
  hr: {
    borderBottomColor: '#8e8e93',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginTop: 7,
    marginBottom: 7
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 15
  },
  version: {
    flexDirection: 'row',
    justifyContent: 'center',
    opacity: 0.5,
    marginTop: 10
  }
});

export default SettingsScreen;
