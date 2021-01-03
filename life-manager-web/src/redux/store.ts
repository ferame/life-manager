import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import userReducer from './reducers/userSlice';
import weatherReducer from './reducers/weatherSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    weather: weatherReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
