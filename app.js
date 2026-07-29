import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import axios from 'axios';

const API_KEY = "5f0070992ecc7dcc28534922b02fdb73";

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);

      setWeather(response.data);
    } 
    catch (error) {
      alert("City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🌦 Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {loading && (
        <ActivityIndicator size="large" color="#FF8C00" />
      )}

      {weather && !loading && (
        <View style={styles.card}>
          <Text style={styles.city}>
            {weather.name}, {weather.sys.country}
          </Text>

          <Text style={styles.info}>
            🌡 Temperature: {weather.main.temp}°C
          </Text>

          <Text style={styles.info}>
            🤗 Feels Like: {weather.main.feels_like}°C
          </Text>

          <Text style={styles.info}>
            ☁ Condition: {weather.weather[0].main}
          </Text>

          <Text style={styles.info}>
            💧 Humidity: {weather.main.humidity}%
          </Text>

          <Text style={styles.info}>
            🌬 Wind Speed: {weather.wind.speed} m/s
          </Text>

          <Text style={styles.info}>
            ⬆ Max Temp: {weather.main.temp_max}°C
          </Text>

          <Text style={styles.info}>
            ⬇ Min Temp: {weather.main.temp_min}°C
          </Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#87CEFA',
    justifyContent: 'center',
    padding: 20
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 25
  },

  input: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 15
  },

  button: {
    backgroundColor: '#FF8C00',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    elevation: 8
  },

  city: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333'
  },

  info: {
    fontSize: 18,
    marginVertical: 5,
    color: '#555'
  }
}
);

