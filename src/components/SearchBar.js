import React, {useState} from 'react';
import {TextInput, StyleSheet, View} from 'react-native';
import { useTheme } from '@react-navigation/native';

/**
 * Custom SearchBar component
 *
 * @param {*} par This function has a few properties that it needs, these are explained below.
 * @param list The list you want to search
 * @param filterSearchResults a function that filters the list parameter, this function needs to have the following parameters: textToFilter, addToSearchList, list. Here the param textToFilter is the result of what is typed in the searchBar. addToSearchList is a function that can be used to add the results to the searchResult array. And the param list is the list that has to be filtered/searched
 * @param searchResults a State variable that is an array, that is used to store the search results
 * @param setSearchResults the function to set the state variable (used to clear it)
 * @param setInputFieldEmpty a function to set a boolean variable that is describing if the input field is empty or not (true == empty, false == not empty)
 */
export const SearchBar = par => {
  const { colors } = useTheme();
  function filterList(textToFilter, filterFunc, list) {
    if (textToFilter != '') {
      par.setSearchResults([]);
      filterFunc(textToFilter, list);
      par.setInputFieldEmpty(false);
    } else {
      par.setSearchResults([]);
      par.setInputFieldEmpty(true);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.search, {borderColor: colors.border, color: colors.text, backgroundColor: colors.card}]}
        placeholder="Search"
        placeholderTextColor= {colors.text}
        onChangeText={filterText =>
          filterList(filterText, par.filterSearchResults, par.list)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop:10
  },
  search: {
    borderWidth: 2,
    borderRadius: 20,
    width: '95%',
    textAlign: 'center',
  },
});
