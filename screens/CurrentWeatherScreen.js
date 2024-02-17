import { 
  StyleSheet,
  Text,
  View
} from "react-native";
import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { API_KEY } from "../utils/WeatherAPIKey";
import Weather from "../components/Weather"

function CurrentWeatherScreen({navigation}) {

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    locationName: '',
    weatherCondition: '',
    conditionIcon: '',
  })
  
  
  const fetchWeather = (latitude = 25, longitude = 25) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    )
		.then((res) => res.json())
		.then((json) => {
      console.log(json)
			setWeatherData({
        temperature: json.main.temp,
        locationName: json.name,
        weatherCondition: json.weather[0].main,
        conditionIcon: json.weather[0].icon,
      });
	    setIsLoading(false);	
		})
		.catch((err) => {
			console.log(err);
			setError(true);
		});		
  };
  
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      
      // Get permission to get location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }
      
      // Get location (if permission is granted)
      let location = await Location.getCurrentPositionAsync({})
      
      // Fetch Weather data from locationn's latitude and longitude
      fetchWeather(location.coords.latitude, location.coords.longitude);

    })();
  }, [])

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text style={styles.loadingText}>Fetching the weather data...
        </Text>
      ) : (
        <Weather weatherData={weatherData} />
        //<Text> show some data </Text>
      )} 
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

export default CurrentWeatherScreen;
