//import { useEffect, useState } from "react";
//import { API_KEY } from "./utils/WeatherAPIKey";
//import Weather from "./components/Weather";
//import * as Location from "expo-location";
import { Text, View } from "react-native";
import { StatusBar } from "react-native";
import { PaperProvider } from "react-native-paper"; 
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native"

import CurrentWeatherScreen from "./screens/CurrentWeatherScreen";
import SelectedLocationWeather from "./screens/SelectedLocationWeatherScreen";

const Stack = createNativeStackNavigator();

export default function App() {
 //<Stack.Screen 
          //  name="CurrentWeatherScreen" 
          //  component={CurrentWeatherScreen}
          //  options = {{title: "Current Weather Screen"}}
          ///>
  return (
    <PaperProvider>
      <StatusBar style="dark" /> 
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          
          <Stack.Screen
            name="SelectedLocationWeather" 
            component={SelectedLocationWeather}
            options={{title: "Display Selected Weather Screen"}}
          />
        </Stack.Navigator> 
      </NavigationContainer>
    </PaperProvider>
  );
}

const screenOptions = {
  headerTintColor: "#282120",
  headerStyle: { backgroundColor: "#FAD02C" },
  headerTitleStyle: { color: "#282120" },
};
