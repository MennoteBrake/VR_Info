import { ScrollView, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';

const StationSearchResults = ({ results, onResultPress }) => {
  const { colors } = useTheme();

  return(
    (results) ? (
      <ScrollView style={styles.container}>
        {
          results.map((station, index) => {
            return(
              <View key={index} style={[styles.resultRow, { borderColor: colors.border }]}>
                <Text onPress={() => onResultPress(station)} style={[styles.result, { color: colors.text }]}>{station.stationName}</Text>
              </View>
            );
          })
        }
      </ScrollView>
    ) : null
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  resultRow: {
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  result: {
    fontWeight: 'bold',
    marginTop: 5
  }
});

export default StationSearchResults;
