import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { getSavedLocations, deleteLocation } from '../utils/LocationHelper';
import { useFocusEffect } from '@react-navigation/native';

import { API_KEY } from '../utils/WeatherAPIKey';

const ShowSavedLocations = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const result = await getSavedLocations();
      console.log('hey')
      console.log(result);
      const tempWeather = await Promise.all(result.map(async (location) => {
        try {
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location.location}&count=10&language=en&format=json`
          );
          const geoJson = await geoRes.json();
          const locationResult = geoJson['results'][0];
          const { longitude, latitude } = locationResult;

          const weatherRes = await fetch(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
          );
          const weatherJson = await weatherRes.json();

          return {
            temperature: weatherJson.main.temp,
            locationName: weatherJson.name,
            weatherCondition: weatherJson.weather[0].main,
            id: location.id // Assuming you have an id property in your location objects
          };
        } catch (error) {
          console.log(error);
          return null;
        }
      }));

      setLocations(tempWeather.filter(location => location !== null));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setIsLoading(false);
    }
  };

  const handleDeleteLocation = async (id) => {
    try {
      await deleteLocation(id);
      await fetchLocations();
    } catch (error) {
      console.error('Error deleting location:', error);
    }
  };

  const renderLocations = () => {
    return locations.map((location, index) => (
      <View key={index} style={styles.row}>
        <Text>{location.locationName}</Text>
        <Text>{location.temperature}</Text>
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

  return <View style={styles.container}>
     <Text>Location</Text>
     <Text>Temperature</Text>
    
    {renderLocations()}
    </View>;
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
