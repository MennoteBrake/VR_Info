import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {SearchBar} from '../../components/SearchBar';

import {fetchAllStations} from '../../db/VRIStations';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchAllFavoriteStations} from '../../db/FavoriteStations';

let stackNavigation;

const HomeScreen = ({navigation}) => {
  stackNavigation = navigation;
  const [stationList, setStationList] = useState([]);
  const amountOfItemsToDisplay = 20;

  if (stationList.length === 0) {
    getAllStations(setStationList);
  }

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <SearchBar
        list={stationList}
        amountToDisplay={amountOfItemsToDisplay}
        filterSearchResults={filterStations}
        DisplaySearchResults={DisplaySearchResults}
      />
    </SafeAreaView>
  );
};

/**
 * This function is used by the searchbar to filter the arraylist to get the search results.
 *
 * @param {*} textToFilter The text that is used to filter.
 * @param {*} addToSearchList A function to add to the array list of the search results.
 * @param {*} list The list it needs to filter.
 */
const filterStations = (textToFilter, addToSearchList, list) => {
  list
    .filter(item =>
      item.stationName.toLowerCase().includes(textToFilter.toLowerCase()),
    )
    .map(item => addToSearchList(item));
};

/**
 * This component is used by the searchbar to display the search results.
 *
 * @param searchResults An arraylist with the results of the search that needs to be displayed.
 * @param amountToDisplay The amount of results to display on screen.
 * @param setSearchResults The set function for the searchResults arrayList
 */
const DisplaySearchResults = par => {
  async function getFavorites() {
    try {
      const data = await fetchAllFavoriteStations();
      par.setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  }

  if (par.isInputEmpty) {
    getFavorites();
  }

  return (
    <ScrollView style={styles.results}>
      {par.searchResults
        .filter((item, index) => index < par.amountToDisplay)
        .map((station, index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              stackNavigation.navigate('Station Details', {
                shortCode: station.stationShortCode,
              })
            }>
            <View style={styles.searchResults}>
              <Ionicons name="train-sharp" size={32}></Ionicons>
              <Text style={styles.searchResultsText}>
                {station.stationName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

// this takes a bit to long to do it this way, maybe do it on initialization of the app?
async function getAllStations(setStationList) {
  try {
    const data = await fetchAllStations();
    setStationList(data);
  } catch (err) {
    console.log(err);
  }
}

const styles = StyleSheet.create({
  results: {
    width: '95%',
  },
  searchResults: {
    flexDirection: 'row',
    width: '95%',
    height: 50,
    paddingTop: 7,
    borderBottomColor: 'gray',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  searchResultsText: {
    paddingTop: 7,
    paddingLeft: 15,
  },
});

export default HomeScreen;
