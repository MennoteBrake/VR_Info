import { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, StyleSheet} from 'react-native';
import { getReadableVersion } from 'react-native-device-info';

import { ThemeContext } from '../../contexts/Context';
import { useTheme } from '@react-navigation/native';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const { theme, setTheme } = useContext(ThemeContext);

  const [switchDarkmode, toggleSwitchDarkmode] = useState((theme === "dark"));
  const [switchPassenger, toggleSwitchOnlyPassenger] = useState(false);
  const [switchNonStopping, toggleSwitchNonStopping] = useState(false);

  useEffect(() => {
    setTheme(switchDarkmode ? "dark" : "light");
  }, [switchDarkmode]);

  return(
    <SafeAreaView>
      <View style={styles.groupWrapper}>
        <Text style={[styles.groupHeader, { color: colors.text }]}>Dark Appearance</Text>
        <View style={[styles.group, { backgroundColor: colors.card }]}>
          <View style={styles.itemRow}>
            <Text style={[styles.itemText, { color: colors.text}]}>Dark Appearance</Text>
            <Switch onValueChange={() => toggleSwitchDarkmode(previousState => !previousState)} value={switchDarkmode} />
          </View>
        </View>
      </View>

      <View style={styles.groupWrapper}>
        <Text style={[styles.groupHeader, { color: colors.text }]}>Trains</Text>
        <View style={[styles.group, {backgroundColor: colors.card}]}>
          <View style={styles.itemRow}>
            <Text style={[styles.itemText, { color: colors.text}]}>Only passenger trains</Text>
            <Switch onValueChange={() => toggleSwitchOnlyPassenger(previousState => !previousState)} value={switchPassenger} />
          </View>
          <View style={[styles.hr, { borderBottomColor: colors.border }]} />
          <View style={styles.itemRow}>
            <Text style={[styles.itemText, { color: colors.text}]}>Show non-stopping trains</Text>
            <Switch onValueChange={() => toggleSwitchNonStopping(previousState => !previousState)} value={switchNonStopping} />
          </View>
        </View>
      </View>
      <View style={styles.version}>
        <Text style={{color: colors.text}}>Version {getReadableVersion()}</Text>
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
    borderRadius: 10,
    padding: 10,
  },
  hr: {
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
