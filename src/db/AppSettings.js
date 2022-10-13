import { db } from './VRIdb';

const tableName = 'settings';
export const darkThemeSettingName = "darkTheme";

export const addSetting = (settingName, enabled) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'insert into ' + tableName + ' (settingName, enabled) values(?, ? );',
        [settingName, enabled],
        () => {
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const updateSetting = (settingName, enabled) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'update ' + tableName + ' set enabled=? where settingName=?;',
        [enabled, settingName],
        () => {
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchAllSettings = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName + ';',
        [],
        (tx, result) => {
          resolve(result.rows.raw());
        },
        (err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};

export const fetchSetting = (settingName) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'select * from ' + tableName + ' where settingName=?;',
        [settingName],
        (tx, result) => {
          resolve(result.rows.raw());
        },
        (err) => {
          reject(err);
        },
      );
    });
  });
  return promise;
};
