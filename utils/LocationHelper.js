import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('location.db');

export const saveLocation = (location) => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, location TEXT)'
    );
    tx.executeSql('INSERT INTO locations (location) values (?)', [location],
      (_, resultSet) => {
        console.log('Location saved successfully:', location);
      },
      (_, error) => {
        console.log('Error saving location:', error);
      }
    );
  });
};

export const getSavedLocations = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM locations', null,
        (_, resultSet) => {
          const locations = resultSet.rows._array;
          console.log('Fetched locations:', locations);
          resolve(locations);
        },
        (_, error) => {
          console.log('Error fetching locations:', error);
          reject(error);
        }
      );
    });
  });
};

export const deleteLocation = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM locations WHERE id = ?', [id],
        (_, resultSet) => {
          console.log('Location deleted successfully:', id);
          resolve();
        },
        (_, error) => {
          console.log('Error deleting location:', error);
          reject(error);
        }
      );
    });
  });
};