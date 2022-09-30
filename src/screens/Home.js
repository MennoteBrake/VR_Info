import React, {useState} from 'react';
import {SafeAreaView, Text, ScrollView} from 'react-native';
import {SearchBar} from '../components/SearchBar';

import {fetchAllStations} from '../db/VRIStations';

const HomeScreen = () => {
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
 */
const DisplaySearchResults = par => {
  return (
    <ScrollView>
      {par.searchResults
        .filter((item, index) => index < par.amountToDisplay)
        .map((station, index) => (
          <Text key={index}>{station.stationName}</Text>
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

export default HomeScreen;
