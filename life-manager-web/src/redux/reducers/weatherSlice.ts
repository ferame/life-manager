import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface WeatherState {
    location: string;
    temperature: number;
}

const initialState: WeatherState = {
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
      }
  },
});

export const { setLocation, setTemperature } = weatherSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectWeather = (state: RootState) => state.weather;

export default weatherSlice.reducer;
