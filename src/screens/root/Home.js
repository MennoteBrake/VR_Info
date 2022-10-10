import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {SearchBar} from '../../components/SearchBar';
import {fetchAllStations} from '../../db/VRIStations';
import {fetchAllFavoriteStations} from '../../db/FavoriteStations';
import DisplaySearchResults from '../../components/DisplaySearchResults';

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

  const navigateOnPress = displayItem => {
    navigation.navigate('Station Details', {
      shortCode: displayItem.stationShortCode,
      stationName: displayItem.stationName,
    });
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
        onPressFunc={navigateOnPress}
        renderResult={DisplayStationSearchResults}
        useFavorites={true}
        fetchFavorites={fetchAllFavoriteStations}
      />
    </SafeAreaView>
  );
};

const getAllStations = async setStationList => {
  try {
    const data = await fetchAllStations();
    setStationList(data);
  } catch (err) {
    console.log(err);
  }
};

/**
 * This component is used
 *
 * @param setSearchResults function to set the search result array.
 * @param isInputEmpty Boolean that states if the input field is empty or not.
 * @param displayItem The item that needs to be displayed
 * @param useFavorites Boolean that states if it needs to use the favorites. If true it does.
 */
const DisplayStationSearchResults = par => {
  const {colors} = useTheme();

  return (
    <View style={[styles.searchResults, {borderBottomColor: colors.text}]}>
      <View style={styles.basicSearchResults}>
        <Ionicons
          name="train-sharp"
          size={32}
          color={colors.stationIcon}></Ionicons>
        <Text style={[styles.searchResultsText, {color: colors.text}]}>
          {par.displayItem.stationName}
        </Text>
      </View>
      <View>
        {
          (par.isInputEmpty && par.useFavorites) && <Ionicons name={'bookmark'} size={32} color={colors.stationIcon}></Ionicons>
        }
      </View>
    </View>
  );
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
