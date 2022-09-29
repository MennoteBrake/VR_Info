import React, {useState} from 'react';
import {SafeAreaView, Text} from 'react-native';
import {SearchBar} from '../components/SearchBar';

import {fetchAllStations} from '../db/VRIStations'

const HomeScreen = () => {
  const [stationList, setStationList] = useState([]);
  
  if(stationList.length === 0)
  {
    getAllStations(setStationList);
    // setStationList(getAllStations());
    // setStationList(fetchStations().catch(console.error));
  }
  
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
      <SearchBar list={stationList}/>
    </SafeAreaView>
  );
};
// this takes a bit to long to do it this way, maybe do it on initialization of the app?
async function getAllStations(setStationList){
  try{
    const data = await fetchAllStations();
    console.log(data);
    setStationList(data);
  }
  catch(err){
    console.log(err);
  }
}

export default HomeScreen;
