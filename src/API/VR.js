import React from 'react';

/**
 * This function gets info about a specific train.
 *
 * @param date the date the train left e.g. 2017-01-01. Default value is "latest"
 * @param trainNumber the number of the train
 *
 * @return a JSON object with the train
 */
export const getTrainInfo = (trainNumber, date = "latest") => {
    let callStr = 'https://rata.digitraffic.fi/api/v1/trains/' + date + "/" + trainNumber.toString();
    return fetchJsonData(callStr);  
};

/**
 * This function returns all the trains that will drive or drove on that day. 
 * 
 * @param date the date you want to search for the trains e.g. 2022-09-27
 * @returns JSON obj with all the trains
 */
export const getTrains = (date) => {
  let callStr = 'https://rata.digitraffic.fi/api/v1/trains/' + date;
  return fetchJsonData(callStr);
};

/**
 * This function returns the live location of all active trains
 * 
 * @param bbox Geographic demarcation with WSG84 coordinates. The first and two last numbers are used to form the points that define the bounding square. E.g. "1,1,70,70"
 * @returns JSON obj with all the locations of the active trains
 */
 export const getAllTrainLocations = (bbox = "") => {
    let callStr = 'https://rata.digitraffic.fi/api/v1/train-locations/latest';

    if(bbox != "")
    {
        callStr+= "?bbox=" + bbox;
    }
    console.log(callStr);
    return fetchJsonData(callStr);
  };

/**
 * 
 * @param call a string with the API call you want to make.
 * @returns 
 */
const fetchJsonData = async (call) => {
  try {
    let resp = await fetch(call);
    let json = await resp.json();
    return json;
    
  } catch (error) {
    console.log(error);
  }
};
