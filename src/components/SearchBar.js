import React, {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

/**
 * Custom SearchBar component
 *
 * @param {*} par This function has a few properties that it needs, these are explained below.
 * @param list The list you want to search
 * @param amountToDisplay The amount of results to show in the rendered results
 * @param filterSearchResults a function that filters the list parameter, this function needs to have the following parameters: textToFilter, addToSearchList, list. Here the param textToFilter is the result of what is typed in the searchBar. addToSearchList is a function that can be used to add the results to the searchResult array. And the param list is the list that has to be filtered/searched
 * @param DisplaySearchResults a custom component that is used to display the search results. This custom component needs to support the following parameters: searchResults amountToDisplay. Where the param searchResults is an arraylist of the search results, and amountToDisplay the amount of results to display
 * @returns
 */
export const SearchBar = par => {
  const [searchResults, setSearchResults] = useState([]);
  const [isInputFieldEmpty, setInputFieldEmpty] = useState(true);

  function addToSearchList(item) {
    setSearchResults(searchResults => [...searchResults, item]);
  }

  function filterList(textToFilter, filterFunc, list) {
    if (textToFilter != '') {
      setSearchResults([]); // clear the array
      filterFunc(textToFilter, addToSearchList, list);
      setInputFieldEmpty(false);
    } else {
      setSearchResults([]);
      setInputFieldEmpty(true);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder="Search"
        onChangeText={filterText =>
          filterList(filterText, par.filterSearchResults, par.list)
        }
      />
      {
        <par.DisplaySearchResults
          searchResults={searchResults}
          amountToDisplay={par.amountToDisplay}
          setSearchResults={setSearchResults}
          isInputEmpty={isInputFieldEmpty}
        />
      }
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
