import {db} from './VRIdb';

const tableName = 'stationsVR';

export const addStation = (
  passengerTraffic,
  type,
  stationName,
  stationShortCode,
  stationUICCode,
  countryCode,
  longitude,
  latitude,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'insert into ' +
          tableName +
          '(passengerTraffic, type, stationName, stationShortCode, stationUICCode, countryCode, longitude, latitude) values(?,?,?,?,?,?,?,?);',
        [
          passengerTraffic,
          type,
          stationName,
          stationShortCode,
          stationUICCode,
          countryCode,
          longitude,
          latitude,
        ],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
export const updateStation = (
  id,
  passengerTraffic,
  type,
  stationName,
  stationShortCode,
  stationUICCode,
  countryCode,
  longitude,
  latitude,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'update stationsVR set passengerTraffic=?, type=?, stationName=?, stationShortCode=?, stationUICCode=?, countryCode=?, longitude=?, latitude=? where id=?;',
        [
          passengerTraffic,
          type,
          stationName,
          stationShortCode,
          stationUICCode,
          countryCode,
          longitude,
          latitude,
          id,
        ],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllStations = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName,
        [],
        (tx, result) => {
          resolve(result.rows.raw()); 
        },
        (tx, err) => {
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchStationName = stationShortCode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName + ' where stationShortCode=?;',
        [stationShortCode],
        (tx, result) => {
          resolve(result.rows.raw()); 
        },
        (tx, err) => {
          console.log(err);
          reject(err);
        },
      );
    });
  });
  return promise;
};
