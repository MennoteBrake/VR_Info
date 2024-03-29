const API_BASE_URL = 'https://rata.digitraffic.fi/api/v1/';
const API_BASE_TRAINS = 'trains/';
const API_BASE_TRAIN_LOCATIONS = 'train-locations/';
const API_BASE_LATEST = 'latest';
const API_BASE_METADATA = 'metadata/';
const API_BASE_STATIONS = 'stations';
const API_BASE_STATION = 'live-trains/station/';
const API_BASE_TRACKNOTIFICATIONS = 'trafficrestriction-notifications.geojson';

/**
 * This function gets info about a specific train.
 *
 * @param date the date the train left e.g. 2017-01-01. Default value is "latest"
 * @param trainNumber the number of the train
 *
 * @return a JSON object with the train
 */
export const getTrainInfo = (trainNumber, date = 'latest') => {
  let callStr =
    API_BASE_URL + API_BASE_TRAINS + date + '/' + trainNumber.toString();
  return fetchJsonData(callStr);
};

/**
 * This function returns all the trains that will drive or drove on that day.
 *
 * @param date the date you want to search for the trains e.g. 2022-09-27
 * @returns JSON obj with all the trains
 */
export const getTrains = date => {
  let callStr = API_BASE_URL + API_BASE_TRAINS + date;
  return fetchJsonData(callStr);
};

/**
 * This function returns the live location of all active trains
 *
 * @param bbox Geographic demarcation with WSG84 coordinates. The first and two last numbers are used to form the points that define the bounding square. E.g. "1,1,70,70"
 * @returns JSON obj with all the locations of the active trains
 */
export const getAllTrainLocations = (bbox = '') => {
  let callStr = API_BASE_URL + API_BASE_TRAIN_LOCATIONS + API_BASE_LATEST;

  if (bbox != '') {
    callStr += '?bbox=' + bbox;
  }
  return fetchJsonData(callStr);
};

/**
 * This function returns all the departures and arrivals at a given station
 * @param station Abbreviation of the station
 * @param arrivedTrains Amount of arrived trains
 * @param arrivingTrains Amount of arriving trains
 * @param departedTrains Amount of departed trains
 * @param departingTrains Amount of departing trains
 * @returns
 */
export const getStation = (
  station,
  arrivedTrains,
  arrivingTrains,
  departedTrains,
  departingTrains,
) => {
  let callStr =
    API_BASE_URL +
    API_BASE_STATION +
    `${station}?arrived_trains=${arrivedTrains}&arriving_trains=${arrivingTrains}&departed_trains=${departedTrains}&departing_trains=${departingTrains}`;
  return fetchJsonData(callStr);
};

/**
 * This function returns all the stations.
 *
 */
export const getStations = () => {
  let callStr = API_BASE_URL + API_BASE_METADATA + API_BASE_STATIONS;

  return fetchJsonData(callStr);
};

/**
 *
 * This function returns all the trackwork notifications as GeoJSON
 * @param state Notification status, values: SENT, ACTIVE, PASSIVE, FINISHED
 * @param start The beginning of the interval
 * @param end End of time slot
 * @returns 
 */
export const getTrackNotifications = (state, start, end) => {
  let callStr = API_BASE_URL + API_BASE_TRACKNOTIFICATIONS + `?start=${start}&end=${end}`;
  return fetchJsonData(callStr);
};

/**
 * 
 * @param call a string with the API call you want to make.
 * @returns the fetched data in JSON
 */
const fetchJsonData = async call => {
  try {
    let resp = await fetch(call);
    let json = await resp.json();
    return json;
  } catch (error) {
    console.log(error);
  }
};
