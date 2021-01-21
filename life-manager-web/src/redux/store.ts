import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import userReducer from './reducers/userSlice';
import weatherReducer from './reducers/weatherSlice';
import thunk from 'redux-thunk';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    weather: weatherReducer
  },
  middleware: [thunk, ...getDefaultMiddleware()]
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
