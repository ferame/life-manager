import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import Axios from 'axios';

interface Weather {
  location: Location;
  temperature: number;
  windspeed: number;
  rainfall: number;
  description: string;
  id: string;
}

interface Location {
  city: string;
  country: string;
}

const initialState: Weather = {
  location: {
    city: "",
    country: ""
  },
  temperature: 0,
  windspeed: 0,
  rainfall: 0,
  description: '',
  id: '0'
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
    setTemperature: (state, action: PayloadAction<number>) => {
      state.temperature = action.payload;
    },
    setForecast: (state, action: PayloadAction<Weather>) => {
      state.location = action.payload.location;
      state.temperature = action.payload.temperature;
      state.windspeed = action.payload.windspeed;
      state.rainfall = action.payload.rainfall;
      state.description = action.payload.description;
      state.id = action.payload.id;
    }
  },
});

export const { setLocation, setTemperature, setForecast } = weatherSlice.actions;

export const updateForecast = (userToken: string, location: Location): AppThunk => dispatch => {
    Axios.get(`api/weather/current/${location.country}/${location.city}`, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }).then(response => {
      let loc = response?.data?.name;
      let temp = response?.data?.main.temp;
      let desc = response?.data?.weather?.[0]?.main;
      let weatherId = response?.data?.weather?.[0]?.id;
      if(loc !== undefined && temp !== undefined && desc !== undefined && weatherId !== undefined) {
        dispatch(setForecast({
          location: {
            city: loc,
            country: location.country
          },
          temperature: Math.round(temp * 10) / 10,
          windspeed: response?.data?.wind?.speed ?? 0,
          rainfall: response?.data?.rain?.['1h'] ?? 0,
          description: desc,
          id: weatherId
        }))
      }
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
