import {openDatabase} from 'react-native-sqlite-storage';

export var db = openDatabase({name: 'VRI.db'});

const createStationsVR =
  'create table if not exists stationsVR (id INTEGER not null primary key, passengerTraffic NUMERIC not null, type TEXT not null, stationName TEXT not null, stationShortCode TEXT not null, stationUICCode INTEGER not null, countryCode TEXT not null, longitude REAL not null, latitude REAL not null);';
const createFavoriteStationsVR =
  'create table if not exists favoriteStationsVR (id INTEGER not null primary key, stationShortCode TEXT not null) ;';
const dropQuery = 'drop table if exists ';

const basicSqlQuery = sqlStatement => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        sqlStatement,
        [],
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

export const initDB = async() => {
  basicSqlQuery(dropQuery + 'stationsVR');
  basicSqlQuery(dropQuery + 'favoriteStationsVR');// this needs to be commented out in the production version
  basicSqlQuery(createStationsVR);
  basicSqlQuery(createFavoriteStationsVR);
};
