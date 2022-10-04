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
          console.log('errrr');
          reject(err);
        },
      );
    });
  });
  console.log('adding to favorite');
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
  console.log('deleting favorite');
  return promise;
};

export const checkIfFavoriteExists = stationShortCode => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT EXISTS(SELECT * FROM ' +
          tableName +
          ' WHERE stationShortCode=?);',
        [stationShortCode],
        (tx, result) => {
          resolve(result.rows.item(0));
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
          let items = [];
          for (let i = 0; i < result.rows.length; i++) {
            items.push(result.rows.item(i));
          }
          resolve(items);
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
