import { ScrollView, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme } from '@react-navigation/native';

const StationSearchResults = ({ results, onResultPress }) => {
  const { colors } = useTheme();

  return(
    (results) ? (
      <ScrollView style={styles.container}>
        {
          results.map((station, index) => {
            return(<Text key={index} onPress={() => onResultPress(station)} style={[styles.result, { color: colors.text }]}>{station.stationName}</Text>);
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
  result: {
    fontWeight: 'bold',
    marginTop: 5
  }
});

export default StationSearchResults;
