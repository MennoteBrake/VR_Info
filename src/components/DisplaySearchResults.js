import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';

/**
 * This component is used by the searchbar to display the search results.
 *
 * @param searchResults An arraylist with the results of the search that needs to be displayed.
 * @param amountToDisplay The amount of results to display on screen.
 * @param setSearchResults The set function for the searchResults arrayList
 * @param isInputEmpty boolean, is true when the input field is empty, and false when it isn't
 * @param onPressFunc function with the page to navigate to. This needs to have one parameter, and that is displayItem, the item that is being displayed.
 * @param renderResult A custom component that does the displaying of the search results. this needs the following parameters, setSearchResults, isInputEmpty, displayItem (the item needs to be displayed) and useFavorites
 * @param useFavorites boolean, if true it will display a list with favorite results when nothing is searched
 * @param fetchFavorites a function that is used to fetch the favorites out of the database, this is not used when useFavorites == false
 */
const DisplaySearchResults = par => {
  async function getFavorites() {
    try {
      const data = await par.fetchFavorites();
      par.setSearchResults(data);
    } catch (err) {
      console.log(err);
    }
  }

  if (par.isInputEmpty && par.useFavorites) {
    getFavorites();
  }

  return (
    <ScrollView style={styles.results}>
      {par.searchResults
        .filter((item, index) => index < par.amountToDisplay)
        .map((displayItem, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => par.onPressFunc(displayItem)}>
            <par.renderResult
              setSearchResults={par.setSearchResults}
              isInputEmpty={par.isInputEmpty}
              displayItem={displayItem}
              useFavorites={par.useFavorites}
            />
          </TouchableOpacity>
        ))}
    </ScrollView>
  );
};

export default DisplaySearchResults;

const styles = StyleSheet.create({
  results: {
    width: '95%',
  },
});
