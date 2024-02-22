/*
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button, ActivityIndicator, List, IconButton } from 'react-native-paper';
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

  useFocusEffect(
    React.useCallback(() => {
      fetchLocations();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <List.Section>
          <List.Subheader>Locations</List.Subheader>
          {locations.map((location, index) => (
            <List.Item
              key={index}
              title={location.locationName}
              description={`Temperature: ${location.temperature}`}
              right={() => (
                <IconButton
                  icon="delete"
                  onPress={() => handleDeleteLocation(location.id)}
                />
              )}
            />
          ))}
        </List.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ShowSavedLocations;
*/


import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ActivityIndicator, List, IconButton } from 'react-native-paper';
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
    setIsLoading(true); // Set loading to true before fetching

    try {
      const result = await getSavedLocations();
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
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
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

  useFocusEffect(
    React.useCallback(() => {
      fetchLocations();
    }, [])
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator animating={true} />
      ) : (
        <List.Section>
          <List.Subheader>Locations</List.Subheader>
          {locations.map((location, index) => (
            <List.Item
              key={index}
              title={location.locationName}
              description={`Temperature: ${location.temperature}`}
              right={() => (
                <IconButton
                  icon="delete"
                  onPress={() => handleDeleteLocation(location.id)}
                />
              )}
            />
          ))}
        </List.Section>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
});

export default ShowSavedLocations;
