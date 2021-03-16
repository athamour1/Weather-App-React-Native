import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';

const WEATHER_API_KEY = '84745c3d8989c433f20e202403a1465e'
const BASE_WEATHER_URL = 'https://api.openweathermap.org/geo/1.0/reverse?lat='

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)
  const [currentWeather, setCurrentWeather] = useState(null)

  useEffect(() => {
    load()
  }, [])
  async function load() {
    try {
      let { } = await Location.requestPermissionsAsync()

      if(status != 'granted'){
        setErrorMessage('Access to location is needed to run this app')
        return
      }
      const location = await Location.getCurrentPositionAsync()

      const { latitude, longitude } = location.coords

      const weatherUrl = '${BASE_WEATHER_URL}${latitude}&lon=${longitude}&limit=5&appid=${WEATHER_API_KEY}' 

      const response = await fetch(weatherUrl)
      
      const result = await response.json()

      if(response.ok){
        setCurrentWeather(result);
      } else {
        setErrorMessage(result.message);
      }

      // alert('Latitude : ${latitude}, Longitude : ${longitude}')

    } catch (error){}
  }
  if(currentWeather) {
    const { main : {temp}} = currentWeather
    return (
      <View style={styles.container}>
        <Text>{temp}</Text>
        <StatusBar style="auto" />
      </View>
    );

  } else {
    return (
      <View style={styles.container}>
        <Text>{errorMessage}</Text>
        <StatusBar style="auto" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
