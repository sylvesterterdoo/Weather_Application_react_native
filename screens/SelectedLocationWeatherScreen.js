
// first order of business implement the interface that uses the api 
// to request the data and display the result
// then save the result to database
// then connect the pages somehow maybe buttons or look at docs for example

import { useState, useEffect} from "react";
import { View, Text, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import Weather from "../components/Weather"
import * as SQLite from 'expo-sqlite'

import { API_KEY } from "../utils/WeatherAPIKey";

function SelectedLocationWeatherScreen({navigation}) {

  const db = SQLite.openDatabase('location.db');
  const [isLoading, setIsLoading] = useState(true);
  const [ inputedLocation, setInputedLocation ] = useState('Halifax')
  const [ error, setError] = useState('')
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    locationName: '',
    weatherCondition: '',
    conditionIcon: '',
  })
  const [ locations, setLocations ] = useState([]);
  const [ showSaveButton, setShowSaveButton ] = useState(true)
  
  const fetchWeather = () => {
    fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${inputedLocation}&count=10&language=en&format=json`
    )
		.then((res) => res.json())
		.then((json) => {
      // we just need the longitude and latitude of the inputed location
      const locationResult = json['results'][0]

      let name = locationResult['name']
      let longitude = locationResult['longitude']
      let latitude = locationResult['latitude']

      console.log('Getting location longitude and latitude')

      console.log(longitude)
      console.log(latitude)
      return fetch( 
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
      )
		})
		.then((res) => res.json())
		.then((json) => {
			setWeatherData({
        temperature: json.main.temp,
        locationName: json.name,
        weatherCondition: json.weather[0].main,
        conditionIcon: json.weather[0].icon,
      }); 
	    setIsLoading(false);	
      return json;
		})
		.catch((err) => {
			console.log(err);
			setError(true);
		});		
  };

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, location TEXT)')
    });
    
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM locations', null, 
        (txObj, resultSet) => console.log(resultSet.rows._array),
        (txObj, error) => console.log(error) 
      ); 
    });
    
  }, [locations])
  
  const addLocation = () => {
    // hide the save buttons
    setShowSaveButton(!showSaveButton);

    db.transaction(tx => {
      tx.executeSql('INSERT INTO locations (location) values (?)', [inputedLocation], 
        (txObj, resultSet) => {
          let existingLocations = [...locations];
          existingLocations.push({id: resultSet.insertId, name: inputedLocation});
          setLocations(existingLocations);
          setInputedLocation(undefined);
        },
        (txObj, error) => console.log(error) 
      );
    });    
  }


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
            onPress={() => fetchWeather()}
          > Enter </Button>
          {isLoading ? (
            <Text style={styles.loadingText}>Fetching the weather data...
            </Text>
          ) : (
            <>
              <Text> {weatherData.locationName} </Text>
              <Text> {weatherData.temperature} </Text>
              <Text> {weatherData.weatherCondition} </Text>
              <Text> {weatherData.conditionIcon} </Text>
            {showSaveButton &&
              <Button
                mode="contained" 
                onPress={() => addLocation()}
              > Save Location </Button>
            }
            </>
          )} 
      </View>   
    </View>
  );
}


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
})


export default SelectedLocationWeatherScreen;

  /*
        <>
          <Text> {weatherData.locationName} </Text>
            <Text> {weatherData.temperature} </Text>
            <Text> {weatherData.weatherCondition} </Text>
            <Text> {weatherData.conditionIcon} </Text>
        </>

      <Weather weatherData={weatherData} />
      
      		.then((json) => {
      console.log('Getting the weather')
      console.log(`isLoading ${isLoading}`)
      console.log(json.main.temp);
      console.log(json.name);
      console.log(json.weather[0].main)
      console.log(json.weather[0].icon)
    })
      
 */ 
