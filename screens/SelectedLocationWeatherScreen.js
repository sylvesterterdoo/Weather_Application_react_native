import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Weather from "../components/Weather";
import { saveLocation } from "../utils/LocationHelper";

import { API_KEY } from '../utils/WeatherAPIKey';

const SelectedLocationWeatherScreen = () => {
  const [isLocationEntered, setIsLocationEntered] = useState(false);
  const [inputedLocation, setInputedLocation] = useState('');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    locationName: '',
    weatherCondition: '',
    conditionIcon: '',
  });
  const [showSaveButton, setShowSaveButton] = useState(true);
  const [countLocations, setCountLocations ] = useState(0);

  const MAX_SAVE = 4;
  const fetchWeather = () => {
    setIsLocationEntered(true);
    setError('');
    if (countLocations > MAX_SAVE) {
      setShowSaveButton(false);
    } else {
      setShowSaveButton(true);
    }
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${inputedLocation}&count=10&language=en&format=json`
    )
      .then(res => res.json())
      .then(json => {
        const locationResult = json['results'][0];
        const { longitude, latitude } = locationResult;

        return fetch(
          `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
        );
      })
      .then(res => res.json())
      .then(json => {
        // console.log(json)
        setWeatherData({
          temperature: json.main.temp,
          locationName: json.name,
          weatherCondition: json.weather[0].main,
          conditionIcon: json.weather[0].icon,
        });
      })
      .catch(err => {
        console.log(err);
        setError('Error fetching weather data');
      })
      .finally(() => {
        setIsLocationEntered(true);
      });
  };

  const handleSaveLocation = () => {
    console.log(`Saved : ${countLocations}`)
    setCountLocations(countLocations + 1);
    setShowSaveButton(false)
    saveLocation(inputedLocation);
    setInputedLocation('');
    setIsLocationEntered(false);
    setError('');
  };

  return (
    <View>
      <View>
        <TextInput
          label="Enter location"
          value={inputedLocation}
          onChangeText={location => setInputedLocation(location)}
        />
        <Button
          mode="contained"
          onPress={fetchWeather}
        > Enter </Button>


        {!isLocationEntered ? (
          <View>
            <Text style={styles.loadingText}>Enter location name to fetch data</Text>
            <Text style={styles.loadingText}>Location like (Halifax, Dartmouth, Toronto)</Text>
            <Text style={styles.loadingText}>You can save only 4 locations</Text>
          </View>
        ) : (
          <>
            {/* <Weather weatherData={weatherData} /> */}
            <Text>{weatherData.name}</Text>
            <Text>{weatherData.temperature}</Text>
            {error ? <Text>{error}</Text> : null}
            {showSaveButton &&
              <Button
                mode="contained"
                onPress={handleSaveLocation}
              > Save Location </Button>
            }
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loadingText: {
    color: "black"
  },
});

export default SelectedLocationWeatherScreen;
