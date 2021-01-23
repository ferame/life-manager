import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Axios from 'axios';

interface Weather {
    location: string;
    temperature: number;
}

interface ForecastUpdatePayload {
  userToken: string;
  location: string;
}

const initialState: Weather = {
    location: '',
    temperature: 0,
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
      updateForecast: (state, action: PayloadAction<ForecastUpdatePayload>) => {
        let forecastUpdatePayload = action.payload;
        Axios.get('api/weather/current/' + forecastUpdatePayload.location, {
            headers: {
                'Authorization': `Bearer ${forecastUpdatePayload.userToken}`
            }
        }).then(response => {
          // TODO: Add check if response contains all of the parameters of weather,
          //  if yes, update the state with new data
          state = {
            location: response.data.name,
            temperature: response.data.main.temperature
          }
        });
      }
  },
});

export const { setLocation, setTemperature, updateForecast } = weatherSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
