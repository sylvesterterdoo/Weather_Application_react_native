import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as SQLite from 'expo-sqlite';

const ShowSavedLocations = ({ navigation, refresh }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);
  const db = SQLite.openDatabase('location.db');

  useEffect(() => {
    fetchLocations();
  }, [db]); 

  const fetchLocations = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM locations', null,
        (_, resultSet) => {
          setLocations(resultSet.rows._array);
          setIsLoading(false);
        },
        (_, error) => console.log(error)
      );
    });
  };

  const deleteLocation = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM locations WHERE id = ?', [id],
        (_, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            const updatedLocations = locations.filter(loc => loc.id !== id);
            setLocations(updatedLocations);
          }
        },
        (_, error) => console.log(error)
      );
    });
  };

  const renderLocations = () => {
    return locations.map((location, index) => (
      <View key={index} style={styles.row}>
        <Text>{location.location}</Text>
        <Button
          mode="contained"
          onPress={() => deleteLocation(location.id)}
        >
          Delete
        </Button>
      </View>
    ));
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading names...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {renderLocations()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    margin: 8
  }
});

export default ShowSavedLocations;
