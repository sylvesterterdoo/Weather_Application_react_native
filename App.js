import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation, Text } from 'react-native-paper';

import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import SelectedLocationWeatherScreen from './screens/SelectedLocationWeatherScreen';
import ShowSavedLocations from './screens/ShowSavedLocations';

const Tab = createBottomTabNavigator();

export default function App() {
  
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'currentWeatherScreen', title: 'Current Location', focusedIcon: 'crosshairs-gps' },
    { key: 'selectedLocationWeatherScreen', title: 'Select Location', focusedIcon: 'map-marker-check', unfocusedIcon: 'earth' },
    { key: 'showSavedLocations', title: 'Saved Locations', focusedIcon: 'database', unfocusedIcon: 'database-check' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    currentWeatherScreen: CurrentWeatherScreen,
    selectedLocationWeatherScreen: SelectedLocationWeatherScreen,
    showSavedLocations: ShowSavedLocations,
  });


  return (
    <PaperProvider>
      <StatusBar style="dark" />
      <NavigationContainer>

        <Tab.Navigator initialRouteName="CurrentWeatherScreen">
          <Tab.Screen
            name="CurrentWeatherScreen"
            component={CurrentWeatherScreen}
            options={{ title: 'Current Weather Screen' }}
          />
          <Tab.Screen
            name="SelectedLocationWeatherScreen"
            component={SelectedLocationWeatherScreen}
            options={{ title: 'Display Selected Weather Screen' }}
          />
          <Tab.Screen
            name="ShowSavedLocations"
            component={ShowSavedLocations}
            options={{ title: 'Saved Location' }}
          />
        </Tab.Navigator> 


      </NavigationContainer>
    </PaperProvider>
  );
}

