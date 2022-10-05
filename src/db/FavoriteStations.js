import {db} from './VRIdb';

const tableName = 'favoriteStationsVR';

export const addFavoriteStation = stationShortCode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'insert into ' + tableName + ' (stationShortCode) values(?);',
        [stationShortCode],
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

export const deleteFavoriteStation = stationShortCode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'delete from ' + tableName + ' where stationShortCode=?;',
        [stationShortCode],
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

export const checkIfFavoriteExists = stationShortCode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' +
          tableName +
          ' where stationShortCode=?;',
        [stationShortCode],
        (tx, result) => {
          resolve(result.rows.length > 0);
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

export const fetchAllFavoriteStations = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select ' +
          tableName +
          '.stationShortCode, stationsVR.stationName from ' +
          tableName +
          ' inner join stationsVR on ' +
          tableName +
          '.stationShortCode=stationsVR.stationShortCode',
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
