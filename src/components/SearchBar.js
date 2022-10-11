import { TextInput, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

/**
 * Custom SearchBar component
 *
 * @param list The list you want to search
 * @param filterSearchResults a function that filters the list parameter, this function needs to have the following parameters: textToFilter, addToSearchList, list. Here the param textToFilter is the result of what is typed in the searchBar. addToSearchList is a function that can be used to add the results to the searchResult array. And the param list is the list that has to be filtered/searched
 * @param searchResults a State variable that is an array, that is used to store the search results
 * @param setSearchResults the function to set the state variable (used to clear it)
 * @param setInputFieldEmpty a function to set a boolean variable that is describing if the input field is empty or not (true == empty, false == not empty)
 * @param styles Object containing custom styling for the search bar. Optional.
 */
export const SearchBar = ({ placeholder, value, onChangeValue, list, filterSearchResults, setSearchResults, setInputFieldEmpty, styles }) => {
  const { colors } = useTheme();

  const filterList = (textToFilter, filterFunc, list) => {
    onChangeValue(textToFilter);

    if (textToFilter != '') {
      setSearchResults([]);
      filterFunc(textToFilter, list);
      setInputFieldEmpty(false);
    } else {
      setSearchResults([]);
      setInputFieldEmpty(true);
    }
  };

  return (
    <TextInput
      style={[styles, {borderColor: colors.border, color: colors.text, backgroundColor: colors.card}]}
      placeholder={placeholder}
      placeholderTextColor= {colors.text}
      onChangeText={filterText =>
        filterList(filterText, filterSearchResults, list)
      }
      value={value}
    />
  );
};

export default SearchBar;
