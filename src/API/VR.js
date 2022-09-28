const API_BASE_URL = "https://rata.digitraffic.fi/api/v1/";
const API_BASE_TRAINS = 'trains/';
const API_BASE_TRAIN_LOCATIONS = 'train-locations/';
const API_BASE_LATEST = 'latest';
/**
 * This function gets info about a specific train.
 *
 * @param date the date the train left e.g. 2017-01-01. Default value is "latest"
 * @param trainNumber the number of the train
 *
 * @return a JSON object with the train
 */
export const getTrainInfo = (trainNumber, date = "latest") => {
    let callStr = API_BASE_URL + API_BASE_TRAINS + date + "/" + trainNumber.toString();
    return fetchJsonData(callStr);  
};

/**
 * This function returns all the trains that will drive or drove on that day. 
 * 
 * @param date the date you want to search for the trains e.g. 2022-09-27
 * @returns JSON obj with all the trains
 */
export const getTrains = (date) => {
  let callStr = API_BASE_URL + API_BASE_TRAINS + date;
  return fetchJsonData(callStr);
};

/**
 * This function returns the live location of all active trains
 * 
 * @param bbox Geographic demarcation with WSG84 coordinates. The first and two last numbers are used to form the points that define the bounding square. E.g. "1,1,70,70"
 * @returns JSON obj with all the locations of the active trains
 */
 export const getAllTrainLocations = (bbox = "") => {
    let callStr = API_BASE_URL + API_BASE_TRAIN_LOCATIONS + API_BASE_LATEST;

    if(bbox != "")
    {
        callStr+= "?bbox=" + bbox;
    }
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
