/*
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button, Snackbar } from "react-native-paper";
import { saveLocation, getSavedLocations } from "../utils/LocationHelper";
import { API_KEY } from '../utils/WeatherAPIKey';
import { useFocusEffect } from '@react-navigation/native';

const SelectedLocationWeatherScreen = () => {
  const [inputedLocation, setInputedLocation] = useState('');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  // const [isLocationEntered, setIsLocationEntered] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const MAX_SAVE = 4;

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  useEffect(() => {
    if (weatherData) {
      setShowSaveButton(true);
    }
  }, [weatherData]);

  useEffect(() => {
    if (savedLocations.length >= MAX_SAVE) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
  }, [savedLocations]);

  const fetchSavedLocations = async () => {
    try {
      const locations = await getSavedLocations();
      setSavedLocations(locations);
      console.log(`Location Count: ${savedLocations.length}`)
    } catch (error) {
      console.error('Error fetching saved locations:', error);
    }
  };

  const fetchWeather = async () => {
    setError('');
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${inputedLocation}&count=10&language=en&format=json`
      );
      const data = await response.json();
      const locationResult = data.results[0];
      const { longitude, latitude } = locationResult;

      const weatherResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      setWeatherData({
        temperature: weatherData.main.temp,
        locationName: weatherData.name,
        weatherCondition: weatherData.weather[0].main,
        conditionIcon: weatherData.weather[0].icon,
      });
    } catch (error) {
      console.log(error);
      setError('Error fetching weather data');
    }
  };

  const handleSaveLocation = () => {
    if (inputedLocation.trim() === '') {
      setError('Please enter a location');
      return;
    }
    
    saveLocation(inputedLocation);
    setInputedLocation('');
    setSnackbarVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      // fetchLocations();
      fetchSavedLocations();
    }, [])
  );



  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.loadingText}>Enter location name to fetch data</Text>
        <Text style={styles.loadingText}>Location like (Halifax, Dartmouth, Toronto)</Text>
        <Text style={styles.loadingText}>You can save only 4 locations</Text>
      </View>
      <TextInput
        label="Enter location"
        value={inputedLocation}
        onChangeText={location => setInputedLocation(location)}
      />
      <Button
        mode="contained"
        onPress={fetchWeather}
        style={styles.button}
      >
        Enter
      </Button>
      {weatherData && (
        <>
          <Text>{weatherData.locationName}</Text>
          <Text>{weatherData.temperature}</Text>
          {error ? <Text>{error}</Text> : null}
          {showSaveButton && (
            <Button
              mode="contained"
              onPress={handleSaveLocation}
              style={styles.button}
            >
              Save Location
            </Button>
          )}
        </>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        Location saved successfully!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  infoContainer: {
    marginBottom: 20,
  },
  loadingText: {
    color: "black",
  },
  button: {
    marginTop: 10,
  },
  snackbar: {
    backgroundColor: '#4CAF50',
  },
});

export default SelectedLocationWeatherScreen;


*/

import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput,Text, Button, Snackbar } from "react-native-paper";
import { saveLocation, getSavedLocations } from "../utils/LocationHelper";
import { API_KEY } from '../utils/WeatherAPIKey';
import { useFocusEffect } from '@react-navigation/native';

const SelectedLocationWeatherScreen = ({navigation}) => {
  const [inputedLocation, setInputedLocation] = useState('');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [showSaveButton, setShowSaveButton] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [savedLocations, setSavedLocations] = useState([]);
  const MAX_SAVE = 4;

  useEffect(() => {
    fetchSavedLocations();
  }, []);

  useEffect(() => {
    if (savedLocations.length >= MAX_SAVE) {
      setShowSaveButton(false);
    }
  }, [weatherData]);

  useEffect(() => {
    // console.log(`saved location Length: ${savedLocations.length}`)
    console.log(savedLocations)
    if (savedLocations.length >= MAX_SAVE) {
      setShowSaveButton(false);
    }
  }, [savedLocations]);

  const fetchSavedLocations = async () => {
    try {
      const locations = await getSavedLocations();
      setSavedLocations(locations);
    } catch (error) {
      console.error('Error fetching saved locations:', error);
    }
  };

  const fetchWeather = async () => {
    setError('');
    
    try {
      const response = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${inputedLocation}&count=10&language=en&format=json`
      );
      const data = await response.json();
      const locationResult = data.results[0];
      const { longitude, latitude } = locationResult;

      const weatherResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
      );
      const weatherData = await weatherResponse.json();

      setWeatherData({
        temperature: weatherData.main.temp,
        locationName: weatherData.name,
        weatherCondition: weatherData.weather[0].main,
        conditionIcon: weatherData.weather[0].icon,
      });
    } catch (error) {
      console.error(error);
      setError('Error fetching weather data');
    }
    if (savedLocations.length >= MAX_SAVE) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
  };

  const handleSaveLocation = async () => {
    if (inputedLocation.trim() === '') {
      setError('Please enter a location');
      return;
    }

    console.log(`saved location Length: ${savedLocations.length}`)
    if (savedLocations.length >= MAX_SAVE) {
      setError('Maximum number of saved location reached');
      return;
    }
    
    await saveLocation(inputedLocation);
    setInputedLocation('');
    setShowSaveButton(false);
    setSnackbarVisible(true);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchSavedLocations();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.loadingText}>Enter location name to fetch data</Text>
        <Text style={styles.loadingText}>e.g (Halifax, Dartmouth, Toronto)</Text>
        <Text style={styles.loadingText}>You can save only 4 locations</Text>
      </View>
      <TextInput
        label="Enter location"
        value={inputedLocation}
        onChangeText={location => setInputedLocation(location)}
      />
      <Button
        mode="contained"
        onPress={() => { fetchWeather();  }}
        style={styles.button}
      >
        Enter
      </Button>
      {weatherData && (
        <>
          <Text style={styles.loadingText}>Location : {weatherData.locationName}</Text>
          <Text style={styles.loadingText}>Temperature: {weatherData.temperature}</Text>
          {error ? <Text>{error}</Text> : null}
        </>
      )}
      {showSaveButton && (
        <Button
          mode="contained"
          onPress={handleSaveLocation}
          style={styles.button}
        >
          Save Location
        </Button>
      )}
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={styles.snackbar}
      >
        Location saved successfully!
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  infoContainer: {
    marginBottom: 20,
  },
  loadingText: {
    color: "black",
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  },
  snackbar: {
    backgroundColor: '#4CAF50',
  },
});

export default SelectedLocationWeatherScreen;


