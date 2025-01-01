import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

type WeatherState = {
  weather: {
    location: {
      name: string;
      region: string;
      country: string;
    };
    current: {
      temp_c: number;
      condition: {
        text: string;
      };
    };
  } | null;
};

const initialState: WeatherState = {
  weather: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setWeather: (state, action: PayloadAction<WeatherState['weather']>) => {
      state.weather = action.payload;
    },
  },
});

export const { setWeather } = weatherSlice.actions;

export const store = configureStore({
  reducer: {
    weather: weatherSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;