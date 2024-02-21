import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Weather from "../components/Weather";
import { saveLocation } from "../utils/LocationHelper";

import { API_KEY } from '../utils/WeatherAPIKey';

const SelectedLocationWeatherScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputedLocation, setInputedLocation] = useState('');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    locationName: '',
    weatherCondition: '',
    conditionIcon: '',
  });

  const fetchWeather = () => {
    setIsLoading(true);
    setError('');
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
        print(json)
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
        setIsLoading(false);
      });
  };

  const handleSaveLocation = () => {
    saveLocation(inputedLocation);
    setInputedLocation('');
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


        {isLoading ? (
          <Text style={styles.loadingText}>Fetching the weather data...</Text>
        ) : (
          <>
            <Weather weatherData={weatherData} />
            {error ? <Text>{error}</Text> : null}
            <Button
              mode="contained"
              onPress={handleSaveLocation}
            > Save Location </Button>
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
