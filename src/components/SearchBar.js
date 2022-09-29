import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';

export const SearchBar = (par) => {
  const [searchResults, setSearchResults] = useState([]);

  function addToSearchList(item) {
    setSearchResults(searchResults => [...searchResults, item]);
  }

  function filterList(textToFilter) {
    if (textToFilter != '') {
      let i = 0;
      setSearchResults([]); // clear the array
      par.list
        .filter(item =>
            item.stationName
            .toLowerCase()
            .includes(textToFilter.toLowerCase()),
        )
        .map(item => addToSearchList(item));
    } else {
      setSearchResults([]);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={filterList}
      />
      {/* 
        TODO: 
        - this has to be replaced by a custom component that is given as a parameter 
        - also limit the amount that will get mapped on screen to for example 10 or 20
      */}
      <ScrollView>
        {searchResults.map((station, index) => (
          <Text key={index}>{station.stationName}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  search: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    width: '95%',
    textAlign: 'center',
  },
});
