// Import the store and actions
import { store, setWeather } from '../src/store';

function assertEqual<T>(actual: T, expected: T, message: string) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log(`✅ ${message}`);
  } else {
    console.error(`❌ ${message}`);
    console.error(`   Expected: ${JSON.stringify(expected)}, but got: ${JSON.stringify(actual)}`);
  }
}

console.log('Running manual tests for Redux store...');

// Test initial state
assertEqual(
  store.getState().weather,
  { weather: null },
  'Initial state should be null'
);

// Test setWeather action
const mockWeatherData = {
  location: {
    name: 'Seattle',
    region: 'Washington',
    country: 'USA',
  },
  current: {
    temp_c: 15,
    condition: {
      text: 'Cloudy',
    },
  },
};

store.dispatch(setWeather(mockWeatherData));

assertEqual(
  store.getState().weather,
  { weather: mockWeatherData },
  'setWeather action should update the state with weather data'
);

// Test clearing the state (optional)
store.dispatch(setWeather(null));

assertEqual(
  store.getState().weather,
  { weather: null },
  'setWeather action should clear the state when passed null'
);