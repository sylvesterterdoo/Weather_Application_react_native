import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { getSavedLocations, deleteLocation } from '../utils/LocationHelper';
import { useFocusEffect } from '@react-navigation/native';

const ShowSavedLocations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    getSavedLocations()
      .then((result) => {
        setLocations(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching locations:', error);
        setIsLoading(false);
      });
  };

  const handleDeleteLocation = (id) => {
    deleteLocation(id)
      .then(() => fetchLocations())
      .catch((error) => console.error('Error deleting location:', error));
  };

  const renderLocations = () => {
    return locations.map((location, index) => (
      <View key={index} style={styles.row}>
        <Text>{location.location}</Text>
        <Button
          mode="contained"
          onPress={() => handleDeleteLocation(location.id)}
        >
          Delete
        </Button>
      </View>
    ));
  };

  useFocusEffect(
    React.useCallback(() => {
      // Fetch locations every time the screen comes into focus
      fetchLocations();
    }, [])
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading locations...</Text>
      </View>
    );
  }

  return <View style={styles.container}>{renderLocations()}</View>;
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
    margin: 8,
  },
});

export default ShowSavedLocations;
