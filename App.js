import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import SelectedLocationWeatherScreen from './screens/SelectedLocationWeatherScreen';
import ShowSavedLocations from './screens/ShowSavedLocations';

const Tab = createBottomTabNavigator();

export default function App() {
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
