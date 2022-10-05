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

const HomeScreen = ({navigation}) => {
  const [searchResults, setSearchResults] = useState([]);
  const [isInputFieldEmpty, setInputFieldEmpty] = useState(true);
  const [stationList, setStationList] = useState([]);
  const amountOfItemsToDisplay = 20;

  function addToSearchList(item) {
    setSearchResults(searchResults => [...searchResults, item]);
  }

  const filterStations = (textToFilter, list) => {
    list
      .filter(item =>
        item.stationName.toLowerCase().includes(textToFilter.toLowerCase()),
      )
      .map(item => addToSearchList(item));
  };

  if (stationList.length === 0) {
    getAllStations(setStationList);
  }

  return (
    <SafeAreaView style={styles.homeView}>
      <SearchBar
        list={stationList}
        filterSearchResults={filterStations}
        searchResults={searchResults}
        setSearchResults={setSearchResults}
        setInputFieldEmpty={setInputFieldEmpty}
      />

      <DisplaySearchResults
        searchResults={searchResults}
        amountToDisplay={amountOfItemsToDisplay}
        setSearchResults={setSearchResults}
        isInputEmpty={isInputFieldEmpty}
        stackNavigation={navigation}
      />
    </SafeAreaView>
  );
};

/**
 * This component is used by the searchbar to display the search results.
 *
 * @param searchResults An arraylist with the results of the search that needs to be displayed.
 * @param amountToDisplay The amount of results to display on screen.
 * @param setSearchResults The set function for the searchResults arrayList
 * @param stackNavigation The parameter used to navigate to a page on the stackNavigation
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

  const addFavoriteIcon = () => {
    if (par.isInputEmpty) {
      return <Ionicons name="bookmark" size={32}></Ionicons>;
    }
  };

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
              par.stackNavigation.navigate('Station Details', {
                shortCode: station.stationShortCode,
              })
            }>
            <View style={styles.searchResults}>
              <View style={styles.basicSearchResults}>
                <Ionicons name="train-sharp" size={32}></Ionicons>
                <Text style={styles.searchResultsText}>
                  {station.stationName}
                </Text>
              </View>
              <View>{addFavoriteIcon()}</View>
            </View>
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

// this takes a bit to long to do it this way, maybe do it on initialization of the app?
const getAllStations = async setStationList => {
  try {
    const data = await fetchAllStations();
    setStationList(data);
  } catch (err) {
    console.log(err);
  }
};

const styles = StyleSheet.create({
  homeView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
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
  basicSearchResults: {
    flexDirection: 'row',
    width: '95%',
    height: 50,
    paddingTop: 7,
  },
  searchResultsText: {
    paddingTop: 7,
    paddingLeft: 15,
  },
});

export default HomeScreen;
