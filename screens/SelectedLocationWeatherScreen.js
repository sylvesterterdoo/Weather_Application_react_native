import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Weather from "../components/Weather";
import * as SQLite from 'expo-sqlite';
import { API_KEY } from "../utils/WeatherAPIKey";

const SelectedLocationWeatherScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [inputedLocation, setInputedLocation] = useState('Halifax');
  const [error, setError] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    locationName: '',
    weatherCondition: '',
    conditionIcon: '',
  });
  const [locations, setLocations] = useState([]);
  const [showSaveButton, setShowSaveButton] = useState(true);

  const db = SQLite.openDatabase('location.db');

  useEffect(() => {
    initializeDatabase();
  }, []);

  const initializeDatabase = () => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, location TEXT)');
      tx.executeSql('SELECT * FROM locations', null,
        (_, resultSet) => {
          setLocations(resultSet.rows._array);
        },
        (_, error) => console.log(error)
      );
    });
  };

  const fetchWeather = () => {
    setIsLoading(true);
    setShowSaveButton(true)
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
        setWeatherData({
          temperature: json.main.temp,
          locationName: json.name,
          weatherCondition: json.weather[0].main,
          conditionIcon: json.weather[0].icon,
        });
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setError(true);
      });
  };

  const addLocation = () => {
    setShowSaveButton(false);
    db.transaction(tx => {
      tx.executeSql('INSERT INTO locations (location) values (?)', [inputedLocation],
        (_, resultSet) => {
          const updatedLocations = [...locations, { id: resultSet.insertId, name: inputedLocation }];
          setLocations(updatedLocations);
          setInputedLocation('');
        },
        (_, error) => console.log(error)
      );
    });
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
            <Text>{weatherData.locationName}</Text>
            <Text>{weatherData.temperature}</Text>
            <Text>{weatherData.weatherCondition}</Text>
            <Text>{weatherData.conditionIcon}</Text>
            {showSaveButton &&
              <Button
                mode="contained"
                onPress={addLocation}
              > Save Location </Button>
            }
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  loadingText: {
    color: "black"
  },
});

export default SelectedLocationWeatherScreen;
