import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setWeather } from '../store';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const SearchScreen = () => {
  const [city, setCity] = useState('');
  const weather = useSelector((state: RootState) => state.weather.weather);
  const dispatch = useDispatch();
  const apiKey = "a12e44311f4d42b1add221759250101";

  const fetchWeather = async () => {
    if (!city.trim()) {
      console.error('City name is empty');
      return;
    }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`
      );

      if (!response.ok) {
        console.error('Error fetching weather data');
        return;
      }

      const data = await response.json();
      dispatch(setWeather(data));
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Search" onPress={fetchWeather} />
      {weather && (
        <View style={styles.weatherContainer}>
          <Text>City: {weather.location.name}</Text>
          <Text>Temperature: {weather.current.temp_c} °C</Text>
          <Text>Condition: {weather.current.condition.text}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 16, paddingHorizontal: 8 },
  weatherContainer: { marginTop: 16 },
});

export default SearchScreen;