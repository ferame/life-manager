import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../store';
import Axios from 'axios';
import lodash from 'lodash';

interface Weather {
  location: string;
  temperature: number;
  windspeed: number;
  rainfall: number;
}

const initialState: Weather = {
  location: '',
  temperature: 0,
  windspeed: 0,
  rainfall: 0
};

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<string>) => {
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
    }
  },
});

export const { setLocation, setTemperature, setForecast } = weatherSlice.actions;

export const updateForecast = (userToken: string, location: string): AppThunk => dispatch => {
    Axios.get('api/weather/current/' + location, {
      headers: {
        'Authorization': `Bearer ${userToken}`
      }
    }).then(response => {
      let loc = lodash.get(response, "data.name");
      let temp = lodash.get(response, "data.main.temp");
      if(loc !== undefined && temp !== undefined) {
        dispatch(setForecast({
          location: loc,
          temperature: temp,
          windspeed: lodash.get(response, "data.wind.speed", 0),
          rainfall: lodash.get(response, "data.rain.1h", 0)
        }))
      }
    });
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
