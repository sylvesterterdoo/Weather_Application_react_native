import React from 'react';
import { StatusBar } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { BottomNavigation, Text } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CurrentWeatherScreen from './screens/CurrentWeatherScreen';
import SelectedLocationWeatherScreen from './screens/SelectedLocationWeatherScreen';
import ShowSavedLocations from './screens/ShowSavedLocations';

const Tab = createBottomTabNavigator();

export default function App() {
  
  return (
    <PaperProvider>
      <StatusBar style="dark" />
      <NavigationContainer>

        <Tab.Navigator 
          initialRouteName="CurrentWeatherScreen"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              if (route.name === 'CurrentWeatherScreen') {
                iconName = focused
                  ? 'locate'
                  : 'location-outline';
              } else if (route.name === 'SelectedLocationWeatherScreen') {
                iconName = focused ? 'map' : 'map-outline';
              } else if (route.name === 'ShowSavedLocations') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }
  
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}
          
          >
          <Tab.Screen
            name="CurrentWeatherScreen"
            component={CurrentWeatherScreen}
            options={{ title: 'Current Location' }}
          />
          <Tab.Screen
            name="SelectedLocationWeatherScreen"
            component={SelectedLocationWeatherScreen}
            options={{ title: 'Selected Location' }}
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

