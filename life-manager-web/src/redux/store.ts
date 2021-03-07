import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit';
import counterReducer from './reducers/counterSlice';
import userReducer from './reducers/userSlice';
import locationsReducer from './reducers/locationsSlice';
import weatherReducer from './reducers/weatherSlice';
import thunk from 'redux-thunk';
import throttle from 'lodash/throttle';
import { loadState, saveState } from './localStorage';

export const persistedState = loadState();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    locations: locationsReducer,
    weather: weatherReducer
  },
  middleware: [thunk, ...getDefaultMiddleware()],
  preloadedState: {
    user: persistedState
  }
});

store.subscribe(throttle(() => {
  console.log("Subscribing the state");
  saveState(store.getState().user);
}, 1000));

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
