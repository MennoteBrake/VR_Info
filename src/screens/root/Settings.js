import { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, Switch, StyleSheet} from 'react-native';
import { getReadableVersion } from 'react-native-device-info';
import { useTheme } from '@react-navigation/native';

import { ThemeContext } from '../../contexts/Context';
import { fetchSetting, updateSetting, darkThemeSettingName } from '../../db/AppSettings';

const SettingsScreen = () => {
  const { colors } = useTheme();
  const { theme, setTheme } = useContext(ThemeContext);

  const [switchDarkmode, toggleSwitchDarkmode] = useState((theme === "dark"));

  useEffect(()=> {
    fetchSetting(darkThemeSettingName)
    .then((setting) => {
      toggleSwitchDarkmode((setting[0].enabled) ? true : false);
    })
    .catch(console.error);
  },[]);

  useEffect(() => {
    setTheme(switchDarkmode ? "dark" : "light");
    updateSetting(darkThemeSettingName, switchDarkmode);
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
