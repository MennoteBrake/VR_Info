import { TextInput, View, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

/**
 * Custom SearchBar component
 *
 * @param placeholder Placeholder for the input field
 * @param value Value of the input field. State managed by parent component
 * @param onChangeValue Callback for when the input changes. State managed by parent component
 * @param list The list you want to search
 * @param filterSearchResults a function that filters the list parameter, this function needs to have the following parameters: textToFilter, addToSearchList, list. Here the param textToFilter is the result of what is typed in the searchBar. addToSearchList is a function that can be used to add the results to the searchResult array. And the param list is the list that has to be filtered/searched
 * @param setSearchResults the function to set the state variable (used to clear it)
 * @param setInputFieldEmpty a function to set a boolean variable that is describing if the input field is empty or not (true == empty, false == not empty)
 * @param customStyles Object containing custom styling for the search bar. Optional.
 */
const SearchBar = ({ placeholder, value, onChangeValue, list, filterSearchResults, setSearchResults, setInputFieldEmpty, customStyles }) => {
  const { colors } = useTheme();

  const filterList = (textToFilter, filterFunc, list) => {
    onChangeValue(textToFilter);
    setSearchResults([]);

    if (textToFilter != '') {
      filterFunc(textToFilter, list);
      setInputFieldEmpty(false);
    } else {
      setInputFieldEmpty(true);
    }
  };

  const onClearPress = () => {
    onChangeValue("");
    setSearchResults([]);
    setInputFieldEmpty(true);
  };

  return (
    <View style={[styles.container, customStyles, { borderColor: colors.border, color: colors.text, backgroundColor: colors.card }]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor= {colors.text}
        onChangeText={filterText =>
          filterList(filterText, filterSearchResults, list)
        }
        value={value}
      />
      <Ionicons name="close-circle-outline" size={20} color={colors.text} onPress={onClearPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});

export default SearchBar;
