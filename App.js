import React, { useState, useEffect } from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import SelectedLocationWeatherScreen from './screens/SelectedLocationWeatherScreen';
import ShowSavedLocations from './screens/ShowSavedLocations';

const Tab = createBottomTabNavigator();

export default function App() {

  function AppTabs() {
    return (
      <Tab.Navigator screenOptions={screenOptions} initialRouteName="CurrentWeatherScreen">
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
          initialParams={{ refresh: true }} 
        />
      </Tab.Navigator>
    );
  }

  return (
    <PaperProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <AppTabs />
      </NavigationContainer>
    </PaperProvider>
  );
}

const screenOptions = {
  headerTintColor: '#282120',
  headerStyle: { backgroundColor: '#FAD02C' },
  headerTitleStyle: { color: '#282120' },
};
